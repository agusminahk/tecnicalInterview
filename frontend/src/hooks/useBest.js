import { useEffect, useState } from 'react';

const useBest = () => {
    const [bestMovie, setBestMovie] = useState({});

    const fetchData = async () => {
        const requestOptions = {
            method: 'GET',
            redirect: 'follow',
        };

        const res = await fetch('/movies/best', requestOptions);
        const result = await res.text();
        const movie = JSON.parse(result);

        setBestMovie(movie);
    };

    useEffect(() => {
        fetchData();
    }, []);

    return { bestMovie };
};

export default useBest;
