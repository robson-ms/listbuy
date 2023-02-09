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

export function unMaskCurrencySubmit(value: string) {
  value = value.replace(',', '')
  value = value.replace('.', '')
  return value
}
