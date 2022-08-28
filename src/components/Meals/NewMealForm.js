import { useState, useRef } from "react";
import classes from "./NewMealForm.module.css";

const isNotEmpty = (value) => value.trim() !== "";
const minLength = (value) => value.trim().length >= 3;

const classNameByError = (inputHasError) => {
  return inputHasError
    ? `${classes.form_control} ${classes.invalid}`
    : `${classes.form_control}`;
};

const priceTester = (num) => {
  let chk = /^[0-9]{1,4}(\.[0-9]{0,2})?$/;
  let valid = chk.test(num);
  return valid;
};

const NewMealForm = (props) => {
  const [enteredMealName, setEnteredMealName] = useState("");
  const [inputMealNameTouched, setInputNameTouched] = useState(false);
  const [enteredDescription, setEnteredDescription] = useState("");
  const [inputDescriptionTouched, setInputDescriptionTouched] = useState(false);
  const [enteredMealPrice, setEnteredMealPrice] = useState("");
  const [inputMealPriceTouched, setInputMealPriceTouched] = useState(false);

  const enteredMealNameIsValid =
    isNotEmpty(enteredMealName) && minLength(enteredMealName);
  const inputMealNameIsInvalid =
    !enteredMealNameIsValid && inputMealNameTouched;
  const enteredDescriptionIsValid =
    isNotEmpty(enteredDescription) && minLength(enteredDescription);
  const inputDescriptionIsInvalid =
    !enteredDescriptionIsValid && inputDescriptionTouched;
  const enteredMealPriceIsValid =
    isNotEmpty(enteredMealPrice) && priceTester(enteredMealPrice);
  const inputMealPriceIsInvalid =
    !enteredMealPriceIsValid && inputMealPriceTouched;

  let formIsValid = false;

  if (
    enteredMealNameIsValid &&
    enteredDescriptionIsValid &&
    enteredMealPriceIsValid
  ) {
    formIsValid = true;
  }

  const formInputClasses =
    !inputMealNameIsInvalid ||
    !inputDescriptionIsInvalid ||
    !inputMealPriceIsInvalid
      ? "form-control"
      : " form-control invalid";

  const enteredMealNameInputRef = useRef();
  const enteredDescriptionInputRef = useRef();
  const enteredPriceInputRef = useRef();

  const menuNameInputChangeHandler = (event) => {
    setEnteredMealName(event.target.value);
  };

  const menuNameInputBlurHandler = (evenet) => {
    setInputNameTouched(true);
  };

  const descriptionInputChangeHandler = (event) => {
    setEnteredDescription(event.target.value);
  };

  const descriptionInputBlurHandler = (evenet) => {
    setInputDescriptionTouched(true);
  };

  const priceInputChangeHandler = (event) => {
    setEnteredMealPrice(event.target.value);
  };

  const priceInputBlurHandler = (evenet) => {
    setInputMealPriceTouched(true);
  };

  const submitFormHandler = (event) => {
    event.preventDefault();
    console.log("onSubmitFormHandler");
    setInputNameTouched(true);
    setInputDescriptionTouched(true);
    setInputMealPriceTouched(true);

    if (!enteredMealNameIsValid) {
      enteredMealNameInputRef.current.focus();
      return;
    }
    if (!enteredDescriptionIsValid) {
      enteredDescriptionInputRef.current.focus();
      return;
    }
    if (!enteredMealNameIsValid) {
      enteredPriceInputRef.current.focus();
      return;
    }

    const mealData = {
      name: enteredMealNameInputRef.current.value,
      description: enteredDescriptionInputRef.current.value,
      price: enteredPriceInputRef.current.value,
    };

    props.onAddNewMeal(mealData);
    /* 
    if (!props.onClick) {
      console.log("Simple close");
    } */
    setEnteredMealName("");
    setEnteredDescription("");
    setEnteredMealPrice("");
    setInputNameTouched(false);
    setInputDescriptionTouched(false);
    setInputMealPriceTouched(false);
    // console.log(`${onClick}`);
    // this.props.onClose("success");
  };
  const inputMealNameClasses = classNameByError(inputMealNameIsInvalid);
  const inputMealDescriptionClasses = classNameByError(
    inputDescriptionIsInvalid
  );
  const inputMealPriceClasses = classNameByError(inputMealPriceIsInvalid);

  return (
    <form className={formInputClasses} onSubmit={submitFormHandler}>
      <div className="control-group">
        <div className={inputMealNameClasses}>
          <label htmlFor="meal-name">Meal Name</label>
          <input
            type="text"
            id="meal-name"
            ref={enteredMealNameInputRef}
            onChange={menuNameInputChangeHandler}
            onBlur={menuNameInputBlurHandler}
            value={enteredMealName}
          />
          {inputMealNameIsInvalid && (
            <p className="error-text">
              Please enter a name at least 3 chars long.
            </p>
          )}
        </div>
        <div className={inputMealDescriptionClasses}>
          <label htmlFor="meal-description">Meal Description</label>
          <input
            type="text"
            id="meal-description"
            ref={enteredDescriptionInputRef}
            onChange={descriptionInputChangeHandler}
            onBlur={descriptionInputBlurHandler}
            value={enteredDescription}
          />
          {inputDescriptionIsInvalid && (
            <p className="error-text">
              Please enter a description at least 3 chars long.
            </p>
          )}
        </div>
        <div className={inputMealPriceClasses}>
          <label htmlFor="meal-price">Meal Price</label>
          <input
            type="text"
            id="meal-price"
            ref={enteredPriceInputRef}
            onChange={priceInputChangeHandler}
            onBlur={priceInputBlurHandler}
            value={enteredMealPrice}
          />
          {inputMealPriceIsInvalid && (
            <p className="error-text">
              Please enter a valid Price - maximum 4 digits + 2 after decimal
              point.
            </p>
          )}
        </div>
      </div>
      <div className={classes.actions}>
        <button
          type="button"
          className={classes.button__alt}
          onClick={() => props.onClose()}
        >
          Close
        </button>
        <button type="submit" disabled={!formIsValid}>
          {props.loading ? "Sending..." : "Add New Meal"}
        </button>
      </div>
    </form>
  );
};

export default NewMealForm;
