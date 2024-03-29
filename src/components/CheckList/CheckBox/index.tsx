import { useContext, useEffect, useState } from "react";
import { CheckBoxType } from "../types";
import { ControlCheckBox } from "../../../view/form";

export default function CheckBox({ inputData, controller }: CheckBoxType) {
    const { inputs: status } = useContext(ControlCheckBox)
    const [isChecked, setIsChecked] = useState(false);
    useEffect(() => {
        setIsChecked(status[name])
    }, [status])

    const name = inputData.name
    const id = inputData.id ? inputData.id : name;
    const desciption = inputData.desciption ? inputData.desciption : id;

    return (
        <div className="checkbox">
            <label className="label" htmlFor={id}>{desciption}</label>
            <input type="checkbox" name={name} id={id} onChange={controller} checked={isChecked}/>
        </div>
    )
}