import Table from '@/components/Table';
import '../index.css';
import { useEffect, useState } from 'react';
import { ApiAllUsers } from '@/utils/types';
import useFetchUser from '@/utils/useFetchUser';
import SearchBar from '@/components/search';

export default function MainView() {
    const [data, setData] = useState<ApiAllUsers[]>([]);
    const [showedData, setShowedData] = useState<ApiAllUsers[]>([])
    const { getAllUsers, getAllQuery } = useFetchUser();

    useEffect(() => {
        getAllUsers().then((data) => {
            setData(data);
            setShowedData(data);
        })
    }, [])

    const handleFilterByName = (name: string) => {
        if(name !==''){
            setShowedData(data
                .filter((user) => user.name.toLowerCase().includes(name.toLowerCase())));
        } else {
            setShowedData(data);
        }
    }
    return (
        <div className="container flex">
            <section className="left grid align-center">
                <div className='brand padding'>
                    <h3>Celin</h3>
                </div>
                <nav className='menu flex padding'>
                    <p>Home</p>
                    <p>Users</p>
                </nav>
            </section>

            <section className="rigth grid align-center">
                <SearchBar title='Users' placeHolder='type a name or part to find all matches' search={handleFilterByName} />
                <section className="display flex align-center padding">
                    <div className="flex align-center">
                        <Table data={showedData} />
                    </div>
                </section>
            </section>
        </div>
    )
}
