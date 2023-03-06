import React, { useEffect, useState } from 'react'
import Theme from 'components/Theme'
import { getUsers } from 'services/Users'
import { Box, Container } from '@mui/system'
import { CircularProgress, Pagination, Typography } from '@mui/material'
import BaseTable, { Column, AutoResizer } from 'react-base-table'
import 'react-base-table/styles.css'
import { mergePDF } from 'services/Products'

const Users = () => {
  const [usersList, setUsersList] = useState([])
  const [usersListPerPage, setUsersListPerPage] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [maxPage, setMaxPage] = useState()
  const [perPage] = useState(10)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    ;(async () => {
      const users = await getUsers()
      const merge = await mergePDF()
      const count = Math.ceil(users.data.users.length / perPage)
      setMaxPage(count)
      setUsersList(users.data.users)
      setLoading(false)
    })()
  }, [perPage])

  useEffect(() => {
    if (currentPage === 1) {
      const listProducts = usersList.slice(0, perPage)
      setUsersListPerPage(listProducts)
    } else {
      const listProducts = usersList.slice(
        (currentPage - 1) * perPage,
        currentPage * perPage
      )
      setUsersListPerPage(listProducts)
    }
  }, [currentPage, usersList])

  const handleChangePagination = (e, pag) => {
    setCurrentPage(pag)
  }

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
            List Users
          </Typography>
        </Box>
        {loading && (
          <Box display="flex" justifyContent="center" alignItems="center">
            <CircularProgress />
          </Box>
        )}

        {usersListPerPage.length > 0 && (
          <>
            <Box display="flex" justifyContent="center" alignItems="center">
              <div style={{ width: '50vw', height: '70vh' }}>
                <AutoResizer>
                  {({ width, height }) => (
                    <BaseTable
                      data={usersListPerPage}
                      width={width}
                      height={height}
                      fixed
                    >
                      <Column
                        key="firstName"
                        dataKey="firstName"
                        title="firstName"
                        width={130}
                      />
                      <Column
                        key="lastName"
                        dataKey="lastName"
                        title="lastName"
                        width={130}
                      />
                      <Column key="age" dataKey="age" title="age" width={120} />
                      <Column
                        key="username"
                        dataKey="username"
                        title="username"
                        width={120}
                      />
                      <Column key="ip" dataKey="ip" title="ip" width={120} />
                    </BaseTable>
                  )}
                </AutoResizer>
              </div>
            </Box>
            <Container sx={{ pt: 4 }} maxWidth="md">
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
          </>
        )}
      </Container>
    </Theme>
  )
}

export default Users
