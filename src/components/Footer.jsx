import { Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'

const Footer = () => {
  return (
    <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
      <Typography
        variant="h6"
        align="center"
        color="text.secondary"
        gutterBottom
      >
        APP Producs
      </Typography>
      <Typography
        variant="subtitle1"
        align="center"
        color="text.secondary"
        component="p"
      >
        Your dream become true!
      </Typography>
    </Box>
  )
}

export default Footer
