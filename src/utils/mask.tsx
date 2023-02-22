export function maskCurrency(value: string) {
  value = value.replace(/\D/g, '')
  value = value.replace(/(\d)(\d{2})$/, '$1,$2')
  value = value.replace(/(?=(\d{3})+(\D))\B/g, '.')
  return value
}

export function unMaskCurrency(value: string) {
  value = value.replace(',', '')
  value = value.replace('.', '')
  return value
}

export function valueToCurrency(data: string) {
  const value = Number(data)
  return value.toLocaleString('pt-br', {
    minimumFractionDigits: 2,
    style: 'currency',
    currency: 'BRL',
  })
}

export function unMaskCurrencySubmit(value: string) {
  value = value.replace(',', '')
  value = value.replace('.', '')
  value = (Number(value) / 100).toFixed(2)
  return value
}
