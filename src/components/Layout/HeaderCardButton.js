import { useContext, useState, useEffect } from 'react';
import classes from './HeaderCardButton.module.css';
import CartIcon from '../Cart/CartIcon';
import { CartContext } from '../../context/CartContext';

const HeaderCardButton = props => {
  const cartCtx = useContext(CartContext);

  const [btnIsHighLighted, setBtnIsHighLighted] = useState(false);

  const { items } = cartCtx;

  // Stores the number of items per item type:
  const numberOfCartItems = items.reduce((curNumber, item) => {
    return curNumber + item.amount;
  }, 0);

  const btnClasses = `${classes.button} ${
    btnIsHighLighted ? classes.bump : ''
  }`;

  useEffect(() => {
    if (items.length === 0) {
      return;
    }
    setBtnIsHighLighted(true);

    const timer = setTimeout(() => {
      setBtnIsHighLighted(false); // For deleting the animation button class
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [items]);

  return (
    <button className={btnClasses} onClick={props.onClickShow}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  );
};

export default HeaderCardButton;
