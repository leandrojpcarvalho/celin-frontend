import { OnChangeMouse } from "@/utils/types/clicks"

export type InputData = {
    name: string,
    id?: string,
    desciption?: string,
}

export type CheckBoxType = {
    inputData: InputData
    controller: OnChangeMouse
}

export type CheckListType = {
    fields: CheckBoxType[],
    title: string,
}