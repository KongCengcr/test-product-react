import { Box, Container, Typography } from '@mui/material'
import React from 'react'

function Hero() {
  return (
    <Box
        sx={{
        bgcolor: 'background.paper',
        pt: 8,
        pb: 6,
        }}
    >
      <Container maxWidth="sm">
        <Typography
            component="h1"
            variant="h2"
            align="center"
            color="text.primary"
            gutterBottom
        >
            Products
        </Typography>
        <Typography variant="h5" align="center" color="text.secondary" paragraph>
           Search your products and take it!
        </Typography>
      </Container>
    </Box>
  )
}

export default Hero