export const toWhatsAppLink = (phone: string) => {
  const digitsOnly = phone.replace(/\D/g, "");
  const withCountryCode = digitsOnly.startsWith("0")
    ? `880${digitsOnly.slice(1)}`
    : digitsOnly;
  return `https://wa.me/${withCountryCode}`;
};
