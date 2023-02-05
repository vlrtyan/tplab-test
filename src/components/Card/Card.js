import React from "react";
import { useParams } from "react-router-dom";
import "./Card.scss";
import { removeSymbols } from "../../utils/constants";

function Card(props) {
  let { id } = useParams();
  let products = props.productsData;
  const product = products.find(
    (product) => String(removeSymbols(product.name)) === id
  );

  const price = (priceType) => {
    const separator = /\.|,/;
    priceType = String(priceType);
    return (
      <>
        <p className="card__sum_name_rub">{priceType.split(separator)[0]}</p>
        {priceType.split(separator)[1] && (
          <p className="card__sum_name_kopeck">
            {priceType.split(separator)[1].length < 2
              ? priceType.split(separator)[1] * 10
              : priceType.split(separator)[1]}
          </p>
        )}
        <p>₽</p>
      </>
    );
  };

  return (
    <main className="card">
      <button
        className="card__back-button"
        type="button"
        onClick={props.onBack}
      >
        &#10094; Назад
      </button>
      <div className="card__container">
        <div className="card__header">
          {Number(product.discount) !== 0 && (
            <p className="card__discount">{`-${product.discount}%`}</p>
          )}
          {product.logo_url && (
            <img
              className="card__logo"
              src={product.logo_url}
              alt="Логотип бренда"
            />
          )}
        </div>
        <div className="card__body">
          {product.image_url && (
            <img
              className="card__image"
              src={product.image_url}
              alt={product.name}
            />
          )}
          <h1 className="card__name">{product.name}</h1>
          {product.new_price && (
            <div className="card__price card__price_type_old">
              <div className="card__sum card__sum_type_old">
                {price(product.old_price)}
              </div>
              <p className="card__price-type">Старая цена</p>
            </div>
          )}
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
            {product.new_price ? (
              <div className="card__sum card__sum_type_new">
                {price(product.new_price)}
              </div>
            ) : (
              <div className="card__sum card__sum_type_new">
                {price(product.old_price)}
              </div>
            )}
            <p className="card__price-type">Цена по акции</p>
          </div>
        </div>
        <p className="card__disclaimer">{product.disclaimer}</p>
      </div>
    </main>
  );
}

export default Card;
