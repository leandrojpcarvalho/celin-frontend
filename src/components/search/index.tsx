import { useEffect, useState } from "react";

type PropType = {
    title?: string;
    placeHolder?: string;
    search: (name: string) => void
    button?: {
        title: string;
        onClick: () => void;
    }
}


export default function SearchBar({ title, placeHolder, search, button }: PropType) {
    const [inputValue, setInputValue] = useState('');

    useEffect(() => {
        search(inputValue)
    }, [inputValue])

    const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const name = event.target.value;
        setInputValue(name);
    }

    const handleSetInput = () => {
        button?.onClick();
        setInputValue('');
    }

    return (
        <div>
            <h3>{title}</h3>
            <input type="text" placeholder={placeHolder} onChange={handleOnChange} value={inputValue} />
            {button && <button type='button' onClick={handleSetInput}>{button.title}</button>}
        </div>
    )
}