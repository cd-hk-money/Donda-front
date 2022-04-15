export function priceNormalization(price: number | string): string {
  return typeof price === 'number' ? 
    price.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",") :
    price.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
}