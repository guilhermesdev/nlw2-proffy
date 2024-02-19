const currencyFormatter = new Intl.NumberFormat('pt-BR', {
	style: 'currency',
	currency: 'BRL'
});

export function formatCurrency(cost: number): string {
	return currencyFormatter.format(cost);
}
