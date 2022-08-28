import { useEffect, useState } from "react";
import classes from "./HeaderCartButton.module.css";
import NewMealIcon from "../Meals/NewMealIcon";

const HeaderAddNewMealButton = (props) => {
  const [btnHighLighted, setBtnHighLighted] = useState(false);

  useEffect(() => {
    setBtnHighLighted(true);
    const timer = setTimeout(() => {
      setBtnHighLighted(false);
    }, 250);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  const btnClasses = `${classes.button} ${btnHighLighted ? classes.bump : ""}`;
  return (
    <button className={btnClasses} onClick={props.onClick}>
      <span className={classes.icon}>
        <NewMealIcon />
      </span>
      <span>New Meal Form</span>
    </button>
  );
};

export default HeaderAddNewMealButton;
