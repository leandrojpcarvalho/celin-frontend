import { ApiAllUsers, EndPoints, IUser, IUserCreation } from "@/utils/types";
import useFetchUser from "@/utils/useFetchUser";
import { useState, useEffect } from "react";
import { Outlet, useOutletContext } from "react-router-dom";


type ContextOutlet = {
    data: ApiAllUsers[];
    showedData: ApiAllUsers[];
    postRequestUsers: (data: IUserCreation) => Promise<IUser>;
    handleFilterByName: (name: string) => void;
    getAllQuery: (endPoints: EndPoints, query: string) => Promise<any>;
    handleRemoveFilter: () => void;
    handleFilterByRole: (role: string) => void;
}

export default function Users() {
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

    const handleRemoveFilter = () => {
        setShowedData(data);
    }

    const handleFilterByRole = (role: string) => {
        setShowedData(data.filter((user) => user.role === role))
    }
    return (
        <div className="flex column align-center">
            <h3>Users</h3>
            <div>
                <Outlet context={{ data, postRequestUsers, showedData, handleFilterByName, getAllQuery, handleRemoveFilter, handleFilterByRole } satisfies ContextOutlet} />
            </div>
        </div>
    )
}

export function useCustomOutletContext() {
    return useOutletContext<ContextOutlet>()
}