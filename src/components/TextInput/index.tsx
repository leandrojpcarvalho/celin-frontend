import { useEffect, useState } from "react";
import { TextInputType } from "./types";

export default function TextInput({ inputData, controller, inputType, state, onBlur, error }: TextInputType) {
    const [isErrorField, setIsErrorField] = useState(false);
    useEffect(() => {   
        if (error && error.getLocation().includes(inputData.name)) {
            setIsErrorField(true);
        } else {
            setIsErrorField(false);
        }
    }, [error]);
    const name = inputData.name
    const id = inputData.id ? inputData.id : name;
    const desciption = inputData.desciption ? inputData.desciption : id;

    return (
        <div className={`text-input${isErrorField ? ' error': ''}`}>
            <label className="label" htmlFor={id}>{desciption}</label>
            <input type={inputType} name={name} id={id} onChange={controller} onBlur={onBlur} value={state}/>
        </div>
    )
}