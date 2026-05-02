import { Component, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error('WISDOM ErrorBoundary caught:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-wisdom-white flex flex-col items-center justify-center text-wisdom-text">
          <h1 className="text-2xl font-bold mb-4">Something went wrong</h1>
          <button
            onClick={() => window.location.reload()}
            className="bg-wisdom-highlight text-white px-6 py-2 rounded hover:bg-wisdom-highlight/90 transition-colors"
          >
            Reload
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
