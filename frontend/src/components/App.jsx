import React from 'react';
import { styled } from '@mui/material/styles';
import {
    Paper,
    Button,
    TextField,
    Typography,
    Chip,
    Box,
    Grid,
    IconButton,
    Rating,
    CardMedia,
    CardContent,
    CardActions,
    Card,
} from '@mui/material';
import StarsIcon from '@mui/icons-material/Star';
import EditIcon from '@mui/icons-material/Edit';

import Best from './Best';
import useMovie from '../hooks/useMovie';
import { scroll } from '../utils/scroll';
import './App.css';

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'start',
    color: theme.palette.text.secondary,
}));

function App() {
    const { deleteMovie, editMovie, handleChange, setRefresh, selectMovie, selectedMovie, movies, refresh, input } =
        useMovie();
    return (
        <div className="App" style={{ padding: 15 }}>
            <Grid container spacing={2}>
                <Best />
                <Grid item xs={12} sm={9}>
                    <Item>
                        <Typography
                            color="primary"
                            variant="h5"
                            style={{ textAlign: 'center' }}
                            gutterBottom
                            component="div"
                        >
                            Movies
                        </Typography>
                        <Grid
                            item
                            xs={12}
                            sm={11}
                            sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignContent: 'center',
                            }}
                            margin="10px 0px"
                        >
                            <Grid item xs={5} sm={7}>
                                <Typography
                                    variant="h6"
                                    style={{ textAlign: 'center' }}
                                    gutterBottom
                                    component="div"
                                    fontWeight={500}
                                >
                                    Title
                                </Typography>
                            </Grid>
                            <Grid item xs={5} sm={4}>
                                <Typography
                                    variant="h6"
                                    style={{ textAlign: 'center' }}
                                    gutterBottom
                                    component="div"
                                    fontWeight={500}
                                >
                                    Year
                                </Typography>
                            </Grid>
                            <Grid item xs={5} sm={2}>
                                <Typography
                                    variant="h6"
                                    style={{ textAlign: 'center' }}
                                    gutterBottom
                                    component="div"
                                    fontWeight={500}
                                >
                                    Rating
                                </Typography>
                            </Grid>
                            <Grid item xs={2} sm={2}>
                                <Typography
                                    variant="h6"
                                    style={{ textAlign: 'center' }}
                                    gutterBottom
                                    component="div"
                                    fontWeight={500}
                                    onClick={() => scroll(100000)}
                                >
                                    Edit
                                </Typography>
                            </Grid>
                        </Grid>

                        {movies.length > 0 ? (
                            movies.map((a, b) => {
                                return (
                                    <Grid key={b} container spacing={2}>
                                        <Grid item xs={5} sm={5}>
                                            <Typography
                                                variant="h6"
                                                style={{ textAlign: 'center' }}
                                                gutterBottom
                                                component="div"
                                                fontWeight={600}
                                            >
                                                {a.title}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={2} sm={3}>
                                            <Typography
                                                variant="h6"
                                                style={{ textAlign: 'center' }}
                                                gutterBottom
                                                component="div"
                                            >
                                                {(a?.year.length > 5 && a.year) || a.year.substring(0, 4)}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={1} sm={2}>
                                            <Rating precision={0.1} value={a.average} readOnly />
                                        </Grid>
                                        <Grid item xs={1} sm={1}>
                                            <IconButton
                                                onClick={() => {
                                                    selectMovie(a);
                                                }}
                                                color="primary"
                                                aria-label="upload picture"
                                                component="span"
                                            >
                                                <EditIcon />
                                            </IconButton>
                                        </Grid>
                                    </Grid>
                                );
                            })
                        ) : (
                            <Typography variant="h6" style={{ textAlign: 'center' }} gutterBottom component="div">
                                No movies yet
                            </Typography>
                        )}
                    </Item>
                </Grid>
                <Grid item xs={3}>
                    {selectedMovie.id ? (
                        <Card>
                            <CardMedia component="img" image={selectedMovie.poster} alt={selectedMovie.title} />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    {input || selectedMovie.title}
                                </Typography>
                                <TextField
                                    id="standard-basic"
                                    label="New title"
                                    variant="standard"
                                    value={input}
                                    onChange={handleChange}
                                />

                                <Typography variant="body2" color="text.secondary">
                                    {selectedMovie.plot}
                                </Typography>
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-evenly' }}>
                                    {selectedMovie.reviews.map(({ qualification }, idx) => (
                                        <Box
                                            key={idx}
                                            sx={{ display: 'flex', width: '90px', justifyContent: 'space-between' }}
                                        >
                                            <Chip
                                                icon={
                                                    <StarsIcon
                                                        sx={{ backgroundColor: '#ffb420', borderRadius: '100%' }}
                                                    />
                                                }
                                                label={`${qualification} stars`}
                                                sx={{ backgroundColor: '#fff', fontWeight: '600', flexGrow: '1' }}
                                            />
                                        </Box>
                                    ))}
                                </Box>
                            </CardContent>
                            <CardActions sx={{ display: 'flex', justifyContent: 'space-around' }}>
                                <Button
                                    size="small"
                                    onClick={() => {
                                        deleteMovie();
                                        scroll(0);
                                    }}
                                >
                                    Delete movie
                                </Button>
                                <Button
                                    size="small"
                                    onClick={() => {
                                        editMovie('title');
                                        scroll(0);
                                    }}
                                >
                                    Save title
                                </Button>
                            </CardActions>
                        </Card>
                    ) : (
                        <Item>
                            <Typography
                                variant="h6"
                                style={{ color: '#a2a2a2', textAlign: 'center' }}
                                gutterBottom
                                component="div"
                            >
                                Select a movie to see its detail
                            </Typography>
                        </Item>
                    )}
                </Grid>
            </Grid>
        </div>
    );
}

export default App;
