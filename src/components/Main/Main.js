import React from "react";
import "./Main.scss";
import SearchForm from "../SearchForm/SearchForm";
import Navigation from "../Navigation/Navigation";
import Catalogue from "../Catalogue/Catalogue";
import { numberOfShownProducts } from "../../utils/constants";

function Main(props) {
  // const initialProducts = props.productsData
  //   .slice(0, numberOfShownProducts)
  //   .sort((a, b) => (a.name > b.name ? 1 : -1));

  const [currentPageIndex, setCurrentPageIndex] = React.useState(0);

  const [shownProducts, setShownProducts] = React.useState([]);
  const [currentData, setCurrentData] = React.useState([]);
  const [sortedProducts, setSortedProducts] = React.useState(
    props.productsData
  );

  const handleSearchItems = (input, sort) => {
    localStorage.setItem("search", input);
    localStorage.setItem("sortCriterion", sort);
    const sortedData = props.productsData.sort((a, b) => {
      setCurrentPageIndex(0);
      if (sort === "sortByName") {
        return a.name > b.name ? 1 : -1;
      } else if (sort === "sortByViews") {
        return a.views > b.views ? 1 : -1;
      } else if (sort === "sortByStart") {
        return new Date(a.start_date) > new Date(b.start_date) ? 1 : -1;
      } else if (sort === "sortByEnd") {
        return new Date(a.end_date) > new Date(b.end_date) ? 1 : -1;
      } else {
        return a.name > b.name ? 1 : -1;
      }
    });
    const filteredProducts = sortedProducts.filter((item) => {
      return String(item.name.toLowerCase()).includes(input);
    });
    setCurrentData(filteredProducts);
    setSortedProducts(sortedData);
    setShownProducts(filteredProducts.slice(0, numberOfShownProducts));
    if (filteredProducts.length === 0) {
      alert("Ничего не найдено");
    }
  };

  const handleNumberedButtonClick = (page) => {
    const productIndex = page * 3;
    const newProducts = currentData
      .slice(productIndex, productIndex + numberOfShownProducts)
      .sort((a, b) => (a.name > b.name ? 1 : -1));
    setShownProducts(newProducts);
    setCurrentPageIndex(page);
    localStorage.setItem("products", JSON.stringify(newProducts));
    localStorage.setItem("numberedNavButton", page);
  };

  const handleArrowButtonClick = (buttonType) => {
    const carousel = document.querySelector(".navigation__numbers");
    const button = document.querySelector(".navigation__button_type_number");
    const buttonWidth = button.clientWidth + 9;
    if (buttonType === "rightArrowButton") {
      carousel.scrollLeft += buttonWidth;
    } else if (buttonType === "leftArrowButton") {
      carousel.scrollLeft -= buttonWidth;
    }
  };

  React.useEffect(() => {
    if (localStorage.getItem("numberedNavButton")) {
      setCurrentPageIndex(localStorage.getItem("numberedNavButton"));
    }
  }, []);

  return (
    <main className="catalogue">
      <h1 className="catalogue__header">Карточки контента</h1>
      <SearchForm onSearchItems={handleSearchItems} />
      <Navigation
        currentData={currentData}
        onArrowClick={handleArrowButtonClick}
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
