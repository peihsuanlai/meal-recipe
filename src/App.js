import "./App.css";
import { useGlobalContext } from "./context";
import Search from "./components/Search";
import Meals from "./components/Meals";
import Modal from "./components/Modal";
import Favorites from "./components/Favorites";

function App() {
  const { showModal, favorites } = useGlobalContext();
  return (
    <main>
      <Search />
      {favorites.length > 0 && <Favorites />}
      <Meals />
      {showModal && <Modal />}
    </main>
  );
}

export default App;
