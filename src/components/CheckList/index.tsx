import { ControlCheckBox } from "@/view/form";
import CheckBox from "./CheckBox"
import { useContext } from "react"

export function CheckList() {
    const { title, fields } = useContext(ControlCheckBox)
    return (
        <section className="check-list flex column">
            <title>{title}</title>
            <section>
                {fields.map(({ inputData, controller }, index) => <CheckBox key={inputData.name + index} controller={controller} inputData={inputData} />)}
            </section>
        </section>
    );
}