import useInput from "../Hooks/use-input";

const BasicForm = (props) => {
  const isNotEmpty = value => value.trim() !== '';

  const {
    value: entredFirstName,
    isValide: entredFirstNameIsValide,
    hasError: firstNameInputHasError,
    valueInputChangeHandler: firstNameChangeHandler,
    valueInputBlurHandler: firstNameBlurHandler,
    reset: resetFirstNameInput
  } = useInput(isNotEmpty);

  const {
    value: entredLastName,
    isValide: entredLastNameIsValide,
    hasError: lastNameInputHasError,
    valueInputChangeHandler: lastNameChangeHandler,
    valueInputBlurHandler: lastNameBlurHandler,
    reset: resetLastNameInput
  } = useInput(isNotEmpty);

  const {
    value: entredEmail,
    isValide: entredEmailIsValide,
    hasError: emailInputHasError,
    valueInputChangeHandler: emailChangeHandler,
    valueInputBlurHandler: emailBlurHandler,
    reset: resetEmailInput
  } = useInput(value => value.trim() !== "" && /\S+@\S+\.\S+/.test(value));

  let formIsValide = false;

  if (entredFirstNameIsValide && entredLastNameIsValide && entredEmailIsValide) {
    formIsValide = true;
  }

  const formSubmissionHandler = (event) => {
    event.preventDefault();

    if (!formIsValide) {
      return;
    }

    console.log(entredFirstName);
    console.log(entredLastName);
    console.log(entredEmail);

    resetFirstNameInput();
    resetLastNameInput();
    resetEmailInput();
  };

  const firstNameClasses = firstNameInputHasError ? 'form-control invalid' : "form-control";
  const lastNameClasses = lastNameInputHasError ? 'form-control invalid' : "form-control";
  const emailInputClasses = emailInputHasError ? 'form-control invalid' : "form-control";

  return (
    <form onSubmit={formSubmissionHandler}>
      <div className='control-group'>
        <div className={firstNameClasses}>
          <label htmlFor='name'>First Name</label>
          <input
            type='text'
            id='first-name'
            onChange={firstNameChangeHandler}
            onBlur={firstNameBlurHandler}
            value={entredFirstName}
          />
          {firstNameInputHasError && <p className="error-text">Please enter a first name.</p>}
        </div>
        <div className={lastNameClasses}>
          <label htmlFor='name'>Last Name</label>
          <input
            type='text'
            id='last-name'
            onChange={lastNameChangeHandler}
            onBlur={lastNameBlurHandler}
            value={entredLastName}
          />
          {lastNameInputHasError && <p className="error-text">Please enter a last name.</p>}
        </div>
      </div>
      <div className={emailInputClasses}>
        <label htmlFor='name'>E-Mail Address</label>
        <input
          type='email'
          id='email'
          onChange={emailChangeHandler}
          onBlur={emailBlurHandler}
          value={entredEmail}
        />
        {emailInputHasError && <p className="error-text">Please enter a valide E-mail.</p>}
      </div>
      <div className='form-actions'>
        <button disabled={!formIsValide}>Submit</button>
      </div>
    </form>
  );
};

export default BasicForm;
