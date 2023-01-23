// формат dd.mm.yyyy/yy
const formatDate = (data) => {
  const date = new Date(data);
  const dd = () => {
    const day = date.getDate();
    if (day < 10) {
      return "0" + day;
    }
    return day;
  };
  const mm = () => {
    const month = date.getMonth() + 1;
    if (month < 10) {
      return "0" + month;
    }
    return month;
  };
  const yyyy =
    window.innerWidth > 767
      ? date.getFullYear()
      : date.getFullYear().toString().substr(-2);

  return dd() + "." + mm() + "." + yyyy;
};
const numberOfShownProducts = 3;
// удалить тире, точки, слеши, пробелы
const removeSymbols = (str) => {
  return str.replace(/(\.|-|\/|\\| )/g, "");
}

export { formatDate, numberOfShownProducts, removeSymbols }