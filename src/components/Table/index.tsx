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

    const headers = () => {
        const titles = Object.keys(data[0] ? data[0] : '');
        return <Lines values={titles} isHead={true} />
    };

    const lines = () => {
        return data.map((user) => <Lines key={user.id} values={Object.values(user)} />)
    }

    const contentGenerator = () => {
        if (data.length > 0) {
            return (
                <section className="content table">
                    {headers()}
                    {lines()}
                </section>
            )
        }
        return <div className="not-found">User not found</div>
    }
    return (
        isLoading ? 'Loading' : contentGenerator()
    );
}