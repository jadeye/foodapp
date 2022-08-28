import React, { Fragment } from "react";
import mealsImg from "../../assets/meals.jpg";

import classes from "./Header.module.css";
import HeaderAddNewMealButton from "./HeaderAddNewMealButton";
import HeaderCartButton from "./HeaderCartButton";

const Header = (props) => {
  return (
    <Fragment>
      <header className={classes.header}>
        <h1>React Meals</h1>
        <HeaderAddNewMealButton onClick={props.onShowAddNewMeal} />
        <HeaderCartButton onClick={props.onShowCart} />
      </header>
      <div className={classes["main-image"]}>
        <img src={mealsImg} alt="Table full of tasty food" />
      </div>
    </Fragment>
  );
};

export default Header;
