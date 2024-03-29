import { TextInputType } from "./types";

export default function TextInput({ inputData, controller, inputType, state, onBlur }: TextInputType) {

    const name = inputData.name
    const id = inputData.id ? inputData.id : name;
    const desciption = inputData.desciption ? inputData.desciption : id;

    return (
        <div className="text-input">
            <label className="label" htmlFor={id}>{desciption}</label>
            <input type={inputType} name={name} id={id} onChange={controller} onBlur={onBlur} value={state}/>
        </div>
    )
}