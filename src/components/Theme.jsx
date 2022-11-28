import React from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { CssBaseline } from '@mui/material'
import Footer from 'components/Footer'
import Navbar from 'components/Navbar'

const theme = createTheme()
const Theme = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Navbar />
      {children}
      {/* Footer */}
      <Footer />
      {/* End footer */}
    </ThemeProvider>
  )
}

export default Theme
