import { Spinner } from '../ui/spinner';

const LoadingScreen = () => {
  return (
    <div className="flex h-full w-full items-center justify-center bg-background">
      <Spinner className="size-12" />
    </div>
  );
};

export default LoadingScreen;
