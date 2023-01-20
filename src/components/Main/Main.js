import React from "react";
import "./Main.scss";
import productsData from "../../utils/products.json";
import arrowLeft from "../../images/arrow-left.svg";
import arrowRight from "../../images/arrow-right.svg";
import SearchForm from "../SearchForm/SearchForm";
import { formatDate, numberOfShownProducts, removeSymbols } from "../../utils/constants";

function Main(props) {
  const numberOfPages = Math.ceil(productsData.length / numberOfShownProducts);

  const [products, setProducts] = React.useState(
    productsData
      .slice(0, numberOfShownProducts)
      .sort((a, b) => (a.name > b.name ? 1 : -1))
  );
  const [shownProducts, setShownProducts] = React.useState(products);

  const handleSearchItems = (input, sort) => {
    const filteredProducts = products.filter((item) => {
      return String(item.name.toLowerCase()).includes(input);
    });
    if (sort === "sortByName") {
      setShownProducts(
        filteredProducts.sort((a, b) => (a.name > b.name ? 1 : -1))
      );
    } else if (sort === "sortByViews") {
      setShownProducts(
        filteredProducts.sort((a, b) => (a.views > b.views ? 1 : -1))
      );
    } else if (sort === "sortByStart") {
      setShownProducts(
        filteredProducts.sort((a, b) =>
          new Date(a.start_date) > new Date(b.start_date) ? 1 : -1
        )
      );
    } else if (sort === "sortByEnd") {
      setShownProducts(
        filteredProducts.sort((a, b) =>
          new Date(a.end_date) > new Date(b.end_date) ? 1 : -1
        )
      );
    } else {
      setShownProducts(
        filteredProducts.sort((a, b) => (a.name > b.name ? 1 : -1))
      );
    }
    if (filteredProducts.length === 0) {
      alert("Ничего не найдено");
    }
  };

  const handleNumberedButtonClick = (e) => {
    Array.from(
      document.querySelectorAll(".navigation__button_type_number")
    ).forEach((button) => {
      button.classList.remove("navigation__button_type_pressed");
    });
    const page = e.target.value;
    const productIndex = (page - 1) * 3;
    const newProducts = productsData
      .slice(productIndex, productIndex + numberOfShownProducts)
      .sort((a, b) => (a.name > b.name ? 1 : -1));
    setProducts(newProducts);
    setShownProducts(newProducts);
    e.target.classList.add("navigation__button_type_pressed");
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
