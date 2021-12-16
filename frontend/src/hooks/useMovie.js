import { useState, useEffect } from 'react';

const useMovie = () => {
    const [refresh, setRefresh] = useState(false);
    const [input, setInput] = useState('');
    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState({});

    const getMovies = async () => {
        let requestOptions = {
            method: 'GET',
            redirect: 'follow',
        };

        const dataMovie = await fetch('/movies', requestOptions);
        const res = await dataMovie.text();
        const preResult = JSON.parse(res);

        const promesas = preResult.map(async (movie) => {
            const response = await fetch(`/movies/qualifications?movie_id=${movie.id}`, requestOptions);

            const result = await response.text();
            const { average, reviews } = JSON.parse(result);

            movie.average = average;
            movie.reviews = reviews;

            return movie;
        });

        const fullMovies = await Promise.all(promesas);
        setMovies(fullMovies);
    };

    const editMovie = async (type) => {
        let myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');

        let raw = JSON.stringify({
            id: selectedMovie.id,
            title: input,
        });

        let requestOptions = {
            method: 'POST',
            redirect: 'follow',
            headers: myHeaders,
            body: raw,
        };
        try {
            const { status } = await fetch(`/movies?type=${type}`, requestOptions);
            if (status === 201) {
                alert('success', 'Movie edited successfully');
                setRefresh(!refresh);
                return;
            }
            return alert('Error');
        } catch (error) {
            return console.error({ error: error.message });
        }
    };

    const deleteMovie = async () => {
        let myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');

        const raw = JSON.stringify({
            id: selectedMovie.id,
        });

        const requestOptions = {
            method: 'DELETE',
            redirect: 'follow',
            headers: myHeaders,
            body: raw,
        };

        try {
            await fetch('/movies', requestOptions);

            alert('Success', 'Movie deleted successfully');

            setSelectedMovie({});
            setRefresh(!refresh);

            return;
        } catch (error) {
            return console.error({ error: error.message });
        }
    };

    const selectMovie = (movie) => {
        setSelectedMovie(movie);
        setInput(movie.title);
    };

    const handleChange = (event) => {
        setInput(event.target.value);
    };

    useEffect(() => {
        getMovies();
    }, [refresh]);

    return { deleteMovie, editMovie, handleChange, setRefresh, selectMovie, selectedMovie, movies, refresh, input };
};

export default useMovie;
