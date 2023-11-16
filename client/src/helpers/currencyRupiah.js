const rupiah = (number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(number);
};

export default rupiah;
// rupiah(20000) // "Rp 20.000,00"
