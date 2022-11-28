import * as React from 'react'
import {
  Grid,
  Box,
  Typography,
  Container,
  Pagination,
  Modal,
  ImageListItem,
  ImageList,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress
} from '@mui/material'
import { useEffect, useState } from 'react'
import { getProducts } from 'services/Products'
import Product from 'components/Product'
import Hero from 'components/Hero'
import Theme from 'components/Theme'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  minWidth: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 2
}

const ProductsList = () => {
  const [products, setProducts] = useState([])
  const [productsPerPage, setProductsPerPage] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [maxPage, setMaxPage] = useState()
  const [perPage] = useState(10)
  const [open, setOpen] = useState(false)
  const [imgModal, setimgModal] = useState([])
  const [itemsPerRows, setItemsPerRows] = useState(4)
  const [loading, setLoading] = useState(true)

  const handleChangeItemPerRows = (event) => {
    setItemsPerRows(event.target.value)
  }

  const handleOpenModal = (id) => {
    const product = productsPerPage.find((product) => product.id === id)
    setimgModal(product.images)
    setOpen(true)
  }
  const handleCloseModal = () => setOpen(false)

  useEffect(() => {
    ;(async () => {
      const product = await getProducts()
      const count = Math.ceil(product.data.products.length / perPage)
      setMaxPage(count)
      setProducts(product.data.products)
      setLoading(false)
    })()
  }, [perPage])

  useEffect(() => {
    if (currentPage === 1) {
      const listProducts = products.slice(0, perPage)
      setProductsPerPage(listProducts)
    } else {
      const listProducts = products.slice(
        (currentPage - 1) * perPage,
        currentPage * perPage
      )
      setProductsPerPage(listProducts)
    }
  }, [currentPage, products, itemsPerRows])

  const handleChangePagination = (e, pag) => {
    setCurrentPage(pag)
  }

  return (
    <Theme>
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
                <img src={image} srcSet={image} alt="images" loading="lazy" />
              </ImageListItem>
            ))}
          </ImageList>
        </Box>
      </Modal>
      <main>
        <Hero />
        <Box
          sx={{
            minWidth: 120,
            display: { xs: 'none', sm: 'none', md: 'block' }
          }}
        >
          <Container sx={{ pt: 2 }} maxWidth="md">
            <Typography
              variant="p"
              align="center"
              color="text.secondary"
              paragraph
            >
              Select how many items per row you want to display
            </Typography>
            <FormControl fullWidth>
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
          {loading && (
            <Box display="flex" justifyContent="center" alignItems="center">
              <CircularProgress />
            </Box>
          )}
          <Grid container spacing={2}>
            {productsPerPage.map((product) => (
              <Product
                key={'product-' + product.id}
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
        {productsPerPage.length > 0 && (
          <Container maxWidth="md">
            <Box display="flex" justifyContent="center" alignItems="center">
              <Pagination
                count={maxPage}
                page={currentPage}
                onChange={handleChangePagination}
                variant="outlined"
                shape="rounded"
              />
            </Box>
          </Container>
        )}
      </main>
    </Theme>
  )
}

export default ProductsList
