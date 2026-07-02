import UserItem from './UserItem';

const UsersList = () => {
  const arrayExampe = new Array(100).fill(0);
  return (
    <div className="custom-scrollbar w-full min-h-0 flex-1 overflow-y-auto py-6 pe-4">
      {arrayExampe.map((_, index) => (
        <UserItem key={index} />
      ))}
    </div>
  );
};

export default UsersList;
