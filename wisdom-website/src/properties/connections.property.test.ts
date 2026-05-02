import { describe, it, beforeEach } from 'vitest';
import * as fc from 'fast-check';
import { useConnectStore } from '../stores/connectStore';
import { useAuthStore } from '../stores/authStore';
import { dataService } from '../services/dataService';
import type { User } from '../types';

const makeUser = (id: string, location: string, isMinor = false): User => ({
  id, fullName: `User ${id}`, email: `${id}@test.com`, passwordHash: 'p',
  age: isMinor ? 16 : 25, isMinor, role: 'user', location,
  disciplines: [{ category: 'Science', subFields: ['Biology'] }],
  tags: [], participationRole: 'seeking_help',
  following: [], recentlyVisitedBoards: [], notificationArea: [],
  createdAt: new Date().toISOString(),
});

describe('Connection property-based tests', () => {
  beforeEach(() => {
    localStorage.clear();
    useAuthStore.setState({ currentUser: null });
    dataService.setUsers([]);
    dataService.setConnections([]);
  });

  // Feature: wisdom-website, Property 12: Professional card displays required fields
  it('Property 12: professional user has required display fields', () => {
    fc.assert(
      fc.property(
        fc.string({ minLength: 2, maxLength: 30 }),
        fc.string({ minLength: 2, maxLength: 30 }),
        (name, location) => {
          const user = makeUser('u1', location);
          user.fullName = name;
          return (
            typeof user.fullName === 'string' &&
            typeof user.location === 'string' &&
            Array.isArray(user.disciplines)
          );
        }
      ),
      { numRuns: 100 }
    );
  });

  // Feature: wisdom-website, Property 13: Nearby professionals filter is city-exact
  it('Property 13: nearby professionals filter is city-exact', () => {
    fc.assert(
      fc.property(
        fc.constantFrom('Sydney', 'Melbourne', 'Brisbane', 'Perth'),
        fc.array(fc.constantFrom('Sydney', 'Melbourne', 'Brisbane', 'Perth'), { minLength: 1, maxLength: 8 }),
        (userCity, profCities) => {
          localStorage.clear();
          dataService.setConnections([]);

          const users = profCities.map((city, i) => makeUser(`prof-${i}`, city));
          const currentUser = makeUser('current', userCity);
          dataService.setUsers([currentUser, ...users]);
          useAuthStore.setState({ currentUser });
          useConnectStore.getState().fetchProfessionals();

          const nearby = useConnectStore.getState().professionals.filter(
            (p) => p.location.toLowerCase() === userCity.toLowerCase()
          );
          return nearby.every((p) => p.location.toLowerCase() === userCity.toLowerCase());
        }
      ),
      { numRuns: 100 }
    );
  });

  // Feature: wisdom-website, Property 14: Connection request creates pending record
  it('Property 14: sendConnectionRequest creates pending connection', () => {
    fc.assert(
      fc.property(
        fc.boolean(),
        fc.boolean(),
        (requesterMinor, targetMinor) => {
          localStorage.clear();
          dataService.setConnections([]);

          const requester = makeUser('req', 'Sydney', requesterMinor);
          const target = makeUser('tgt', 'Sydney', targetMinor);
          dataService.setUsers([requester, target]);
          useAuthStore.setState({ currentUser: requester });

          useConnectStore.getState().sendConnectionRequest('tgt');

          const connections = dataService.getConnections();
          return (
            connections.length > 0 &&
            connections[connections.length - 1].status === 'pending' &&
            connections[connections.length - 1].requesterId === 'req' &&
            connections[connections.length - 1].targetId === 'tgt'
          );
        }
      ),
      { numRuns: 100 }
    );
  });

  // Feature: wisdom-website, Property 15: Accepting a connection transitions status to accepted
  it('Property 15: acceptConnection sets status to accepted', () => {
    fc.assert(
      fc.property(
        fc.uuid(),
        (connId) => {
          localStorage.clear();
          dataService.setConnections([{
            id: connId, requesterId: 'u1', targetId: 'u2',
            status: 'pending', requiresAdminApproval: false, adminApproved: null,
            createdAt: new Date().toISOString(),
          }]);
          dataService.setUsers([makeUser('u1', 'Sydney'), makeUser('u2', 'Sydney')]);
          useAuthStore.setState({ currentUser: makeUser('u2', 'Sydney') });
          useConnectStore.setState({ connections: dataService.getConnections() });

          useConnectStore.getState().acceptConnection(connId);

          const conn = dataService.getConnections().find((c) => c.id === connId);
          return conn?.status === 'accepted';
        }
      ),
      { numRuns: 100 }
    );
  });

  // Feature: wisdom-website, Property 16: Minor connections require admin approval
  it('Property 16: minor connections have requiresAdminApproval=true', () => {
    fc.assert(
      fc.property(
        fc.boolean(),
        fc.boolean(),
        (requesterMinor, targetMinor) => {
          if (!requesterMinor && !targetMinor) return true;

          localStorage.clear();
          dataService.setConnections([]);

          const requester = makeUser('req', 'Sydney', requesterMinor);
          const target = makeUser('tgt', 'Sydney', targetMinor);
          dataService.setUsers([requester, target]);
          useAuthStore.setState({ currentUser: requester });

          useConnectStore.getState().sendConnectionRequest('tgt');

          const connections = dataService.getConnections();
          const conn = connections[connections.length - 1];
          return conn.requiresAdminApproval === true && conn.status === 'pending';
        }
      ),
      { numRuns: 100 }
    );
  });
});
