import { useEffect, useState } from "react"

export const useInput = (initValue, validators) => {
    const [value, setValue] = useState(initValue);
    const [isDirty, setDirty] = useState(false);
    const valid = useValidation(value, validators);

    const onChange = (evt) => {
        setValue(evt.target.value);
    }

    const onBlur = (evt) => {
        setDirty(true);
    }

    return {
        value,
        onChange,
        onBlur,
        isDirty,
        ...valid
    }
}

export const useValidation = (value, validators) => {
    const [isEmpty, setEmpty] = useState(true);
    const [minLengthError, setMinLengthError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    
    const [inputValid, setInputValid] = useState(false);

    useEffect(() => {
        for (const validator in validators){
            switch (validator) {
                case "isEmpty":
                    value ? setEmpty(false) : setEmpty(true);
                    break;
                case "minLength":
                    value.length < validators[validator] ? setMinLengthError(true) : setMinLengthError(false);
                    break;
                case "isEmail":
                    const reg = /^[a-zA-Z0-9]*@[a-zA-Z0-9]+\.[a-zA-Z0-9]+$/;
                    reg.test(value) ? setEmailError(false) : setEmailError(true);
                    break;
            }
        }
    },
    [value])

    useEffect(() => {
        if (isEmpty || minLengthError || emailError){
            setInputValid(false);
        }
        else{
            setInputValid(true);
        }
    },
    [isEmpty, minLengthError, emailError])

    return {
        isEmpty,
        minLengthError,
        emailError,
        inputValid,
    }
}