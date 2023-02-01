import React from "react";
import "./Catalogue.scss";
import {
    formatDate,
    removeSymbols,
  } from "../../utils/constants";

function Catalogue(props) {
  

  const handleProductClick = (e) => {
    props.onProductClick(e.currentTarget);
  };

  return (
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
        {props.shownProducts.map((product, index) => (
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
  );
}

export default Catalogue;
