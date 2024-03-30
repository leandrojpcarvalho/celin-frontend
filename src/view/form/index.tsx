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
import { createContext, useContext, useState } from "react";
import { Funcitons } from "../MainView";
import { useNavigate } from "react-router-dom";

type Initial = {
    [key: string]: boolean
}

const initialState = Configs.roles.reduce((acc, curr) => {
    acc[curr] = false;
    return acc;
}, {} as Initial);

export const ControlCheckBox = createContext({ inputs: initialState, fields: [] as CheckBoxType[], title: "" });

export default function FormUser() {
    const { fetch } = useContext(Funcitons)
    const navigate = useNavigate();
    const [inputs, setInputs] = useState(initialState)
    const [error, setError] = useState(false);
    const [name, setName] = useState('')
    const [email, setEmail] = useState('');
    const [zipCode, setZipCode] = useState('');
    const [tel, setTel] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('')
    const [state, setstate] = useState('');
    const [complement, setComplement] = useState('');
    const [number, setNumber] = useState('');
    const handleClick: OnChangeMouse = (e) => {
        const { name } = e.currentTarget

        if (inputs[name]) {
            setInputs({ ...inputs, [name]: false })
        } else {
            setInputs({ ...initialState, [name]: true })
        }
    }

    const fetchAddress = async () => {
        try {
            if (zipCode.length !== 8) throw new FieldException('CEP deve conter 8 digitos')
            Utils.getAddressByCep(zipCode)
                .then((response) => {
                    const { address, city, state } = response
                    setAddress(address)
                    setCity(city)
                    setstate(state)
                })
                .catch((error) => {
                    setError(true)
                    setTimeout(() => {
                        setError(false)
                    }, 3000);
                    alert('CEP não encontrado')
                })
        } catch (error) {
            setError(true)
            setTimeout(() => {
                setError(false)
            }, 3000);
            console.log(error)
        }

    }

    const fields: CheckBoxType[] = Configs.roles.map((role) => ({
        controller: handleClick,
        inputData: { name: role },
    }))

    const handleOnchage: OnChangeMouse = (e) => {
        const { value, name } = e.target;
        setState(name, value)
    }

    const setState = (name: string, value: string) => {
        switch (name) {
            case 'email':
                return setEmail(value);
            case 'zipCode':
                return setZipCode(value)
            case 'tel':
                return setTel(value);
            case 'address':
                return setAddress(value);
            case 'city':
                return setCity(value);
            case 'state':
                return setstate(value);
            case 'complement':
                return setComplement(value);
            case 'number':
                return setNumber(value);
            case 'name':
                return setName(value);
            default:
                break;
        }
    }

    const addressComponent = () => {
        return (
            <>
                <div className="zip flex">
                    <TextInput state={zipCode} controller={handleOnchage} inputType="text" onBlur={fetchAddress} inputData={{ name: 'zipCode' }} />
                    <TextInput state={address} controller={handleOnchage} inputType="text" inputData={{ name: 'address' }} />
                </div>
                <div className="address flex">
                    <TextInput state={city} controller={handleOnchage} inputType="text" inputData={{ name: 'city' }} />
                    <TextInput state={state} controller={handleOnchage} inputType="text" inputData={{ name: 'state' }} />
                </div>
                <div className="complement flex">
                    <TextInput state={complement} controller={handleOnchage} inputType="text" inputData={{ name: 'complement' }} />
                    <TextInput state={number} controller={handleOnchage} inputType="text" inputData={{ name: 'number' }} />
                </div>
            </>
        )
    }

    const getRole = () => {
        const role = Object.entries(inputs).find(([key, value]) => value === true);
        console.log(role);

        return (role ? role[0] : 'user') as Roles;
    }


    const handleSubmit = () => {
        try {
            const add = new Address({ address, city, state, zipCode }, complement, Number(number))
            const phone = new Phone(tel)
            const test = new User(name, email, phone, add, getRole());
            console.log(test.getValues);
            
            fetch.postRequestUsers(test.getValues)
        } catch (error) {
            setError(true)
            console.log(error)
        }
    }

    const handleClickCancel = () => {
        if(window.confirm('Are you sure you want to cancel?')){
            navigate('/users')  
        }}
    return (
        <form className="form grid grid-form">
            <section className="data flex">
                <TextInput state={name} controller={handleOnchage} inputType='text' inputData={{ name: 'name' }} />
                <TextInput state={email} controller={handleOnchage} inputType='email' inputData={{ name: 'email' }} />
                <TextInput state={tel} controller={handleOnchage} inputType='tel' inputData={{ name: 'tel' }} />
            </section>
            <section className="grid grid-address">
                {addressComponent()}
            </section>
            <ControlCheckBox.Provider value={{ inputs, fields, title: "Roles" }} >
                <CheckList />
            </ControlCheckBox.Provider>
            <button type='button' onClick={handleSubmit}>Send</button>
            <button type="button" onClick={handleClickCancel}>Cancel</button>
        </form>
    );
}