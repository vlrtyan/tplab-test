import React from "react";
import "./SearchForm.scss";

function SearchForm(props) {
  const [search, setSearch] = React.useState("");
  const [sort, setSort] = React.useState("");

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearch(value.toLowerCase());
  };
  const handleSortChange = (e) => {
    if (sort !== e.target.id) {
      Array.from(document.querySelectorAll(".sort__input")).forEach(
        (input) => (input.checked = false)
      );
      setSort(e.target.id);
      props.onSearchItems(search, e.target.id);
      e.target.checked = true;
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    props.onSearchItems(search, sort);
  };

  return (
    <form className="search" noValidate onSubmit={handleSearchSubmit}>
      <div className="sort">
        <p className="sort__header">Сортировать:</p>
        <input
          className="sort__input"
          id="sortByName"
          type="radio"
          onChange={handleSortChange}
          defaultChecked
        />
        <label className="sort__button" htmlFor="sortByName">
          по названию
        </label>
        <input
          className="sort__input"
          id="sortByViews"
          type="radio"
          onChange={handleSortChange}
        />
        <label className="sort__button" htmlFor="sortByViews">
          по просмотрам
        </label>
        <input
          className="sort__input"
          id="sortByStart"
          type="radio"
          onChange={handleSortChange}
        />
        <label className="sort__button" htmlFor="sortByStart">
          по дате начала
        </label>
        <input
          className="sort__input"
          id="sortByEnd"
          type="radio"
          onChange={handleSortChange}
        />
        <label className="sort__button" htmlFor="sortByEnd">
          по дате окончания
        </label>
      </div>
      <div className="search__bar">
        <button className="search__button" type="submit"></button>
        <input
          className="search__input"
          type="text"
          name="search"
          id="item"
          placeholder="Поиск..."
          value={search}
          onChange={handleSearchChange}
        />
      </div>
    </form>
  );
}

export default SearchForm;
