import { Button } from '@/components/ui/button';
import { RotateCcwIcon } from 'lucide-react';

type ErrorMessageProps = {
  message: string;
  onRetry?: () => void;
};

const ErrorMessage = ({ message, onRetry }: ErrorMessageProps) => {
  return (
    <div className="flex h-full min-h-screen w-full items-center justify-center bg-background">
      <div className="flex flex-col items-center justify-center gap-2 px-4 text-center">
        <h1 className="text-2xl font-bold">Error</h1>
        <p className="text-sm text-muted-foreground">{message}</p>
        <Button
          variant="outline"
          onClick={() => {
            if (onRetry) {
              onRetry();
              return;
            }
            window.location.reload();
          }}
        >
          <RotateCcwIcon className="h-4 w-4" />
          Try again
        </Button>
      </div>
    </div>
  );
};

export default ErrorMessage;
