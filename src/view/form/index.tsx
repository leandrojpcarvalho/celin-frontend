import { CheckList } from "@/components/CheckList";
import { CheckBoxType } from "@/components/CheckList/types";
import TextInput from "@/components/TextInput";
import Utils from "@/utils";
import Address from "@/utils/entities/Address";
import Configs from "@/utils/entities/Configs";
import FieldException from "@/utils/entities/exceptions/FieldsExceptions";
import Phone from "@/utils/entities/Phone";
import { User } from "@/utils/entities/Users";
import { Roles } from "@/utils/types";
import { OnChangeMouse } from "@/utils/types/clicks";
import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCustomOutletContext } from "../users";
import FormUser from "./user";

type Initial = {
    [key: string]: boolean
}

const initialState = Configs.roles.reduce((acc, curr) => {
    acc[curr] = false;
    return acc;
}, {} as Initial);


type FormUserContextType = {
    setUser: React.Dispatch<React.SetStateAction<User | undefined>>
    user?: User
}

export const ControlCheckBox = createContext({ inputs: initialState, fields: [] as CheckBoxType[], title: "" });

export const FormUserContext = createContext({} as FormUserContextType)

export default function Form() {
    const { postRequestUsers } = useCustomOutletContext()
    const navigate = useNavigate();
    const [inputs, setInputs] = useState(initialState)
    const [user, setUser] = useState<User>()
    const [error, setError] = useState(false);

    const handleClick: OnChangeMouse = (e) => {
        const { name } = e.currentTarget

        if (inputs[name]) {
            setInputs({ ...inputs, [name]: false })
        } else {
            setInputs({ ...initialState, [name]: true })
        }
    }

    const fields: CheckBoxType[] = Configs.roles.map((role) => ({
        controller: handleClick,
        inputData: { name: role },
    }))

    const getRole = () => {
        const role = Object.entries(inputs).find(([key, value]) => value === true);

        return (role ? role[0] : 'user') as Roles;
    }


    const handleSubmit = () => {
        try {
            if(!user) throw new FieldException('User is not defined', '')
            user.setRole(getRole())
            postRequestUsers(user.getValues)
        } catch (error) {
            setError(true)
            console.log(error)
        }
    }

    const handleClickCancel = () => {
        if (window.confirm('Are you sure you want to cancel?')) {
            navigate('/users')
        }
    }
    return (
        <form className="form grid grid-form">
            <FormUserContext.Provider value={{ setUser, user }} >
                <FormUser />
            </FormUserContext.Provider>
            <ControlCheckBox.Provider value={{ inputs, fields, title: "Roles" }} >
                <CheckList />
            </ControlCheckBox.Provider>
            <button type='button' onClick={handleSubmit}>Send</button>
            <button type="button" onClick={handleClickCancel}>Cancel</button>
        </form>
    );
}