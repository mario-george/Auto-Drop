export default function CurrencyFormatter(
  value: number,
  options?: Intl.NumberFormatOptions
): string {
  const properties = {
    style: "currency",
    currency: "SAR",
    currencyDisplay: "code",
    currencySign: "standard",
    ...options,
  } satisfies Intl.NumberFormatOptions;

  return new Intl.NumberFormat("en-SA", properties).format(value);
}
export  function CurrencyFormatterShippingInfo(
  value: number,
  options?: Intl.NumberFormatOptions
): string {
  const properties = {
    style: "currency",
    currency: "SAR",
    currencyDisplay: "code",
    currencySign: "standard",
    ...options,
  } satisfies Intl.NumberFormatOptions;

  return new Intl.NumberFormat("en-SA", properties).format(value);
}
