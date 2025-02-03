export const formatPrice = (price: number) => {
  // Inr
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(price);
};
