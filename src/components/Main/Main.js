import React from "react";
import "./Main.scss";
import SearchForm from "../SearchForm/SearchForm";
import Navigation from "../Navigation/Navigation";
import Catalogue from "../Catalogue/Catalogue";
import { numberOfShownProducts } from "../../utils/constants";

function Main(props) {
  const [currentPageIndex, setCurrentPageIndex] = React.useState(0);

  const [shownProducts, setShownProducts] = React.useState([]);
  const [currentData, setCurrentData] = React.useState([]);
  const [sortedProducts, setSortedProducts] = React.useState(
    props.productsData
  );

  const handleSearchItems = (input, sort) => {
    localStorage.setItem("search", input);
    localStorage.setItem("sortCriterion", sort);
    localStorage.setItem("numberedNavButton", 0);
    setCurrentPageIndex(0);
    const sortedData = props.productsData.sort((a, b) => {
      switch (sort) {
        case "sortByName":
          return a.name > b.name ? 1 : -1;
        case "sortByViews":
          return a.views > b.views ? 1 : -1;
        case "sortByStart":
          return new Date(a.start_date) > new Date(b.start_date) ? 1 : -1;
        case "sortByEnd":
          return new Date(a.end_date) > new Date(b.end_date) ? 1 : -1;
        default:
          return a.name > b.name ? 1 : -1;
      }
    });
    const filteredProducts = sortedProducts.filter((item) => {
      return String(item.name.toLowerCase()).includes(input);
    });
    setCurrentData(filteredProducts);
    setSortedProducts(sortedData);
    setShownProducts(filteredProducts.slice(0, numberOfShownProducts));
    localStorage.setItem("storedProducts", JSON.stringify(filteredProducts));
    if (filteredProducts.length === 0) {
      alert("Ничего не найдено");
    }
  };

  const handleNumberedButtonClick = (page) => {
    const productIndex = page * numberOfShownProducts;
    const newProducts = currentData
      .slice(productIndex, productIndex + numberOfShownProducts);
    setShownProducts(newProducts);
    setCurrentPageIndex(page);
    localStorage.setItem("numberedNavButton", page);
  };

  React.useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem("storedProducts"));
    const storedPage = Number(localStorage.getItem("numberedNavButton"));
    const productIndex = storedPage * numberOfShownProducts;
    storedPage ? setCurrentPageIndex(storedPage) : setCurrentPageIndex(0);
    if (storedProducts) {
      setCurrentData(storedProducts);
      setShownProducts(storedProducts.slice(productIndex, productIndex + numberOfShownProducts))
    } else {
      setCurrentData(props.productsData);
      setShownProducts(props.productsData.slice(0, numberOfShownProducts))
    }
  }, [props.productsData]);

  return (
    <main className="catalogue">
      <h1 className="catalogue__header">Карточки контента</h1>
      <SearchForm onSearchItems={handleSearchItems} />
      <Navigation
        currentData={currentData}
        onNumberClick={handleNumberedButtonClick}
        currentPageIndex={currentPageIndex}
      />
      <Catalogue
        productsData={props.productsData}
        onProductClick={props.onProductClick}
        shownProducts={shownProducts}
      />
    </main>
  );
}

export default Main;
