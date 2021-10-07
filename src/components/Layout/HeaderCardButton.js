import { useContext } from 'react';
import classes from './HeaderCardButton.module.css';
import CartIcon from '../Cart/CartIcon';
import { CartContext } from '../../context/CartContext';

const HeaderCardButton = props => {
  const cartCtx = useContext(CartContext);

  // Stores the number of items per item type:
  const numberOfCartItems = cartCtx.items.reduce((curNumber, item) => {
    return curNumber + item.amount;
  }, 0);

  return (
    <button className={classes.button} onClick={props.onClickShow}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  );
};

export default HeaderCardButton;
