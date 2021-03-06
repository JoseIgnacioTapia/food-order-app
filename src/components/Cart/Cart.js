import { Fragment } from 'react';
import { useState, useContext } from 'react';
import { CartContext } from '../../context/CartContext';
import { OrdersContext } from '../../context/OrdersContext';
import Modal from '../UI/Modal';
import classes from './Cart.module.css';
import CartItem from './CartItem';
import Checkout from './Checkout';
import Message from './Message';

const Cart = props => {
  const cartCtx = useContext(CartContext);
  const ordersCntx = useContext(OrdersContext);

  const [checkout, setCheckout] = useState(false);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = id => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = item => {
    cartCtx.addItem({ ...item, amount: 1 }); // Adding the Item per 1 of click
  };

  const submitOrderHandler = async userData => {
    await ordersCntx.createOrder(userData, cartCtx.items);

    cartCtx.clearCart();
  };

  const cartItems = (
    <ul className={classes['cart-items']}>
      {cartCtx.items.map(item => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  const orderCheckoutHandler = () => {
    setCheckout(true);
  };

  const modalActions = (
    <div className={classes.actions}>
      <button className={classes['button--alt ']} onClick={props.onClose}>
        Close
      </button>
      {hasItems && (
        <button className={classes.button} onClick={orderCheckoutHandler}>
          Order
        </button>
      )}
    </div>
  );

  const cartModalContent = (
    <Fragment>
      {' '}
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {checkout && (
        <Checkout onConfirm={submitOrderHandler} onCancel={props.onClose} />
      )}
      {!checkout && modalActions}
    </Fragment>
  );

  const isSubmittingModalContent = <p>Sending order data...</p>;

  const didSubmitModalHandler = () => {
    props.onClose();
    ordersCntx.setDidSubmit(false);
    ordersCntx.setIsSubmitting(false);
    ordersCntx.setHttpError(null);
  };

  return (
    <Modal onClose={props.onClose}>
      {!ordersCntx.isSubmitting && !ordersCntx.didSubmit && cartModalContent}
      {ordersCntx.isSubmitting &&
        !ordersCntx.httpError &&
        isSubmittingModalContent}
      {!ordersCntx.isSubmitting && ordersCntx.didSubmit && (
        <Message
          message="Order sended sucesfully! ????"
          onCloseMessage={didSubmitModalHandler}
        />
      )}
      {ordersCntx.httpError && (
        <Message
          message="Something went wrong ????"
          onCloseMessage={didSubmitModalHandler}
          btnMsg={ordersCntx.httpError}
        />
      )}
    </Modal>
  );
};

export default Cart;
