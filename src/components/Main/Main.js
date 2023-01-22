import React from "react";
import "./Main.scss";
import productsData from "../../utils/products.json";
import arrowLeft from "../../images/arrow-left.svg";
import arrowRight from "../../images/arrow-right.svg";
import SearchForm from "../SearchForm/SearchForm";
import {
  formatDate,
  numberOfShownProducts,
  removeSymbols,
} from "../../utils/constants";

function Main(props) {
  const numberOfPages = Math.ceil(productsData.length / numberOfShownProducts);
  const [currentPage, setCurrentPage] = React.useState(1);

  const [products, setProducts] = React.useState(
    productsData
      .slice(0, numberOfShownProducts)
      .sort((a, b) => (a.name > b.name ? 1 : -1))
  );
  const [shownProducts, setShownProducts] = React.useState(products);

  const handleSearchItems = (input, sort) => {
    localStorage.setItem("search", input);
    localStorage.setItem("sortCriterion", sort);
    const filteredProducts = products.filter((item) => {
      return String(item.name.toLowerCase()).includes(input);
    });
    const sortedProducts = filteredProducts.sort((a, b) => {
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
    setShownProducts(sortedProducts);
    localStorage.setItem("products", JSON.stringify(sortedProducts));
    if (filteredProducts.length === 0) {
      alert("Ничего не найдено");
    }
  };

  const handleNumberedButtonClick = (e) => {
    const page = e.target.value;
    const productIndex = (page - 1) * 3;
    const newProducts = productsData
      .slice(productIndex, productIndex + numberOfShownProducts)
      .sort((a, b) => (a.name > b.name ? 1 : -1));
    setProducts(newProducts);
    setShownProducts(newProducts);
    setCurrentPage(page);
    localStorage.setItem("products", JSON.stringify(newProducts));
    localStorage.setItem("numberedNavButton", page);
  };

  const handleArrowButtonClick = (e) => {
    const carousel = document.querySelector(".navigation__numbers");
    const button = document.querySelector(".navigation__button_type_number");
    const buttonWidth = button.clientWidth + 9;
    const buttonType = e.currentTarget.id;
    if (buttonType === "rightArrowButton") {
      carousel.scrollLeft += buttonWidth;
    } else if (buttonType === "leftArrowButton") {
      carousel.scrollLeft -= buttonWidth;
    }
  };

  const handleProductClick = (e) => {
    props.onProductClick(e.currentTarget);
  };

  React.useEffect(() => {
    const storedButtonIndex = localStorage.getItem("numberedNavButton") - 1;
    const allButtons = Array.from(
      document.querySelectorAll(".navigation__button_type_number")
    );
    const resetButtons = () => {
      allButtons.forEach((button) => {
        button.classList.remove("navigation__button_type_pressed");
      });
    };
    if (localStorage.getItem("numberedNavButton")) {
      resetButtons();
      allButtons[storedButtonIndex].classList.add(
        "navigation__button_type_pressed"
      );
    } else {
      resetButtons();
      allButtons[currentPage - 1].classList.add(
        "navigation__button_type_pressed"
      );
    }
  }, [currentPage]);

  React.useEffect(() => {
    if (localStorage.getItem("products")) {
      const storedProducts = JSON.parse(localStorage.getItem("products"));
      setProducts(storedProducts);
      setShownProducts(storedProducts);
    }
  }, []);

  return (
    <main className="catalogue">
      <h1 className="catalogue__header">Карточки контента</h1>

      <SearchForm onSearchItems={handleSearchItems} />

      <nav className="navigation">
        <button
          className="navigation__button navigation__button_type_arrow"
          type="button"
          onClick={handleArrowButtonClick}
          id="leftArrowButton"
        >
          <img
            className="navigation__img"
            src={arrowLeft}
            alt="Стрелка влево"
          />
        </button>
        <div className="navigation__numbers">
          {Array(numberOfPages)
            .fill(true)
            .map((page, index) => (
              <button
                className="navigation__button navigation__button_type_number"
                type="button"
                key={index}
                value={index + 1}
                onClick={handleNumberedButtonClick}
              >
                {index + 1}
              </button>
            ))}
        </div>
        <button
          className="navigation__button navigation__button_type_arrow"
          type="button"
          onClick={handleArrowButtonClick}
          id="rightArrowButton"
        >
          <img
            className="navigation__img"
            src={arrowRight}
            alt="Стрелка справо"
          />
        </button>
      </nav>

      <table className="table">
        <thead>
          <tr>
            <th className="table__header-cell">Фото</th>
            <th className="table__header-cell">Название</th>
            <th className="table__header-cell">Просмотры</th>
            <th className="table__header-cell">Начало ротации</th>
            <th className="table__header-cell">Конец ротации</th>
          </tr>
        </thead>
        <tbody>
          {shownProducts.map((product, index) => (
            <tr
              className="table__product"
              key={index}
              value={String(removeSymbols(product.name))}
              onClick={handleProductClick}
            >
              <td className="table__cell">
                <img
                  className="table__image"
                  src={product.image_url}
                  alt={product.name}
                />
              </td>
              <td className="table__cell">{product.name}</td>
              <td className="table__cell">{product.views}</td>
              <td className="table__cell">{formatDate(product.start_date)}</td>
              <td className="table__cell">{formatDate(product.end_date)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}

export default Main;
