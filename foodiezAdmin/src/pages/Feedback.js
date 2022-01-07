import {
  Box,
  Card,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  Typography
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import DeleteIcon from '@mui/icons-material/Delete';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Rating from '@mui/material/Rating';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert'; // material
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Cookies from 'js-cookie';
import { useEffect, useState, useRef } from 'react';
import feedbackApi from '../api/feedbackApi';
import productApi from '../api/productApi';
import Page from '../components/Page';
import Scrollbar from '../components/Scrollbar';
import SearchNotFound from '../components/SearchNotFound';
import { UserListHead } from '../components/_dashboard/user';

import USERLIST from '../_mocks_/user';

Feedback.propTypes = {};

const useStyles = makeStyles({
  filter: {
    margin: '-76px 0 20px 670px'
  },
  tableBody: {},
  basicList: {
    position: 'relative',
    top: '-700px',
    width: '100px'
  }
});
const TABLE_HEAD = [
  {
    id: 'username',
    label: 'Username',
    alignRight: false
  },
  {
    id: 'comment',
    label: 'Comment',
    alignRight: false
  },
  {
    id: 'email',
    label: 'Rating',
    alignRight: false
  },
  {
    id: 'creatAt',
    label: 'Product Name',
    alignRight: false
  },
  {
    id: 'role',
    label: 'Published at',
    alignRight: false
  },
  {
    id: 'control',
    label: 'Action',
    align: true
  }
];
function Feedback(props) {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [userAction, setUserAction] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [feedbackAction, setFeedbackAction] = useState(false);
  const refIsDelete = useRef(false);
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - USERLIST.length) : 0;
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  const handleCloseSuccess = () => {
    setOpenSuccess(false);
  };

  const handleCloseFailed = () => {
    setOpenFailed(false);
  };

  const [openSuccess, setOpenSuccess] = useState(false);
  const [openFailed, setOpenFailed] = useState(false);
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = USERLIST.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }

    setSelected([]);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const [feedbackList, setFeedbackList] = useState([]);
  const [productReference, setProductReference] = useState([]);
  const token = Cookies.get('tokenUser');
  useEffect(() => {
    async function getAllFeedback() {
      const feedbackList = await feedbackApi.getAllFeedback(token);

      const result = await Promise.all(
        feedbackList.data.map((item) => productApi.getById(item.productID))
      );

      // eslint-disable-next-line prettier/prettier
      const productNames = result.map((item) => item.data).map((i) => ({ productName: i[0].name }));
      console.log(productNames);

      // eslint-disable-next-line arrow-body-style
      const final = feedbackList.data.map((item, i) => {
        return { ...item, ...productNames[i] };
      });
      console.log(final);
      setFeedbackList(final);
    }
    getAllFeedback();
  }, [feedbackAction]);
  const arrFilter = feedbackList.map((item) => item.productID);

  const filteredFeedback = feedbackList;
  const isUserNotFound = filteredFeedback.length === 0;
  const formatIsoStringToDate = (data) => {
    const date = new Date(data);
    const year = date.getFullYear();
    const time = date.toLocaleTimeString(
      ('en', { timeStyle: 'short', hour12: false, timeZone: 'UTC' })
    );
    let month = date.getMonth() + 1;
    let dt = date.getDate();

    if (dt < 10) {
      dt = `0${dt}`;
    }
    if (month < 10) {
      month = `0${month}`;
    }
    const object = { year, month, dt, time };
    return object;
  };
  const [idDel, setIdDel] = useState();
  const handleClickDelete = async (id) => {
    setOpenDialog(true);
    setIdDel(id);
  };
  const handleClickOK = async () => {
    setOpenDialog(false);

    await feedbackApi
      .deleteFeedbackById(token, idDel)
      .then((response) => {
        console.log('Delete success !');
        setOpenSuccess(true);
        setFeedbackAction(!feedbackAction);
      })
      .catch((error) => {
        if (error.response) {
          console.log('Delete failed!');
          setOpenFailed(true);
        }
      });
    refIsDelete.current = false;
    console.log('ok');
  };
  return (
    <>
      <Page title="Foody | Admin">
        <Container style={{ maxWidth: '1700px' }}>
          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
            <Box sx={{ pb: 5 }} style={{ padding: 0 }}>
              <Typography variant="h4" gutterBottom>
                Feedback
              </Typography>
              <div role="presentation">
                <Breadcrumbs aria-label="breadcrumb">
                  <Link underline="hover" color="inherit" href="/dashboard">
                    Home
                  </Link>
                  <Typography color="text.primary">Feedback</Typography>
                </Breadcrumbs>
              </div>
            </Box>
          </Stack>

          <Card>
            {/* <UserListToolbar
              numSelected={selected.length}
              filterName={filterName}
              onFilterName={handleFilterByName}
            /> */}

            <Scrollbar>
              <TableContainer
                sx={{
                  minWidth: 800
                }}
                className={classes.tableBody}
              >
                <Table>
                  <UserListHead
                    order={order}
                    orderBy={orderBy}
                    headLabel={TABLE_HEAD}
                    rowCount={USERLIST.length}
                    numSelected={selected.length}
                    onRequestSort={handleRequestSort}
                    onSelectAllClick={handleSelectAllClick}
                    style={{ backgroundColor: 'blue' }}
                  />
                  <TableBody>
                    {filteredFeedback
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((row) => {
                        const {
                          _id,
                          username,
                          comment,
                          published_at,
                          rating,
                          productID,
                          productName
                        } = row;
                        const date = formatIsoStringToDate(published_at);
                        const isItemSelected = selected.indexOf(_id) !== -1;
                        return (
                          <TableRow
                            hover
                            key={_id}
                            tabIndex={-1}
                            role="checkbox"
                            selected={isItemSelected}
                            aria-checked={isItemSelected}
                          >
                            {/* <TableCell padding="checkbox">
                              <Checkbox
                                checked={isItemSelected}
                                onChange={(event) => handleClick(event, name)}
                              />
                            </TableCell> */}

                            <TableCell align="left" style={{ width: '280px  ' }}>
                              <Typography variant="subtitle2" noWrap>
                                {username}
                              </Typography>
                            </TableCell>
                            <TableCell align="left" style={{ width: '280px  ' }}>
                              <Typography variant="subtitle2" noWrap>
                                {comment}
                              </Typography>
                            </TableCell>
                            <TableCell align="left" style={{ width: '280px  ' }}>
                              <Typography variant="subtitle2" noWrap>
                                {/* <Typography component="legend">Read only</Typography> */}
                                <Rating name="read-only" value={rating} readOnly />
                              </Typography>
                            </TableCell>
                            <TableCell align="left">
                              <Typography variant="subtitle2" noWrap>
                                {productName}
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <Typography variant="subtitle2">
                                {' '}
                                {`${date.dt}/${date.month}/${date.year} | ${date.time}`}
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <Button
                                variant="contained"
                                size="small"
                                startIcon={<DeleteIcon />}
                                color="error"
                                onClick={() => handleClickDelete(_id)}
                                style={{ marginBottom: '10px' }}
                              >
                                Delete
                              </Button>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    {emptyRows > 0 && (
                      <TableRow
                        style={{
                          height: 53 * emptyRows
                        }}
                      >
                        <TableCell colSpan={6} />
                      </TableRow>
                    )}
                  </TableBody>
                  {isUserNotFound && (
                    <TableBody>
                      <TableRow>
                        <TableCell
                          align="center"
                          colSpan={6}
                          sx={{
                            py: 3
                          }}
                        >
                          <SearchNotFound searchQuery={filterName} />
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  )}
                </Table>
              </TableContainer>
            </Scrollbar>

            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={filteredFeedback.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Card>
        </Container>
        {/* <BasicList /> */}
      </Page>
      <Snackbar open={openSuccess} autoHideDuration={6000} onClose={handleCloseSuccess}>
        <MuiAlert
          onClose={handleCloseSuccess}
          severity="success"
          sx={{
            width: '100%'
          }}
        >
          Great, Delete Successfully !
        </MuiAlert>
      </Snackbar>
      <Snackbar open={openFailed} autoHideDuration={6000} onClose={handleCloseFailed}>
        <MuiAlert
          onClose={handleCloseFailed}
          severity="error"
          sx={{
            width: '100%'
          }}
        >
          Something went wrong !
        </MuiAlert>
      </Snackbar>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Are you sure ?</DialogTitle>
        <DialogContent>
          <DialogContentText>This will delete comments .</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleClickOK}>OK</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default Feedback;
