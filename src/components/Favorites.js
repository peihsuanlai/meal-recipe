import React from "react";
import { useGlobalContext } from "../context";
import { AiOutlineHeart } from "react-icons/ai";

const Favorites = () => {
  const { favorites, selectMeal, removeFromFavorites } = useGlobalContext();

  return (
    <section className="favorites">
      <div className="favorites-content">
        <h5>Your Exclusive Collection   <AiOutlineHeart className="like-btn"/>
        <AiOutlineHeart className="like-btn"/>
        <AiOutlineHeart className="like-btn"/></h5>   
     
        <div className="favorites-container">
          {favorites.map((item) => {
            const { idMeal, strMealThumb: image } = item;
            return (
              <div key={idMeal} className="favorites-item">
                <img
                  src={image}
                  className="img favorites-img"
                  onClick={() => selectMeal(idMeal, true)}
                />
                <button
                  className="remove-btn"
                  onClick={() => removeFromFavorites(idMeal)}
                >
                  remove
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Favorites;
