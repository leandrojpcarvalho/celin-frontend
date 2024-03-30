import TextInput from "@/components/TextInput";
import Utils from "@/utils";
import FieldException from "@/utils/entities/exceptions/FieldsExceptions";
import { useContext, useEffect, useState } from "react";
import { FormUserContext } from "..";
import { OnChangeMouse } from "@/utils/types/clicks";
import { User } from "@/utils/entities/Users";
import Address from "@/utils/entities/Address";
import Phone from "@/utils/entities/Phone";

export default function FormUser() {
    const  { user ,setUser } = useContext(FormUserContext);
    const [name, setName] = useState(user?.name || '')
    const [email, setEmail] = useState(user?.email || '');
    const [zipCode, setZipCode] = useState(user?.address?.zipCode ||'');
    const [tel, setTel] = useState(user?.phones? user.phones[0].getPhone : '');
    const [address, setAddress] = useState(user?.address?.address || '');
    const [city, setCity] = useState(user?.address?.city || '')
    const [state, setstate] = useState(user?.address?.state || '');
    const [complement, setComplement] = useState(user?.address?.complement || '');
    const [number, setNumber] = useState(user?.address?.number || '');
    const [validUser, setValidUser] = useState(false);
    const [isError, setIsError] = useState(false);
    const [error, setError] = useState<FieldException>();
    
    useEffect(() => {
        console.log(validUser);
        if(validUser) {
            const add = new Address({zipCode, address, city, state}, complement, number);
            const phones = new Phone(tel);

            setUser(new User(name, email, phones, add, 'user'))
        }
    }, [validUser]);

    const fetchAddress = async () => {
        try {
            if (zipCode.length !== 8) throw new FieldException('CEP deve conter 8 digitos', 'zipCode')
            Utils.getAddressByCep(zipCode)
                .then((response) => {
                    const { address, city, state } = response
                    setAddress(address)
                    setCity(city)
                    setstate(state)
                })
                .catch((error) => {
                   handleError(error)
                })
        } catch (error) {
            if (error instanceof FieldException){
                handleError(error);
            } else{
                console.log(error);
            }
        }

    }

    const handleError = (error: FieldException) => {
        setError(error);
        setIsError(true)
        setTimeout(() => {
            setIsError(false)
        }, 8000);
    }

    const handleOnchange: OnChangeMouse = (e) => {
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

    const findemptyFields = () => {
        const fields = {
            name, email, tel, zipCode, address, city, state
        };
        const emptyFields = Object.entries(fields).reduce((acc, [key, value]) => {
            if (value === '') {
                acc.push(key);
            }  
            return acc;
        }
        , [] as string[]);
        return emptyFields;
    }

    const validateUser = () => {
        const emptyFields = findemptyFields();
        if(emptyFields.length === 0){
            setValidUser(true);
            setError(undefined);
        } else {
            setValidUser(false);
            handleError(new FieldException(`Os campos ${emptyFields.join(', ')} são obrigatórios`, emptyFields))
        }
    }
    const addressComponent = () => {
        return (
            <>
                <div className="zip flex">
                    <TextInput state={zipCode} controller={handleOnchange} inputType="text" onBlur={fetchAddress} inputData={{ name: 'zipCode' }} error={error} />
                    <TextInput state={address} controller={handleOnchange} inputType="text" inputData={{ name: 'address' }} error={error} />
                </div>
                <div className="address flex">
                    <TextInput state={city} controller={handleOnchange} inputType="text" inputData={{ name: 'city' }} error={error} />
                    <TextInput state={state} controller={handleOnchange} inputType="text" inputData={{ name: 'state' }} error={error} />
                </div>
                <div className="complement flex">
                    <TextInput state={complement} controller={handleOnchange} inputType="text" inputData={{ name: 'complement' }} error={error} />
                    <TextInput state={number} controller={handleOnchange} inputType="text" inputData={{ name: 'number' }} error={error} onBlur={() => validateUser()}/>
                </div>
                {isError && <p>{error?.message}</p>}
            </>
        )
    }

    return (
        <>
            <section className="data flex">
                <TextInput state={name} controller={handleOnchange} inputType='text' inputData={{ name: 'name' }} error={error}/>
                <TextInput state={email} controller={handleOnchange} inputType='email' inputData={{ name: 'email' }} error={error}/>
                <TextInput state={tel} controller={handleOnchange} inputType='tel' inputData={{ name: 'tel' }} error={error}/>
            </section>
            <section className="grid grid-address">
                {addressComponent()}
            </section>
        </>
    )
}