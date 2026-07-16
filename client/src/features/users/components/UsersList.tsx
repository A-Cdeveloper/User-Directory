import { useEffect, useRef } from 'react';
import UserItem from './UserItem';
import type { User } from '@/types/user';
import { Spinner } from '@/components/ui/spinner';

type UsersListProps = {
  users: User[];
  onFetchNextPage: () => void;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
};

const UsersList = ({ users, onFetchNextPage, hasNextPage, isFetchingNextPage }: UsersListProps) => {
  const listRef = useRef<HTMLDivElement>(null);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = listRef.current;
    const target = endRef.current;
    if (!root || !target) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting && hasNextPage && !isFetchingNextPage) {
          onFetchNextPage();
        }
      },
      { root, rootMargin: '100px' },
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, [onFetchNextPage, hasNextPage, isFetchingNextPage]);

  return (
    <div
      ref={listRef}
      className="custom-scrollbar flex w-full min-h-0 flex-1 flex-col gap-2 overflow-y-auto py-6 pe-4"
    >
      {users.map((user) => (
        <UserItem key={user.id} user={user} />
      ))}

      <div ref={endRef}>
        {isFetchingNextPage && (
          <div className="w-full flex justify-center items-center gap-2 text-sm text-gray-500 py-2">
            <Spinner className="size-6" />
            Loading...
          </div>
        )}
      </div>
    </div>
  );
};

export default UsersList;
