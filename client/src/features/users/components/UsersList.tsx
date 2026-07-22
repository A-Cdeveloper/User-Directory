import { memo, useEffect, useRef } from 'react';
import UserItem from './UserItem';
import type { User } from '@/types/user';
import { Spinner } from '@/components/ui/spinner';
import { useVirtualizer } from '@tanstack/react-virtual';

type UsersListProps = {
  users: User[];
  onFetchNextPage: () => void;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
};

const UsersList = ({ users, onFetchNextPage, hasNextPage, isFetchingNextPage }: UsersListProps) => {
  const listRef = useRef<HTMLDivElement>(null);
  const endRef = useRef<HTMLDivElement>(null);

  const virtualizer = useVirtualizer({
    count: users.length,
    getScrollElement: () => listRef.current,
    estimateSize: () => 120,
    overscan: 5,
  });

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

  if (users.length === 0) {
    return (
      <div
        className="flex w-full min-h-0 flex-1 items-center justify-center py-6 pe-4 text-sm text-muted-foreground"
        role="status"
      >
        No users found
      </div>
    );
  }

  return (
    <>
      <h2 className="sr-only">Users</h2>
      <div
        ref={listRef}
        className="custom-scrollbar flex w-full min-h-0 flex-1 flex-col overflow-y-auto py-6 pe-4"
        role="list"
        aria-label="Users"
        aria-busy={isFetchingNextPage}
      >
        <div
          style={{
            height: `${virtualizer.getTotalSize()}px`,
            width: '100%',
            position: 'relative',
          }}
          className="shrink-0"
        >
          {virtualizer.getVirtualItems().map((virtualRow) => {
            const user = users[virtualRow.index];
            return (
              <div
                key={user.id}
                role="listitem"
                data-index={virtualRow.index}
                ref={virtualizer.measureElement}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  transform: `translateY(${virtualRow.start}px)`,
                }}
              >
                <div className="py-1">
                  <UserItem user={user} />
                </div>
              </div>
            );
          })}
        </div>

        <div ref={endRef}>
          {isFetchingNextPage && (
            <div
              className="flex w-full items-center justify-center gap-2 py-2 text-sm text-muted-foreground"
              role="status"
            >
              <Spinner className="size-6" />
              Loading more users...
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default memo(UsersList);
