import { writable } from "svelte/store";
import { characters, rooms, weapons } from "$lib/data/items";

const MAX_PLAYERS = 6;

export enum States {
  UNKNOWN,
  CROSS,
  TICK,
  MAYBE
}

export type State = {
  state: States;
  notes: number[];
};

type CharacterLine = {
  name: string;
  states: State[];
};

const empty = (): State => ({
  state: States.UNKNOWN,
  notes: [],
});

const defaultState = (): CharacterLine[] =>
  [...characters, ...weapons, ...rooms].map<CharacterLine>((
    name: string,
  ): CharacterLine => ({
    name,
    states: Array(MAX_PLAYERS).fill(empty()),
  }));

export const game = writable<CharacterLine[]>(defaultState());
