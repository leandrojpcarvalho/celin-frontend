import { OnChangeMouse } from "@/utils/types/clicks"
import { InputData } from "../CheckList/types"
import { HTMLInputAutoCompleteAttribute } from "react"

export type TextInputType = {
    inputData: InputData
    controller: OnChangeMouse,
    inputType: HTMLInputAutoCompleteAttribute,
    state: string | number | undefined,
    onBlur?: () => void
}