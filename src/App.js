import { useState } from 'react';
import CartProvider from './context/CartContext';
import OrdersProvider from './context/OrdersContext';
import Cart from './components/Cart/Cart';
import Header from './components/Layout/Header';
import Meals from './components/Meals/Meals';

function App() {
  const [cartIsShown, setcartIsShown] = useState(false);

  const showCartHandler = () => {
    setcartIsShown(true);
  };

  const hideCartHandler = () => {
    setcartIsShown(false);
  };

  return (
    <CartProvider>
      <OrdersProvider>
        {cartIsShown && <Cart onClose={hideCartHandler} />}
        <Header onShowCart={showCartHandler} />
        <Meals />
      </OrdersProvider>
    </CartProvider>
  );
}

export default App;
