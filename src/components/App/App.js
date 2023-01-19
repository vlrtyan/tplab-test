import React from "react";
import "./App.scss";
import productsData from "../../utils/products.json";
import arrowLeft from "../../images/arrow-left.svg";
import arrowRight from "../../images/arrow-right.svg";
import SearchForm from "../SearchForm/SearchForm";

function App() {
  const [products, setProducts] = React.useState(productsData);

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
    const yyyy = date.getFullYear();

    return dd() + "." + mm() + "." + yyyy;
  };

  const handleSearchItems = (input, sort) => {
    const filteredProducts = productsData.filter((item) => {
      return String(item.name.toLowerCase()).includes(input);
    });
    if (sort === "sortByName") {
      setProducts(filteredProducts.sort((a, b) => (a.name > b.name ? 1 : -1)));
    } else if (sort === "sortByViews") {
      setProducts(
        filteredProducts.sort((a, b) => (a.views > b.views ? 1 : -1))
      );
    } else if (sort === "sortByStart") {
      setProducts(
        filteredProducts.sort((a, b) => (new Date(a.start_date) > new Date (b.start_date) ? 1 : -1))
      );
    } else if (sort === "sortByEnd") {
      setProducts(
        filteredProducts.sort((a, b) => (new Date(a.end_date) > new Date(b.end_date) ? 1 : -1))
      );
    } else {
      setProducts(filteredProducts);
    }
  };

  return (
    <main className="catalogue">
      <h1 className="catalogue__header">Карточки контента</h1>

      <SearchForm onSearchItems={handleSearchItems} />

      <nav className="navigation">
        <button className="navigation__button navigation__button_type_arrow">
          <img
            className="navigation__img"
            src={arrowLeft}
            alt="Стрелка влево"
          />
        </button>
        <button className="navigation__button navigation__button_type_number">
          1
        </button>
        <button className="navigation__button navigation__button_type_number">
          2
        </button>
        <button className="navigation__button navigation__button_type_number">
          3
        </button>
        <button className="navigation__button navigation__button_type_arrow">
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
          {products.map((product, index) => (
            <tr key={index}>
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

export default App;
