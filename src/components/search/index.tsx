import { useEffect, useState } from "react";

type PropType = {
    title: string;
    placeHolder?: string;
    search: (name: string) => void
}


export default function SearchBar({ title, placeHolder, search }: PropType) {
    const [inputValue, setInputValue] = useState('');

    useEffect(() => {
        search(inputValue)
    }, [inputValue])

    const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const name = event.target.value;
        setInputValue(name);
    }

    const handleSetInput = () => {
        setInputValue('');
    }

    return (
        <>
            <h3>{title}</h3>
            <input type="text" placeholder={placeHolder} onChange={handleOnChange} value={inputValue} />
            <button type='button' onClick={handleSetInput}>View All Users</button>
        </>
    )
}