import { useAuthStore } from '../../stores/authStore';

interface MinorGuardProps {
  isAdultOnly: boolean;
  children: React.ReactNode;
}

export function MinorGuard({ isAdultOnly, children }: MinorGuardProps) {
  const { currentUser } = useAuthStore();

  if (isAdultOnly && currentUser?.isMinor) {
    return (
      <div className="p-6 bg-gray-100 rounded-lg text-center text-wisdom-text">
        <p className="font-medium">This content is not available for your account.</p>
      </div>
    );
  }

  return <>{children}</>;
}
