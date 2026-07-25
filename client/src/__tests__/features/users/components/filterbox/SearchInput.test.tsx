import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SearchInput from '@/features/users/components/filterbox/SearchInput';

const defaultProps = {
  placeholder: 'Search users...',
  value: '',
  onChange: vi.fn(),
};

const renderSearchInput = (props: Partial<typeof defaultProps> = {}) => {
  const merged = { ...defaultProps, ...props };
  const utils = render(<SearchInput {...merged} />);
  const user = userEvent.setup();

  return {
    ...utils,
    props: merged,
    input: screen.getByTestId('search-input'),
    user,
  };
};

describe('SearchInput', () => {
  it('renders initial value', () => {
    const { input } = renderSearchInput();

    expect(input).toHaveValue('');
  });

  it('calls onChange when the input is changed', async () => {
    const onChange = vi.fn();
    const { input, user } = renderSearchInput({ onChange });

    await user.type(input, 'A');

    expect(onChange).toHaveBeenCalledWith('A');
  });

  it('calls onChange with the current value when the input is changed', async () => {
    const onChange = vi.fn();
    const { input, user } = renderSearchInput({ onChange, value: 'A' });

    await user.type(input, 'B');

    expect(onChange).toHaveBeenCalledWith('AB');
  });

  it('calls onChange when the user clears the input', async () => {
    const onChange = vi.fn();
    const { input, user } = renderSearchInput({ onChange, value: 'AB' });

    await user.clear(input);

    expect(onChange).toHaveBeenCalledWith('');
  });
});
