import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import UserItem from '@/features/users/components/UserItem';
import { fakeUser } from '@/__tests__/mocks/users';
import type { User } from '@/types/user';

const renderUserItem = (user: User = fakeUser) => {
  const utils = render(<UserItem user={user} />);

  return {
    ...utils,
    root: screen.getByTestId('user-item'),
    name: screen.getByTestId('user-name'),
    nationality: screen.getByTestId('user-nationality'),
    age: screen.getByTestId('user-age'),
    hobbies: screen.queryByTestId('user-hobbies'),
    hobbyBadges: screen.queryAllByTestId('user-hobby'),
    moreHobbies: screen.queryByTestId('user-hobbies-more'),
  };
};

describe('UserItem', () => {
  it('renders name, nationality and age', () => {
    const { name, nationality, age } = renderUserItem();

    expect(name).toHaveTextContent(/^John/i);
    expect(nationality).toHaveTextContent(/^Serbia/i);
    expect(age).toHaveTextContent(/30/i);
  });

  it('hides hobbies when there are no hobbies', () => {
    const { hobbies } = renderUserItem({
      ...fakeUser,
      hobbies: [],
    });

    expect(hobbies).not.toBeInTheDocument();
  });

  it('shows at most two hobbies and a more badge', () => {
    const { hobbyBadges, moreHobbies } = renderUserItem({
      ...fakeUser,
      hobbies: ['Reading', 'Chess', 'Coding'],
    });

    expect(hobbyBadges).toHaveLength(2);
    expect(moreHobbies).toHaveTextContent('+1');
  });

  it('does not show more badge when there are two or fewer hobbies', () => {
    const { hobbyBadges, moreHobbies } = renderUserItem({
      ...fakeUser,
      hobbies: ['Reading', 'Chess'],
    });

    expect(hobbyBadges).toHaveLength(2);
    expect(moreHobbies).not.toBeInTheDocument();
  });
});
