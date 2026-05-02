import { useState } from 'react';
import { X, UserPlus, HelpCircle } from 'lucide-react';
import { useConnectStore } from '../../stores/connectStore';
import { AdviceForm } from './AdviceForm';

interface ChatOptionsModalProps {
  targetUserId: string;
  targetUserName: string;
  onClose: () => void;
}

export function ChatOptionsModal({ targetUserId, targetUserName, onClose }: ChatOptionsModalProps) {
  const { sendConnectionRequest } = useConnectStore();
  const [view, setView] = useState<'options' | 'advice' | 'sent'>('options');

  const handleConnect = () => {
    sendConnectionRequest(targetUserId);
    setView('sent');
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm">
        <div className="flex items-center justify-between p-5 border-b border-gray-100">
          <h2 className="text-base font-semibold text-wisdom-sidebar">
            {view === 'advice' ? 'Ask for Advice' : `Connect with ${targetUserName}`}
          </h2>
          <button onClick={onClose} className="text-wisdom-text/40 hover:text-wisdom-text transition-colors">
            <X size={18} />
          </button>
        </div>

        <div className="p-5">
          {view === 'options' && (
            <div className="space-y-3">
              <button
                onClick={handleConnect}
                className="w-full flex items-center gap-3 p-3 border border-wisdom-primary/30 rounded-lg hover:bg-wisdom-primary/5 transition-colors text-left"
              >
                <UserPlus size={18} className="text-wisdom-highlight shrink-0" />
                <div>
                  <p className="text-sm font-medium text-wisdom-sidebar">Send Connection Request</p>
                  <p className="text-xs text-wisdom-text/60">Add {targetUserName} to your network</p>
                </div>
              </button>
              <button
                onClick={() => setView('advice')}
                className="w-full flex items-center gap-3 p-3 border border-wisdom-primary/30 rounded-lg hover:bg-wisdom-primary/5 transition-colors text-left"
              >
                <HelpCircle size={18} className="text-wisdom-highlight shrink-0" />
                <div>
                  <p className="text-sm font-medium text-wisdom-sidebar">Ask for Advice</p>
                  <p className="text-xs text-wisdom-text/60">Submit a question to {targetUserName}</p>
                </div>
              </button>
            </div>
          )}

          {view === 'advice' && (
            <AdviceForm
              targetUserId={targetUserId}
              onSuccess={onClose}
              onCancel={() => setView('options')}
            />
          )}

          {view === 'sent' && (
            <div className="text-center py-4">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <UserPlus size={24} className="text-green-600" />
              </div>
              <p className="font-medium text-wisdom-sidebar">Connection request sent!</p>
              <p className="text-sm text-wisdom-text/60 mt-1">
                {targetUserName} will be notified of your request.
              </p>
              <button
                onClick={onClose}
                className="mt-4 bg-wisdom-highlight text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-wisdom-highlight/90 transition-colors"
              >
                Done
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
