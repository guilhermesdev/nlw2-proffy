export function capitalize(string: string) {
	if (!string.trim()) return string;

	const firstLetter = string[0];
	const rest = string.slice(1);

	return `${firstLetter.toUpperCase()}${rest}`;
}

export const brazilianPhoneRegex = /^[1-9]{2}[9]?([1-9]{4})([0-9]{4}$)/;