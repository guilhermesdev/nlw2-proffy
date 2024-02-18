export function capitalize(string: string) {
	if (!string.trim()) return string;

	const firstLetter = string[0];
	const rest = string.slice(1);

	return `${firstLetter.toUpperCase()}${rest}`;
}
