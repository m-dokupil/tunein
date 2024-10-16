interface ErrorFallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
}

const ErrorFallback: React.FC<ErrorFallbackProps> = ({ error, resetErrorBoundary }) => (
  <div className="text-center mt-10">
    <h1 className="text-2xl font-bold mb-4">Oops! Something went wrong.</h1>
    <pre className="text-red-500 mb-4">{error.message}</pre>
    <button
      onClick={resetErrorBoundary}
      className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
    >
      Try again
    </button>
  </div>
);

export default ErrorFallback;