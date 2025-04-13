import { writable } from "svelte/store";

export const theme = writable<Theme>('dark');
export const openedSelect = writable<string>('');
export const word = writable<string>('');
export const timer = writable<number>(10);
export const displayingTimer = writable(false);
export const chosenDictionary = writable<string>("one");
