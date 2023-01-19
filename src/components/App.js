import "./App.scss";
import products from "../utils/products.json";
import arrowLeft from "../images/arrow-left.svg";
import arrowRight from "../images/arrow-right.svg";

function App() {
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

  return (
    <main className="catalogue">
      <h1 className="catalogue__header">Карточки контента</h1>
      <form className="search">
        <div className="sort">
          <p className="sort__header">Сортировать:</p>
          <label className="sort__button">по названию</label>
          <input className="sort__input"></input>
          <label className="sort__button">по просмотрам</label>
          <input className="sort__input"></input>
          <label className="sort__button">по дате начала</label>
          <input className="sort__input"></input>
          <label className="sort__button">по дате окончания</label>
          <input className="sort__input"></input>
        </div>
        <div className="search__bar">
          <input className="search__input" />
          <button className="search__button"></button>
        </div>
      </form>

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
