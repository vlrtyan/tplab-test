import React from "react";
import "./SearchForm.scss";

function SearchForm(props) {
  const [search, setSearch] = React.useState("");
  const [sort, setSort] = React.useState("");
  const storedSortCriterion = localStorage.getItem("sortCriterion");
  const storedInput = localStorage.getItem("search");

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearch(value.toLowerCase());
  };
  const handleSortChange = (e) => {
    setSort(e.target.id);
    props.onSearchItems(search, e.target.id);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    props.onSearchItems(search, sort);
  };

  React.useEffect(() => {
    storedSortCriterion ? setSort(storedSortCriterion) : setSort("sortByName");
    storedSortCriterion
      ? (document.getElementById(storedSortCriterion).checked = true)
      : (document.getElementById("sortByName").checked = true);

    storedInput ? setSearch(storedInput) : setSearch("");
  }, [storedSortCriterion, storedInput]);

  return (
    <form className="search" noValidate onSubmit={handleSearchSubmit}>
      <div className="sort">
        <p className="sort__header">Сортировать:</p>
        <input
          className="sort__input"
          id="sortByName"
          type="radio"
          name="sort"
          onChange={handleSortChange}
        />
        <label className="sort__button" htmlFor="sortByName">
          по названию
        </label>
        <input
          className="sort__input"
          id="sortByViews"
          type="radio"
          name="sort"
          onChange={handleSortChange}
        />
        <label className="sort__button" htmlFor="sortByViews">
          по просмотрам
        </label>
        <input
          className="sort__input"
          id="sortByStart"
          type="radio"
          name="sort"
          onChange={handleSortChange}
        />
        <label className="sort__button" htmlFor="sortByStart">
          по дате начала
        </label>
        <input
          className="sort__input"
          id="sortByEnd"
          type="radio"
          name="sort"
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
