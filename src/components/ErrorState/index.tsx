interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
}

const ErrorState = ({
  message = "Something went wrong. Please try again.",
  onRetry,
}: ErrorStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[200px] text-center gap-3">
      <span className="text-2xl">⚠️</span>

      <p className="text-sm text-gray-600 max-w-[300px]">
        {message}
      </p>

      {onRetry && (
        <button
          onClick={onRetry}
          className="px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
        >
          Retry
        </button>
      )}
    </div>
  );
};

export default ErrorState;
