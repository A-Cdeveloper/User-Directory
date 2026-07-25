import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FilterItem from '@/features/users/components/sidebar/FilterItem';

const defaultProps = {
  paramKey: 'nationalities',
  value: 'Serbia',
  count: 3,
  checked: false,
  onCheckedChange: vi.fn(),
};

const renderFilterItem = (props: Partial<typeof defaultProps> = {}) => {
  const merged = { ...defaultProps, ...props };
  const testIdBase = `filter-item-${merged.paramKey}-${merged.value}`;

  const utils = render(<FilterItem {...merged} />);

  const user = userEvent.setup();

  return {
    ...utils,
    props: merged,
    checkbox: screen.getByTestId(testIdBase),
    label: screen.getByTestId(`${testIdBase}-label`),
    count: screen.getByTestId(`${testIdBase}-count`),
    user,
  };
};

describe('FilterItem', () => {
  it('renders the label and count', () => {
    const { label, count } = renderFilterItem();

    expect(label).toHaveTextContent(/Serbia/);
    expect(count).toHaveTextContent(/3/);
  });

  it('calls onCheckedChange when the checkbox is clicked', async () => {
    const onCheckedChange = vi.fn();
    const { checkbox, user } = renderFilterItem({ onCheckedChange });

    await user.click(checkbox);

    expect(onCheckedChange).toHaveBeenCalledWith(true);
  });

  it('calls onCheckedChange(false) when unchecking', async () => {
    const onCheckedChange = vi.fn();
    const { checkbox, user } = renderFilterItem({ checked: true, onCheckedChange });

    await user.click(checkbox);

    expect(onCheckedChange).toHaveBeenCalledWith(false);
  });
});
