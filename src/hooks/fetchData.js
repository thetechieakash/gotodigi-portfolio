import { useEffect, useState } from "react";
import axios from "axios";

export default function useFetch(
    url,
    dependencies = [],
    delay = 300
) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const controller = new AbortController();

        const fetchData = async () => {
            try {
                setLoading(true);
                setError(null);

                const { data } = await axios.get(url, {
                    signal: controller.signal,
                });

                setData(data);
            } catch (err) {
                if (
                    axios.isCancel(err) ||
                    err.code === "ERR_CANCELED"
                ) {
                    return;
                }

                console.error(err);
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        let timer;

        if (delay > 0) {
            timer = setTimeout(fetchData, delay);
        } else {
            fetchData();
        }

        return () => {
            clearTimeout(timer);
            controller.abort();
        };
    }, [url, delay, ...dependencies]);

    return {
        data,
        loading,
        error,
    };
}