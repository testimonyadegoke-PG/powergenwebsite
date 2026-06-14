import React from 'react';

interface ErrorBoundaryProps {
  children: React.ReactNode;
  /** Optional custom fallback. Receives the error and a reset callback. */
  fallback?: (error: Error, reset: () => void) => React.ReactNode;
  /** Compact inline fallback (used for per-block boundaries). */
  inline?: boolean;
  /** Label shown in the inline fallback, e.g. the block type. */
  label?: string;
}

interface ErrorBoundaryState {
  error: Error | null;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { error: null };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    // Surfaces in the console; swap for a real logger/Sentry in production.
    console.error('ErrorBoundary caught an error:', error, info.componentStack);
  }

  reset = () => this.setState({ error: null });

  render() {
    const { error } = this.state;
    if (!error) return this.props.children;

    if (this.props.fallback) return this.props.fallback(error, this.reset);

    if (this.props.inline) {
      return (
        <div
          role="alert"
          style={{
            padding: '1.5rem',
            margin: '0.5rem auto',
            maxWidth: 'var(--container-width, 1200px)',
            border: '1px dashed var(--border-color, #e2e8f0)',
            borderRadius: 'var(--border-radius-sm, 8px)',
            background: 'var(--bg-light, #f8fafc)',
            color: 'var(--text-muted, #64748b)',
            fontSize: '0.85rem',
            textAlign: 'center',
          }}
        >
          This section{this.props.label ? ` (${this.props.label})` : ''} could not be displayed.
        </div>
      );
    }

    return (
      <main
        role="alert"
        style={{
          minHeight: '60vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '1rem',
          textAlign: 'center',
          padding: '2rem',
        }}
      >
        <h1 style={{ fontFamily: 'var(--font-heading, sans-serif)' }}>Something went wrong</h1>
        <p style={{ color: 'var(--text-muted, #64748b)', maxWidth: '32rem' }}>
          An unexpected error occurred while rendering this page. You can try again, and if the
          problem persists, please contact us.
        </p>
        <button className="btn btn-primary" type="button" onClick={this.reset}>
          Try again
        </button>
      </main>
    );
  }
}
