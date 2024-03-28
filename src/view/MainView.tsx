import Table from '@/components/Table';
import '../index.css';
import { useEffect, useState } from 'react';
import { ApiAllUsers } from '@/utils/types';
import useFetchUser from '@/utils/useFetchUser';
import SearchBar from '@/components/search';

export default function MainView() {
    const [data, setData] = useState<ApiAllUsers[]>([]);
    const { getAllUsers, getAllQuery } = useFetchUser();

    useEffect(() => {
        getAllUsers().then((data) => setData(data))
    }, [])

    const handleGetByName = (name: string) => {
        getAllQuery('users', `name=${name}`).then((data) => setData(data))
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
                <SearchBar title='Users' placeHolder='type a name or part to find all matches' search={handleGetByName}/>
                <section className="display flex align-center padding">
                    <div className="content flex align-center">
                        <Table data={data} />
                    </div>
                </section>
            </section>
        </div>
    )
}
