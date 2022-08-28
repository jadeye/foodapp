import { useContext, useEffect, useState } from "react";
import classes from "./HeaderCartButton.module.css";
import CartIcon from "../Cart/CartIcon";
import CartContext from "../../store/cart-context";

const HeaderCartButton = (props) => {
  const [btnHighLighted, setBtnHighLighted] = useState(false);
  const cartCtx = useContext(CartContext);
  const { items } = cartCtx;

  const numberOfCartItems = items.reduce((currentNumber, item) => {
    console.log(`numberOfCartItems FUNC ${currentNumber} - ${item.amount}`);
    return currentNumber + item.amount;
  }, 0);

  useEffect(() => {
    if (items.length === 0) {
      return;
    }
    setBtnHighLighted(true);
    const timer = setTimeout(() => {
      setBtnHighLighted(false);
    }, 250);

    return () => {
      clearTimeout(timer);
    };
  }, [items]);
  console.log(`numberOfCartItems ${numberOfCartItems}`);
  const btnClasses = `${classes.button} ${btnHighLighted ? classes.bump : ""}`;
  return (
    <button className={btnClasses} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  );
};

export default HeaderCartButton;
