import { cache } from "$lib/constants";
import { themes } from "$lib/data/themes";
import { derived, type Writable, writable } from "svelte/store";

export type Theme = {
  name: string;
  primary: string;
  secondary: string;
  border: string;
  childBorder: string;
  foreground: string;
  background: string;
};

const _default = (): string => {
  return sessionStorage.getItem(cache.THEME) || "green";
};

const _theme = writable<string>(_default());
export const theme = derived<Writable<string>, Theme>(
  _theme,
  ($theme) => themes[$theme],
);

_theme.subscribe((theme) => {
  sessionStorage.setItem(cache.THEME, theme);
});

export const setTheme = (newTheme: string): boolean => {
  const matchedTheme = Object.values(themes).find((t) =>
    t.primary === newTheme
  );

  if (!matchedTheme) {
    return false;
  }

  _theme.set(matchedTheme.name);
  return true;
};
