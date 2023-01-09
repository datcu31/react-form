import { useState, useReducer } from "react";

const initialInputState = {
    value: '',
    isTouched: false,
};

const inputStateReducer = (state, action) => {
    if (action.type === "INPUT") {
        return { value: action.value, isTouched: state.isTouched }
    }
    if (action.type === 'BLUR') {
        return { isTouched: true, value: state.value }
    }
    if (action.type === "RESET") {
        return { isTouched: false, value: ''}
    }
    return inputStateReducer;
};

const useInput = (valideValue) => {
    const [inputState, dispatch] = useReducer(inputStateReducer, initialInputState)

    // const [entredValue, setEntredValue] = useState('');
    // const [isTouched, setIsTouched] = useState(false);

    const valueIsValide = valideValue(inputState.value);
    const hasError = !valueIsValide && inputState.isTouched;

    const valueInputChangeHandler = (event) => {
        dispatch({ type: 'INPUT', value: event.target.value })
        // setEntredValue(event.target.value)
    };

    const valueInputBlurHandler = () => {
        dispatch({ type: 'BLUR' })
        // setIsTouched(true);
    };

    const reset = () => {
        dispatch({ type: 'RESET' })
        // setEntredValue('');
        // setIsTouched(false);
    };

    return {
        value: inputState.value,
        isValide: valueIsValide,
        hasError,
        valueInputChangeHandler,
        valueInputBlurHandler,
        reset
    }
};

export default useInput;