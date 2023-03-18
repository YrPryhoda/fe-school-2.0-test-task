import {useEffect, useState} from 'react';

export const useFetch = <T, >(fetchFunction: (args?: any) => Promise<any>) => {
    const [data, setData] = useState<null | T>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<null | string>(null);

    useEffect(() => {
        setLoading(true);
        (async () => {
            const data = await fetchFunction();
            if (data.error) {
                setError(data.error);
                return setLoading(false);
            }

            setData(data.data);
            setLoading(false);
        })();
    }, []);

    return {
        loading,
        error,
        data
    };
};
