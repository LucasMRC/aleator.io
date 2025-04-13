import { timeoutId } from './store'

export function generateUUID(): string {
	const timestamp: number = new Date().getTime();
	const randomValue1: string = Math.random().toString(36).substring(2, 10);
	const randomValue2: string = 'xxyxxxxyxxxx'.replace(/[xy]/g, function(c) {
		const r = Math.random() * 16 | 0;
		const v = c === 'x' ? r : (r & 0x3 | 0x8);
		return v.toString(16);
	});

	const uuid: string = `${timestamp}-${randomValue1}-${randomValue2}`;
	return uuid;
}

export function formatTime(seconds: number): string {
	const minutes = Math.floor((seconds % 3600) / 60);
	const remainingSeconds = seconds % 60;

	function addLeadingZero(number: number): string {
		if (number < 10) return `0${number}`;
		return number.toString();
	};

	return `${addLeadingZero(minutes)}:${addLeadingZero(remainingSeconds)}`;
}

export function createInterval(cb: () => void, interval: number) {
	let lastTime = Date.now();
	let lastDelay = interval;

	function tick() {
		cb();
		const now = Date.now();
		const dTime = now - lastTime;
		lastTime = now;
		lastDelay = interval + lastDelay - dTime;
		timeoutId.set(setTimeout(tick, lastDelay));
	}
	cb();
	timeoutId.set(setTimeout(tick, 1000));
}
