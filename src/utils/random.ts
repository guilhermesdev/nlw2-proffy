export function getRandomInt(min: number, max: number): number {
	const minCeiled = Math.ceil(min);
	const maxFloored = Math.floor(max);
	return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
}

export function getRandomFrom<const T>(list: T[] | readonly T[]): T {
	const index = getRandomInt(0, list.length - 1);

	return list[index];
}
