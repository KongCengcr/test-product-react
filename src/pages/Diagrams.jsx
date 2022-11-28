import { Box, Container, Typography } from '@mui/material'
import Flow from 'components/Flow'
import Theme from 'components/Theme'
import React from 'react'
import { ReactFlowProvider } from 'reactflow'

const Diagrams = () => {
  return (
    <Theme>
      <Container sx={{ py: 8 }} maxWidth="md">
        <Box sx={{ bgcolor: 'background.paper' }}>
          <Typography
            component="h3"
            variant="h3"
            align="center"
            color="text.secondary"
            gutterBottom
          >
            Diagrams Of APP
          </Typography>
        </Box>
        <ReactFlowProvider>
          <Flow />
        </ReactFlowProvider>
      </Container>
    </Theme>
  )
}

export default Diagrams
