import { useRef } from "react";

type PropType = {
    title: string;
    placeHolder?: string;
    search: (name: string) => Promise<void>
}


export default function SearchBar ({title, placeHolder, search}: PropType) {
    const inputValue = useRef('');
    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        inputValue.current = e.target.value
    }
    return (
        <section className='search flex align-center padding'>
            <h3>{title}</h3>
            <input type="text" placeholder={placeHolder} onChange={handleOnChange} />
            <button type='button' onClick={() => search(inputValue.current)}>Search</button>
            <button type='button'>View All Users</button>
        </section>
    )
}