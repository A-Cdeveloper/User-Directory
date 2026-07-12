import { Spinner } from '@/components/ui/spinner';

const LoadingPage = () => {
  return (
    <div className="flex h-full min-h-screen w-full items-center justify-center bg-background">
      <Spinner className="size-12" />
    </div>
  );
};

export default LoadingPage;
