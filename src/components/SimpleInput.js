// import { useState } from "react";
import useInput from "../Hooks/use-input";

const SimpleInput = (props) => {
  const {
    value: entredName,
    isValide: entredNameIsValide,
    hasError: nameInputHasError,
    valueInputChangeHandler: nameChangeHandler,
    valueInputBlurHandler: nameBlurHandler,
    reset: resetNameInput
  } = useInput(value => value.trim() !== "");

  const {
    value: entredEmail,
    isValide: entredEmailIsValide,
    hasError: emailInputHasError,
    valueInputChangeHandler: emailChangeHandler,
    valueInputBlurHandler: emailBlurHandler,
    reset: resetEmailInput
  } = useInput(value => value.trim() !== "" && /\S+@\S+\.\S+/.test(value));

  // const nameInputRef = useRef();
  // const [entredName, setEntredName] = useState('');
  // const [entredNameTouched, setEntredNameTouched] = useState(false);

  // const entredNameIsValide = entredName.trim() !== "";
  // const nameInputIsInvalide = !entredNameIsValide && entredNameTouched


  let formIsValide = false;

  if (entredNameIsValide && entredEmailIsValide) {
    formIsValide = true;
  }

  // const nameInputChangeHandler = (event) => {
  //   setEntredName(event.target.value)
  // };

  // const nameInputBlurHandler = () => {
  //   setEntredNameTouched(true);
  // };


  const formSubmissionHandler = (event) => {
    event.preventDefault();

    // setEntredNameTouched(true);

    if (!entredNameIsValide && !entredEmailIsValide) {
      return;
    };

    console.log(entredName);
    console.log(entredEmail);
    // const entredValue = nameInputRef.current.value;
    // console.log(entredValue);

    // nameInputRef.current.value = ""; - NOT ideal, DO NOT manipulate the DOM 
    // setEntredName("");
    // setEntredNameTouched(false);

    resetNameInput();
    resetEmailInput();
  };

  const nameInputClasses = nameInputHasError ? 'form-control invalid' : "form-control";
  const emailInputClasses = emailInputHasError ? 'form-control invalid' : "form-control";

  return (
    <form onSubmit={formSubmissionHandler}>
      <div className={nameInputClasses}>
        <label htmlFor='name'>Your Name</label>
        <input
          // ref={nameInputRef}
          type='text'
          id='name'
          onChange={nameChangeHandler}
          onBlur={nameBlurHandler}
          value={entredName}
        />
        {nameInputHasError && <p className="error-text">Name must not be empty! </p>}
      </div>
      <div className={emailInputClasses}>
        <label htmlFor='email'>Your E-mail</label>
        <input
          type='email'
          id='email'
          onChange={emailChangeHandler}
          onBlur={emailBlurHandler}
          value={entredEmail}
        />
        {emailInputHasError && <p className="error-text">Please enter a valide email!</p>}
      </div>
      <div className="form-actions">
        <button disabled={!formIsValide}>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
