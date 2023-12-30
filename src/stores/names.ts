import { cache } from "$lib/constants";
import { writable } from "svelte/store";

const _default = (): string[] => {
    const sessionString = sessionStorage.getItem(cache.NAMES);

    if (sessionString) {
        return JSON.parse(sessionString) as string[];
    }

    return Array(6).fill('')
}

export const names = writable<string[]>(_default());

names.subscribe(names => {
    sessionStorage.setItem(cache.NAMES, JSON.stringify(names));
})