import { useRef, useState } from "react";

import classes from "./Checkout.module.css";

const isEmpty = (value) => value.trim() === "";
const postal = (value) => value.trim().length === 5;
const Checkout = (props) => {
  const [formIsValid, setFormIsValid] = useState({
    name: true,
    street: true,
    postal: true,
    city: true,
  });

  const inputNameRef = useRef();
  const inputStreetRef = useRef();
  const inputPostalRef = useRef();
  const inputCityRef = useRef();

  const confirmHandler = (event) => {
    event.preventDefault();

    const entredName = inputNameRef.current.value;
    const entredStreet = inputStreetRef.current.value;
    const entredPostal = inputPostalRef.current.value;
    const entredCity = inputCityRef.current.value;

    const validEntredName = !isEmpty(entredName);
    console.log(validEntredName);
    const validEntredStreet = !isEmpty(entredStreet);
    const validEntredPostal = postal(entredPostal);
    const validEntredCity = !isEmpty(entredCity);

    setFormIsValid({
      name: validEntredName,
      street: validEntredStreet,
      postal: validEntredPostal,
      city: validEntredCity,
    });

    const formValid =
      validEntredName &&
      validEntredStreet &&
      validEntredPostal &&
      validEntredCity;

    if (!formIsValid) {
      return;
    }
    props.onConfirm({
      name: entredName,
      street: entredStreet,
      postal: entredPostal,
      city: entredCity
    })
  };

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div
        className={`${classes.control} ${
          formIsValid.name ? "" : classes.invalid
        }`}
      >
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" ref={inputNameRef} />
        {!formIsValid.name && <p>Please enter a valid name </p>}
      </div>
      <div
        className={`${classes.control} ${
          formIsValid.street ? "" : classes.invalid
        }`}
      >
        <label htmlFor="street">Street</label>
        <input type="text" id="street" ref={inputStreetRef} />
        {!formIsValid.street && <p>Please enter a valid street </p>}
      </div>
      <div
        className={`${classes.control} ${
          formIsValid.postal ? "" : classes.invalid
        }`}
      >
        <label htmlFor="postal">Postal Code</label>
        <input type="text" id="postal" ref={inputPostalRef} />
        {!formIsValid.postal && <p>Please enter a valid postal </p>}
      </div>
      <div
        className={`${classes.control} ${
          formIsValid.city ? "" : classes.invalid
        }`}
      >
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={inputCityRef} />
        {!formIsValid.city && <p>Please enter a valid city </p>}
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
