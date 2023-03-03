import { useEffect, useState } from "react";

export default function useFetch(url) {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!url) return;

        (async function() {
            try {
                setLoading(true);
                const request = await fetch(url);
                const response = await request.json();
                setData(response);
            } catch(err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        })();
    }, [url]);
    return { data, error, loading }
}