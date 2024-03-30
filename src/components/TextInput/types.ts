import { OnChangeMouse } from "@/utils/types/clicks"
import { InputData } from "../CheckList/types"
import { HTMLInputAutoCompleteAttribute } from "react"
import FieldsException from "@/utils/entities/exceptions/FieldsExceptions"

export type TextInputType = {
    inputData: InputData
    controller: OnChangeMouse,
    inputType: HTMLInputAutoCompleteAttribute,
    state: string | number | undefined,
    onBlur?: () => void
    error: FieldsException | undefined
}