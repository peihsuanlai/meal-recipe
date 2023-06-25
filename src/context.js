import React, { useContext, useEffect, useState } from "react";
import axios from "axios";

const AppContext = React.createContext();

const allMealsUrl = "https://www.themealdb.com/api/json/v1/1/search.php?s=";
const randomMealUrl = "https://www.themealdb.com/api/json/v1/1/random.php";

const getFavoritesFromLocalStorage = () => {
  let favorites = localStorage.getItem("favorites");
  if (favorites) {
    favorites = JSON.parse(localStorage.getItem("favorites"));
  } else {
    favorites = [];
  }
  return favorites;
};

const AppProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [meals, setMeals] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [favorites, setFavorites] = useState(getFavoritesFromLocalStorage());

  //拿資料 (加入loading state確保有拿到資料再顯示)
  const fetchMeals = async (url) => {
    setLoading(true);
    try {
      const response = await axios.get(url);
      // response.data是物件
      // response.data.meals才是包含很多道菜(物件)的陣列
      if (response.data.meals) {
        setMeals(response.data.meals); //data.meals
      } else {
        setMeals([]);
      }
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };

  //surprise卡片
  const fetchRandomMeal = () => {
    fetchMeals(randomMealUrl);
  };

  //點選卡片 (主選單和最愛選單) 後出現modal
  const selectMeal = (idMeal, favoriteMeal) => {
    let meal;
    if (favoriteMeal) {
      meal = favorites.find((meal) => meal.idMeal === idMeal);
    } else {
      meal = meals.find((meal) => meal.idMeal === idMeal);
    }
    setSelectedMeal(meal); //給modal做卡片
    setShowModal(true); //顯示modal
  };

  //關閉modal
  const closeModal = () => {
    setShowModal(false);
  };

  //加入最愛清單
  const addToFavorites = (idMeal) => {
    const alreadyFavorite = favorites.find((meal) => meal.idMeal === idMeal);
    if (alreadyFavorite) return;
    const meal = meals.find((meal) => meal.idMeal === idMeal); //從meals陣列中找到點選的meal
    const updatedFavorites = [...favorites, meal];
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  //從清單中移除項目
  const removeFromFavorites = (idMeal) => {
    const updatedFavorites = favorites.filter((meal) => meal.idMeal !== idMeal); //挑選出沒有被點選的meal，形成一個新陣列
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  //畫面初次渲染時，fetch初始圖
  useEffect(() => {
    fetchMeals(allMealsUrl);
  }, []);

  //畫面初次渲染以及searchTerm改變且有值時，fetch搜尋的圖片
  useEffect(() => {
    if (!searchTerm) return; //如果沒有值，就直接return
    fetchMeals(`${allMealsUrl}${searchTerm}`);
  }, [searchTerm]);

  return (
    <AppContext.Provider
      value={{
        loading,
        meals,
        setSearchTerm,
        fetchRandomMeal,
        showModal,
        selectedMeal,
        selectMeal,
        closeModal,
        addToFavorites,
        removeFromFavorites,
        favorites,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider, useGlobalContext };
