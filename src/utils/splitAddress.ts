export const splitAddress = (address: string) =>
  address?.toLowerCase()?.slice(0, 4) + "..." + address?.toLowerCase()?.slice(-4)
// : "0x..." + address?.toLowerCase()?.slice(-4)
