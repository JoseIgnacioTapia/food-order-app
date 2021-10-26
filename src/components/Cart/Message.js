import classes from './Message.module.css';

const Message = props => {
  const msgClasses = props.btnMsg
    ? `${classes.message} ${classes['error-text']}`
    : `${classes.message} ${classes['succesfully-text']}`;

  return (
    <div>
      <p className={msgClasses}>{props.message}</p>
      <div className={classes.actions}>
        <button className={classes.button} onClick={props.onCloseMessage}>
          {props.btnMsg ? 'Try Again!' : 'Close'}
        </button>
      </div>
    </div>
  );
};

export default Message;
