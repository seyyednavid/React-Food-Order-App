import { useRef, useState } from "react";
import classes from "./Checkout.module.css";

const isEmpty = (value) => value.trim() === "";
const isFiveOrSixChar = (value) =>
  value.trim().length === 5 || value.trim().length === 6;

const Checkout = (props) => {
  const [formInputsValidity, setFormInputsValidity] = useState({
    name: true,
    street: true,
    postalCode: true,
    city: true,
  });

  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const postalCodeInputRef = useRef();
  const cityInputRef = useRef();

  const confirmHandler = (event) => {
    event.preventDefault();
    const enteredName = nameInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredPostalCode = postalCodeInputRef.current.value;
    const enteredCity = cityInputRef.current.value;

    const enteredNameIsValid = !isEmpty(enteredName);
    const enteredStreetIsValid = !isEmpty(enteredStreet);
    const enteredPostalCodeIsValid = isFiveOrSixChar(enteredPostalCode);
    const enteredCityIsValid = !isEmpty(enteredCity);

    setFormInputsValidity({
      name: enteredNameIsValid,
      street: enteredStreetIsValid,
      postalCode: enteredPostalCodeIsValid,
      city: enteredCityIsValid,
    });

    const formIsValid =
      enteredNameIsValid &&
      enteredStreetIsValid &&
      enteredPostalCodeIsValid &&
      enteredCityIsValid;

    if (!formIsValid) {
      return;
    }

    props.onConfirm({
      name: enteredName,
      street: enteredStreet,
      postalCode: enteredPostalCode,
      city: enteredCity,
    });

    nameInputRef.current.value = "";
    streetInputRef.current.value = "";
    postalCodeInputRef.current.value = "";
    cityInputRef.current.value = "";
  };

  const nameBlurHandler = () => {
    setFormInputsValidity((prevState) => ({
      ...prevState,
      name: !isEmpty(nameInputRef.current.value),
    }));
  };

  const streetBlurHandler = () => {
    setFormInputsValidity((prevState) => ({
      ...prevState,
      street: !isEmpty(streetInputRef.current.value),
    }));
  };

  const postalCodeBlurHandler = () => {
    setFormInputsValidity((prevState) => ({
      ...prevState,
      postalCode: isFiveOrSixChar(postalCodeInputRef.current.value),
    }));
  };

  const cityBlurHandler = () => {
    setFormInputsValidity((prevState) => ({
      ...prevState,
      city: !isEmpty(cityInputRef.current.value),
    }));
  };

  const nameControlClasses = `${classes.control} ${
    !formInputsValidity.name ? classes.invalid : ""
  }`;
  const streetControlClasses = `${classes.control} ${
    !formInputsValidity.street ? classes.invalid : ""
  }`;
  const postalCodeControlClasses = `${classes.control} ${
    !formInputsValidity.postalCode ? classes.invalid : ""
  }`;
  const cityControlClasses = `${classes.control} ${
    !formInputsValidity.city ? classes.invalid : ""
  }`;

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameControlClasses}>
        <label htmlFor="name">Your Name</label>
        <input
          type="text"
          id="name"
          ref={nameInputRef}
          onBlur={nameBlurHandler}
        />
        {!formInputsValidity.name ? <p>Please input your name</p> : ""}
      </div>
      <div className={streetControlClasses}>
        <label htmlFor="street">Street</label>
        <input
          type="text"
          id="street"
          ref={streetInputRef}
          onBlur={streetBlurHandler}
        />
        {!formInputsValidity.street ? <p>Please input your street</p> : ""}
      </div>
      <div className={postalCodeControlClasses}>
        <label htmlFor="postal">Postal Code</label>
        <input
          type="text"
          id="postal"
          ref={postalCodeInputRef}
          onBlur={postalCodeBlurHandler}
        />
        {!formInputsValidity.postalCode ? (
          <p>Please input your postal code (Five or Six char)</p>
        ) : (
          ""
        )}
      </div>
      <div className={cityControlClasses}>
        <label htmlFor="city">City</label>
        <input
          type="text"
          id="city"
          ref={cityInputRef}
          onBlur={cityBlurHandler}
        />
        {!formInputsValidity.city ? <p>Please input your city</p> : ""}
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
