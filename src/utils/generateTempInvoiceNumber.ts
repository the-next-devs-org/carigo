export const generateTempInvoiceNumber = () => {
  const date = new Date();
  const randomNum = Math.floor(Math.random() * 1000);
  return `INV-${date.getFullYear()}${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}${randomNum}`;
};
