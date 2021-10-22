import useInput from '../../hooks/useInput';
import classes from './Checkout.module.css';

const isNotEmpty = value => value.trim() !== '';
const isFiveChar = value => value.trim().length === 5;

const Checkout = props => {
  const {
    enteredValue: nameValue,
    valueIsValid: nameIsValid,
    hasError: nameHasError,
    valueChangeHandler: nameChangeHandler,
    inputHandler: nameBlurHandler,
    reset: nameReset,
  } = useInput(isNotEmpty);

  const {
    enteredValue: streetValue,
    valueIsValid: streetIsValid,
    hasError: streetHasError,
    valueChangeHandler: streetChangeHandler,
    inputHandler: streetBlurHandler,
    reset: streetReset,
  } = useInput(isNotEmpty);

  const {
    enteredValue: postalValue,
    valueIsValid: postalIsValid,
    hasError: postalHasError,
    valueChangeHandler: postalChangeHandler,
    inputHandler: postalBlurHandler,
    reset: postalReset,
  } = useInput(isFiveChar);

  const {
    enteredValue: cityValue,
    valueIsValid: cityIsValid,
    hasError: cityHasError,
    valueChangeHandler: cityChangeHandler,
    inputHandler: cityBlurHandler,
    reset: cityReset,
  } = useInput(isNotEmpty);

  let formIsValid = false;

  if (nameIsValid && streetIsValid && postalIsValid && cityIsValid) {
    formIsValid = true;
  }

  const confirmHandler = e => {
    e.preventDefault();

    if (formIsValid) {
      props.onConfirm({
        name: nameValue,
        street: streetValue,
        postalCode: postalValue,
        city: cityValue,
      });
    } else {
      return;
    }

    nameReset();
    streetReset();
    postalReset();
    cityReset();
  };

  const nameClasses = nameHasError
    ? `${classes.control} ${classes.invalid}`
    : `${classes.control}`;
  const streetClasses = streetHasError
    ? `${classes.control} ${classes.invalid}`
    : `${classes.control}`;
  const postalClasses = postalHasError
    ? `${classes.control} ${classes.invalid}`
    : `${classes.control}`;
  const cityClasses = cityHasError
    ? `${classes.control} ${classes.invalid}`
    : `${classes.control}`;

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameClasses}>
        <label htmlFor="name">Your Name</label>
        <input
          type="text"
          id="name"
          value={nameValue}
          onChange={nameChangeHandler}
          onBlur={nameBlurHandler}
        />
        {nameHasError && (
          <p className={classes['error-text']}>Please enter a valid name!</p>
        )}
      </div>
      <div className={streetClasses}>
        <label htmlFor="street">Street</label>
        <input
          type="text"
          id="street"
          value={streetValue}
          onChange={streetChangeHandler}
          onBlur={streetBlurHandler}
        />
        {streetHasError && (
          <p className={classes['error-text']}>Please enter a valid street!</p>
        )}
      </div>
      <div className={postalClasses}>
        <label htmlFor="postal">Postal Code</label>
        <input
          type="text"
          id="postal"
          value={postalValue}
          onChange={postalChangeHandler}
          onBlur={postalBlurHandler}
        />
        {postalHasError && (
          <p className={classes['error-text']}>
            Please enter a valid Postal Code!
          </p>
        )}
      </div>
      <div className={cityClasses}>
        <label htmlFor="city">City</label>
        <input
          type="text"
          id="city"
          value={cityValue}
          onChange={cityChangeHandler}
          onBlur={cityBlurHandler}
        />
        {cityHasError && (
          <p className={classes['error-text']}>Please enter a valid city!</p>
        )}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
