import React from "react";
import { useParams, NavLink } from "react-router-dom";
import "./Card.scss";
import { removeSymbols } from "../../utils/constants";

function Card(props) {
  let { name } = useParams();
  let products = props.products;
  const product = products.find(
    (product) => removeSymbols(product.name) === name
  );

  return (
    <main className="card">
      <NavLink className="card__back-button" to="/">
        &#10094; Назад
      </NavLink>
      <div className="card__container">
        <div className="card__header">
          <p className="card__discount">{`-${product.discount}%`}</p>
          <img className="card__logo" src={product.logo_url} alt="" />
        </div>
        <div className="card__body">
          <img
            className="card__image"
            src={product.image_url}
            alt={product.name}
          />
          <h1 className="card__name">{product.name}</h1>
          <div className="card__price card__price_type_old">
            <p className="card__sum card__sum_type_old">{`${product.old_price} ₽`}</p>
            <p className="card__price-type">Старая цена</p>
          </div>
          <div className="card__price card__price_type_new">
            <div className="star-wrapper">
              <span className="star-wrapper__star">
                {product.stars >= 1 ? <>&#9733;</> : <>&#9734;</>}
              </span>
              <span className="star-wrapper__star">
                {product.stars >= 2 ? <>&#9733;</> : <>&#9734;</>}
              </span>
              <span className="star-wrapper__star">
                {product.stars >= 3 ? <>&#9733;</> : <>&#9734;</>}
              </span>
              <span className="star-wrapper__star">
                {product.stars >= 4 ? <>&#9733;</> : <>&#9734;</>}
              </span>
              <span className="star-wrapper__star">
                {product.stars === 5 ? <>&#9733;</> : <>&#9734;</>}
              </span>
            </div>
            <p className="card__sum card__sum_type_new">{`${product.new_price ? product.new_price : product.old_price} ₽`}</p>
            <p className="card__price-type">Цена по акции</p>
          </div>
        </div>
        <p className="card__disclaimer">{product.disclaimer}</p>
      </div>
    </main>
  );
}

export default Card;
