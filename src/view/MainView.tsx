import '../index.css';
import { createContext, useEffect, useState } from 'react';
import { ApiAllUsers, IUser, IUserCreation } from '@/utils/types';
import useFetchUser from '@/utils/useFetchUser';
import SearchBar from '@/components/search';
import FormUser from './form';
import { Link, Outlet, RouterProvider } from 'react-router-dom';
import router from '@/router';

type FunctionContext = {
    fetch: {
        postRequestUsers: (data: IUserCreation) => Promise<IUser>
    }
}

export const Funcitons = createContext<FunctionContext>({} as FunctionContext)

export default function MainView() {
    const [data, setData] = useState<ApiAllUsers[]>([]);
    const [showedData, setShowedData] = useState<ApiAllUsers[]>([])
    const { getAllUsers, getAllQuery, postRequestUsers } = useFetchUser();

    useEffect(() => {
        getAllUsers().then((data) => {
            setData(data);
            setShowedData(data);
        })
    }, [])

    const handleFilterByName = (name: string) => {
        if (name !== '') {
            setShowedData(data
                .filter((user) => user.name.toLowerCase().includes(name.toLowerCase())));
        } else {
            setShowedData(data);
        }
    }
    return (
        <div className="grid grid-template">
            <div className='brand padding'>
                <h3>Celin</h3>
            </div>

            <section className='search flex align-center padding'>
                <div className="flex align-center">
                    <SearchBar title='Users' placeHolder='type a name or part to find all matches' search={handleFilterByName} />
                </div>
            </section>
            <nav className='nav column flex padding'>
                <Link to={'/'}>Home</Link>
                <Link to={'/users'}>Users</Link>
            </nav>
            <Funcitons.Provider value={{ fetch: { postRequestUsers } }}>
                <section className="display flex align-center padding">
                    <div className="flex align-center">
                        <Outlet />
                    </div>
                </section>
            </Funcitons.Provider>

            <section className='footer'> footer </section>
        </div>
    )
}
