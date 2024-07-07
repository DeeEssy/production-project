import { fireEvent, screen } from '@testing-library/react';
import { ComponentRender } from '@/shared/lib/tests/componentRender/componentRender';
import { Counter } from './Counter';

describe('Counter', () => {
  test('Test render', () => {
    ComponentRender(<Counter />, {
      initialState: { counter: { value: 10 } },
    });
    expect(screen.getByTestId('counter')).toBeInTheDocument();
  });

  test('test increment button', () => {
    ComponentRender(<Counter />, {
      initialState: { counter: { value: 10 } },
    });
    const incrementBtn = screen.getByTestId('increment-btn');
    expect(screen.getByTestId('counter')).toBeInTheDocument();
    fireEvent.click(incrementBtn);
    expect(screen.getByTestId('value-text')).toHaveTextContent('11');
  });

  test('test decrement button', () => {
    ComponentRender(<Counter />, {
      initialState: { counter: { value: 10 } },
    });
    const decrementBtn = screen.getByTestId('decrement-btn');
    expect(screen.getByTestId('counter')).toBeInTheDocument();
    fireEvent.click(decrementBtn);
    expect(screen.getByTestId('value-text')).toHaveTextContent('9');
  });
});
