export const mask_CPF = (value: string) => {
  if (!value) return "";

  return value
    .replace(/\D/g, "") 
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
};


export const mask_Phone = (value: string) => {
  if (!value) return "";

  return value
    .replace(/\D/g, "")
    .replace(/(\d{2})(\d)/, "($1) $2")
    .replace(/(\d{5})(\d)/, "$1-$2")
    .replace(/(-\d{4})\d+?$/, "$1");
};

export const mask_Currency = (value: string | number | undefined) => {
  if (!value) return "R$ 0,00";
  let v = value.toString().replace(/\D/g, "");
  v = (Number(v) / 100).toFixed(2);

  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(Number(v));
};