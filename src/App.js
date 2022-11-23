import * as React from 'react';
import {
  AppBar, 
  Button, 
  CssBaseline, 
  Grid, 
  Stack, 
  Box, 
  Toolbar, 
  Typography, 
  Container, 
  Pagination,
  Modal,
  ImageListItem,
  ImageList,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import CycloneIcon from '@mui/icons-material/Cyclone';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useEffect } from 'react';
import { getProducts } from './services/Products';
import { useState } from 'react';
import Product from './components/Product';
import Hero from './components/Hero';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  minWidth: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 2,
};

const theme = createTheme();

 const App = () => {

  const [products, setProducts] = useState([]);
  const [productsPerPage, setProductsPerPage] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [maxPage, setMaxPage] = useState();
  const [perPage, setPerPage] = useState(9);
  const [open, setOpen] = useState(false);
  const [imgModal, setimgModal] = useState([])
  const [itemsPerRows, setItemsPerRows] = useState(3);

  const handleChangeItemPerRows = (event) => {
    setItemsPerRows(event.target.value);
  };

  const handleOpenModal = (id) => {
    const product = productsPerPage.find(product => product.id === id);
    setimgModal(product.images)
    setOpen(true)
  };
  const handleCloseModal = () => setOpen(false);

  useEffect(() => {
    (async () => {
      const product = await getProducts();
      const count = Math.ceil(product.data.products.length / perPage);
      setMaxPage(count);
      setProducts(product.data.products);
  })();
  },[perPage])

  useEffect(() => {
    if(currentPage === 1){
      const listProducts = products.slice(0, perPage);
      setProductsPerPage(listProducts)
    }else{
      const listProducts = products.slice((currentPage - 1) * perPage, (currentPage * perPage));
      setProductsPerPage(listProducts)
    } 

  },[currentPage, products, itemsPerRows])

    const handleChangePagination = (e, pag) => {
      setCurrentPage(pag)
    };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Modal
        open={open}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <ImageList sx={{ width: 500, height: 450 }} cols={3} rowHeight={164}>
          {imgModal.map((image) => (
            <ImageListItem key={image}>
              <img
                src={image}
                srcSet={image}
                alt='images'
                loading="lazy"
              />
            </ImageListItem>
          ))}
        </ImageList>
        </Box>
      </Modal>
      <AppBar position="relative">
        <Toolbar>
          <CycloneIcon sx={{ mr: 2 }} />
          <Typography variant="h6" color="inherit" noWrap>
            App Products
          </Typography>
        </Toolbar>
      </AppBar>
      <main>
        <Hero />

        <Box sx={{ minWidth: 120,  display: { xs: 'none', sm: 'none', md: 'block' } }} >
          <Container sx={{ py: 8 }} maxWidth="md">
            <Typography variant="p" align="center" color="text.secondary" paragraph>
              Select how many items per row you want to display
            </Typography>
            <FormControl  fullWidth>
              <InputLabel id="itemsPerRows">Items per rows</InputLabel>
              <Select
                labelId="itemsPerRows"
                id="itemsPerRows"
                value={itemsPerRows}
                label="itemsPerRows"
                onChange={handleChangeItemPerRows}
              >
                <MenuItem value={3}>3</MenuItem>
                <MenuItem value={4}>4</MenuItem>
                <MenuItem value={5}>5</MenuItem>
                <MenuItem value={6}>6</MenuItem>
              </Select>
            </FormControl>
          </Container>
        </Box>
        <Container sx={{ py: 8 }} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={2}>
            {productsPerPage.map((product) => (
              <Product 
                key={'product-'+product.id} 
                id={product.id} 
                thumbnail={product.thumbnail} 
                title={product.title} 
                brand={product.brand}
                modal={handleOpenModal}
                itemsRows={itemsPerRows}
                />
            ))}
          </Grid>
        </Container>
        <Container maxWidth="md">
          <Grid container spacing={6}>
            <Pagination 
              count={maxPage} 
              page={currentPage} 
              onChange={handleChangePagination} 
              variant="outlined"
              itemsrows={itemsPerRows} 
              shape="rounded" 
            />
          </Grid>
        </Container>
      </main>
      {/* Footer */}
      <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
        <Typography variant="h6" align="center" gutterBottom>
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
      {/* End footer */}
    </ThemeProvider>
  );
}

export default App;