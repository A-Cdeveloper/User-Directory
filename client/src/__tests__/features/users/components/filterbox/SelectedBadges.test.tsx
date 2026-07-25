import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SelectedBadges from '@/features/users/components/filterbox/SelectedBadges';

const defaultProps = {
  nationalities: [] as string[],
  hobbies: [] as string[],
  removeFilter: vi.fn(),
  clearAll: vi.fn(),
};

const testNationalities = ['Serbia', 'Germany'];
const testHobbies = ['Reading', 'Writing', 'Coding'];

const renderSelectedBadges = (props: Partial<typeof defaultProps> = {}) => {
  const merged = { ...defaultProps, ...props };
  const utils = render(<SelectedBadges {...merged} />);
  const user = userEvent.setup();

  return {
    ...utils,
    props: merged,
    root: screen.queryByTestId('selected-badges'),
    badges: screen.queryAllByTestId('selected-badge'),
    clearAllButton: screen.queryByTestId('selected-badges-clear-all'),
    getRemoveButton: (paramKey: string, value: string) =>
      screen.getByTestId(`remove-${paramKey}-${value}`),
    user,
  };
};

describe('SelectedBadges', () => {
  it('renders nothing when there are no active filters', () => {
    const { root, badges } = renderSelectedBadges();

    expect(root).not.toBeInTheDocument();
    expect(badges).toHaveLength(0);
  });

  it('renders badges for nationalities and hobbies', () => {
    const { root, badges, getRemoveButton } = renderSelectedBadges({
      nationalities: testNationalities,
      hobbies: testHobbies,
    });

    expect(root).toBeInTheDocument();
    expect(badges).toHaveLength(testNationalities.length + testHobbies.length);

    for (const value of testNationalities) {
      expect(getRemoveButton('nationalities', value)).toBeInTheDocument();
    }
    for (const value of testHobbies) {
      expect(getRemoveButton('hobbies', value)).toBeInTheDocument();
    }
  });

  it('calls removeFilter when the remove button is clicked', async () => {
    const removeFilter = vi.fn();
    const { getRemoveButton, user } = renderSelectedBadges({
      removeFilter,
      nationalities: testNationalities,
      hobbies: testHobbies,
    });

    for (const value of testNationalities) {
      await user.click(getRemoveButton('nationalities', value));
      expect(removeFilter).toHaveBeenCalledWith('nationalities', value);
    }
    for (const value of testHobbies) {
      await user.click(getRemoveButton('hobbies', value));
      expect(removeFilter).toHaveBeenCalledWith('hobbies', value);
    }
  });

  it('calls clearAll when the clear all button is clicked', async () => {
    const clearAll = vi.fn();
    const { clearAllButton, user } = renderSelectedBadges({
      clearAll,
      nationalities: testNationalities,
      hobbies: testHobbies,
    });

    await user.click(clearAllButton!);

    expect(clearAll).toHaveBeenCalledTimes(1);
  });
});
