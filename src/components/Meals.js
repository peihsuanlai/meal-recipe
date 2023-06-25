import React from "react";
import { useGlobalContext } from "../context";
import { AiOutlineHeart } from "react-icons/ai";

const Meals = () => {
  const { loading, meals, selectMeal, addToFavorites } = useGlobalContext();

  //先判斷是否有拿到資料
  if (loading) {
    return (
      <section className="section">
        <h4>Loading...</h4>
      </section>
    );
  }
  //沒有資料
  if (meals.length < 1) {
    return (
      <section className="section">
        <h4>No meals matched your search term. Please try again.</h4>
      </section>
    );
  }

  //用於顯示surprise出來的卡片(比較寬)
  const isOnlyMeal = meals.length === 1;

  return (
    <section className={isOnlyMeal ? "section-center-only" : "section-center"}>
      {meals.map((singleMeal) => {
        const { idMeal, strMeal: title, strMealThumb: image } = singleMeal;
        return (
          <article
            key={idMeal}
            className={isOnlyMeal ? "single-meal-only" : "single-meal"}
          >
            <img
              src={image}
              className={isOnlyMeal ? "img-only" : "img"}
              onClick={() => selectMeal(idMeal)}
            />
            <footer>
              <h5>{title}</h5>
              <button
                className="like-btn"
                onClick={() => addToFavorites(idMeal)}
              >
                <AiOutlineHeart />
              </button>
            </footer>
          </article>
        );
      })}
    </section>
  );
};

export default Meals;
