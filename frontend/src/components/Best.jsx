import React from 'react';
import { Grid, Card, CardMedia, CardContent, Box, Typography, Rating } from '@mui/material';

import useBest from '../hooks/useBest';

const Best = () => {
    const { bestMovie } = useBest();

    return (
        <Grid item xs={12} sx={{ display: 'flex', flexDirection: 'row' }}>
            <Card sx={{ display: 'flex', width: '100%' }}>
                <CardMedia
                    xs={1}
                    component="img"
                    height="200px"
                    sx={{ objectFit: 'contain', width: '200px', maxHeight: '100%' }}
                    image={bestMovie.poster}
                    alt={bestMovie.title}
                />
                <CardContent xs={1}>
                    <Box sx={{ display: 'flex ' }}>
                        <Typography gutterBottom variant="h5" component="div" marginRight={5}>
                            {bestMovie.title}
                        </Typography>
                        <Rating precision={0.1} value={Number(bestMovie.average)} readOnly />
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                        {bestMovie.plot}
                    </Typography>
                </CardContent>
            </Card>
        </Grid>
    );
};

export default Best;
