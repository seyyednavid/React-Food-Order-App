import React, { useState } from "react";
import Header from "./component/Layout/Header";
import CardProvider from "./store/CartProvider";
import Meals from "./component/Meals/Meals";
import Cart from "./component/Cart/Cart";

function App() {
  const [cartIsShown, setCartIsShown] = useState(false);

  const showCartHandler = () => {
    setCartIsShown(true);
  };

  const hideCartHandler = () => {
    setCartIsShown(false);
  };

  return (
    <CardProvider>
      {cartIsShown && <Cart onHideCard={hideCartHandler} />}
      <Header onShowCart={showCartHandler} />
      <Meals />
    </CardProvider>
  );
}

export default App;
