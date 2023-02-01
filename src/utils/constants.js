const formatDate = (data) => {
  const date = new Date(data);
  return date.toLocaleString("ru", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });
};
const numberOfShownProducts = 3;
// удалить тире, точки, слеши, пробелы
const removeSymbols = (str) => {
  return str.replace(/(\.|-|\/|\\| )/g, "");
};

export { formatDate, numberOfShownProducts, removeSymbols };
