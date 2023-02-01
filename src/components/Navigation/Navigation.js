import arrowLeft from "../../images/arrow-left.svg";
import arrowRight from "../../images/arrow-right.svg";
import "./Navigation.scss";
import { numberOfShownProducts } from "../../utils/constants";

function Navigation(props) {
  const numberOfPages = Math.ceil(
    props.currentData.length / numberOfShownProducts
  );

  const handleArrowClick = (e) => {
    const buttonType = e.target.id;
    props.onArrowClick(buttonType);
  };

  const handleNumberClick = (e) => {
    const page = e.target.value;
    props.onNumberClick(page);
  }

  const buttonClass = (index) => {
    return index === Number(props.currentPageIndex)
      ? "navigation__button navigation__button_type_number navigation__button_type_pressed"
      : "navigation__button navigation__button_type_number";
  };

  return (
    <nav className="navigation">
      <button
        className="navigation__button navigation__button_type_arrow"
        type="button"
        onClick={handleArrowClick}
        id="leftArrowButton"
      >
        <img className="navigation__img" src={arrowLeft} alt="Стрелка влево" />
      </button>
      <div className="navigation__numbers">
        {Array(numberOfPages)
          .fill(true)
          .map((btn, index) => (
            <button
              className={buttonClass(index)}
              disabled={index === Number(props.currentPageIndex) ? true : false}
              type="button"
              key={index}
              value={index}
              onClick={handleNumberClick}
            >
              {index + 1}
            </button>
          ))}
      </div>
      <button
        className="navigation__button navigation__button_type_arrow"
        type="button"
        onClick={handleArrowClick}
        id="rightArrowButton"
      >
        <img
          className="navigation__img"
          src={arrowRight}
          alt="Стрелка справо"
        />
      </button>
    </nav>
  );
}

export default Navigation;
