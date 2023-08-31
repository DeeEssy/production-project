type Mods = Record<string, boolean | string>;

export const classNames = (
  cls: string,
  mods: Mods = {},
  addition: string[] = [],
): string => [
  cls,
  ...Object.entries(mods)
    .filter(([_, value]) => Boolean(value))
    .map(([className]) => className),
  // eslint-disable-next-line no-unsafe-optional-chaining
  ...addition?.filter(Boolean),
].join(' ');
