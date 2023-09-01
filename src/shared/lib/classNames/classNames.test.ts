import { classNames } from './classNames';

describe('classNames', () => {
  test('with only first param', () => {
    expect(classNames('someClass')).toBe('someClass');
  });

  test('first param and additional classes', () => {
    expect(classNames('someClass', {}, ['additionalClass1', 'additionalClass2']))
      .toBe('someClass additionalClass1 additionalClass2');
  });

  test('first param, mods and additional classes', () => {
    expect(classNames('someClass', {
      hovered: true, scrollable: true,
    }, ['additionalClass1', 'additionalClass2']))
      .toBe('someClass hovered scrollable additionalClass1 additionalClass2');
  });

  test('first param, mods(with false) and additional classes', () => {
    expect(classNames('someClass', {
      hovered: true, scrollable: false,
    }, ['additionalClass1', 'additionalClass2']))
      .toBe('someClass hovered additionalClass1 additionalClass2');
  });

  test('first param, mods(with undefined) and additional classes', () => {
    expect(classNames('someClass', {
      hovered: true, scrollable: undefined,
    }, ['additionalClass1', 'additionalClass2']))
      .toBe('someClass hovered additionalClass1 additionalClass2');
  });
});
