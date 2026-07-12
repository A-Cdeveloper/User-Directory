import UserItem from './UserItem';
import type { User } from '@/types/user';

const UsersList = ({ users }: { users: User[] }) => {
  return (
    <div className="custom-scrollbar flex w-full min-h-0 flex-1 flex-col gap-2 overflow-y-auto py-6 pe-4">
      {users.map((user) => (
        <UserItem key={user.id} user={user} />
      ))}
    </div>
  );
};

export default UsersList;
