import { useState } from "react";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";
import CartProvider from "./store/CartProvider";
import AddNewMeal from "./components/Meals/AddNewMeal";

function App() {
  const [cartIsShown, setCartIsShown] = useState(false);
  const [addNewMealIsShown, setAddNewMealIsShown] = useState(false);

  const showCartHandler = () => {
    setCartIsShown(true);
  };

  const hideCartHandler = () => {
    setCartIsShown(false);
  };

  const showAddNewMealHandler = () => {
    console.log("SHOW NEW MEAL");
    setAddNewMealIsShown(true);
  };

  const hideNewMealHandler = (reason) => {
    const r = { reason };
    console.log(`CLOSE NEW MEAL ${reason}`);
    /*
    now that we have the reason 
    if = success
      then reload mealsList
    */
    setAddNewMealIsShown(false);
  };

  return (
    <CartProvider>
      {cartIsShown && <Cart onClose={hideCartHandler} />}
      {!cartIsShown && addNewMealIsShown && (
        <AddNewMeal onClose={hideNewMealHandler} />
      )}
      <Header
        onShowCart={showCartHandler}
        onShowAddNewMeal={showAddNewMealHandler}
      />
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;
