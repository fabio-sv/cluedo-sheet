import { writable } from "svelte/store";
import { characters, rooms, weapons } from "$lib/data/items";
import { MAX_PLAYERS, cache } from "$lib/constants";

export enum States {
  UNKNOWN,
  CROSS,
  TICK,
  MAYBE,
}

export type State = {
  state: States;
  notes: number[];
};

const _default = (): State[][] => {
  const cachedGameString = sessionStorage.getItem(cache.GAME);

  if (cachedGameString) {
    return JSON.parse(cachedGameString) as State[][];
  }

  const rows = characters.length + weapons.length + rooms.length;
  const cols = MAX_PLAYERS;
  const array: State[][] = [];

  for (let i = 0; i < rows; i++) {
    const row: State[] = [];

    for (let j = 0; j < cols; j++) {
      const newObj: State = {
        state: States.UNKNOWN,
        notes: [],
      };

      row.push(newObj);
    }

    array.push(row);
  }

  return array;
};

export const game = writable<State[][]>(_default());

game.subscribe((game) => {
  sessionStorage.setItem(cache.GAME, JSON.stringify(game));
});
