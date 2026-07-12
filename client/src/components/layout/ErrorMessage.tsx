import { Button } from '../ui/button';
import { RotateCcwIcon } from 'lucide-react';

const ErrorMessage = ({ message }: { message: string }) => {
  return (
    <div className="flex h-full w-full items-center justify-center bg-background">
      <div className="flex flex-col items-center justify-center gap-2">
        <h1 className="text-2xl font-bold">Error</h1>
        <p className="text-sm text-muted-foreground">{message}</p>
        <Button variant="outline" onClick={() => window.location.reload()}>
          <RotateCcwIcon className="w-4 h-4" />
          Reload
        </Button>
      </div>
    </div>
  );
};

export default ErrorMessage;
