export type Mods = Record<string, boolean | string | undefined>;

export const classNames = (
  cls: string,
  mods: Mods = {},
  addition: Array<string | undefined> = [],
): string => [
  cls,
  ...Object.entries(mods)
    .filter(([_, value]) => Boolean(value))
    .map(([className]) => className),
  // eslint-disable-next-line no-unsafe-optional-chaining
  ...addition?.filter(Boolean),
].join(' ');
