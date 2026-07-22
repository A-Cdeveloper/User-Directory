import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import type { User } from '@/types/user';

// Component to display the user's hobbies
const UserHobbies = ({ hobbies }: { hobbies: string[] }) => {
  return (
    <div className="flex items-center gap-1.5 my-2">
      {hobbies.slice(0, 2).map((hobby) => (
        <Badge
          key={hobby}
          variant="secondary"
          className="text-[11px] leading-none py-1 px-2.5 rounded-[8px]"
        >
          {hobby}
        </Badge>
      ))}
      {hobbies.length > 2 && (
        <Badge
          variant="secondaryMuted"
          className="text-[12px] leading-none rounded-full px-1 py-1"
          aria-label={`${hobbies.length - 2} more hobbies`}
        >
          +{hobbies.length - 2}
        </Badge>
      )}
    </div>
  );
};

// Component to display the user item
const UserItem = ({ user }: { user: User }) => {
  const fullName = `${user.first_name} ${user.last_name}`;
  const initials = `${user.first_name[0] ?? ''}${user.last_name[0] ?? ''}`.toUpperCase();

  return (
    <div className="flex w-full items-center gap-3 rounded-[12px] border border-border px-4 py-2 transition-colors hover:bg-accent justify-between">
      <Avatar className="size-20 shrink-0">
        <AvatarImage src={user.avatar} alt={fullName} />
        <AvatarFallback>{initials}</AvatarFallback>
      </Avatar>

      <div className="min-w-0 flex-1">
        <p className="truncate text-md font-bold">{fullName}</p>
        <p className="truncate text-sm text-muted-foreground">{user.nationality}</p>
        <div className="flex items-center gap-2 my-1.5">
          <UserHobbies hobbies={user.hobbies} />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground">
          <span className="sr-only">Age </span>
          {user.age}
        </span>
      </div>
    </div>
  );
};

export default UserItem;
