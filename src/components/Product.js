import { Button, Card, CardActions, CardContent, CardMedia, Grid, Typography } from '@mui/material'
import React from 'react'

const Product = ({id, thumbnail, title, brand, modal, itemsRows}) => {
    const md = 12 / itemsRows;
  return (
    <Grid item xs={12} sm={6} md={md}>
        <Card
            sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
        >
            <CardMedia
                component="img"
                height="140"
                image={thumbnail}
                alt={title}
            />
            <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="h2">
                    {title}
                </Typography>
                <Typography>
                    {brand}
                </Typography>
            </CardContent>
            <CardActions>
                <Button onClick={()=> modal(id)} size="small">View</Button>
            </CardActions>
        </Card>
    </Grid>
  )
}

export default Product