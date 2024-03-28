import { ApiAllUsers } from "@/utils/types";
import { useEffect, useState } from "react";
import Lines from "./lines";

type PropType = {
    data: ApiAllUsers[]
}

export default function Table({ data }: PropType) {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (data) {
            setIsLoading(false);
        }
    }, [data]);

    const headers = Object.keys(data[0] ? data[0] : '');


    const table = () => (
        <section className="table">
            <Lines values={headers} isHead={true} />
            {data.map((user) => <Lines key={user.id} values={Object.values(user)} />)}
        </section>
    )

    return (
        isLoading ? 'Loading' : table()
    );
}