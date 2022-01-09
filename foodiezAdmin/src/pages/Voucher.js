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
import plusFill from '@iconify/icons-eva/plus-fill';
import { Icon } from '@iconify/react';
import DeleteIcon from '@mui/icons-material/Delete';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Rating from '@mui/material/Rating';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert'; // material
import Dialog from '@mui/material/Dialog';
import Modal from '@mui/material/Modal'; // components
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Cookies from 'js-cookie';
import { useEffect, useState, useRef } from 'react';
import voucherApi from '../api/voucherApi';
import Page from '../components/Page';
import Label from '../components/Label';
import Scrollbar from '../components/Scrollbar';
import SearchNotFound from '../components/SearchNotFound';
import { UserListHead } from '../components/_dashboard/user';
import VoucherAdd from '../components/_dashboard/voucher/VoucherAdd';

import USERLIST from '../_mocks_/user';

Voucher.propTypes = {};

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
    id: 'vouchercode',
    label: 'Voucher Code',
    alignRight: false
  },
  {
    id: 'vouchername',
    label: 'Voucher name',
    alignRight: false
  },
  {
    id: 'amount',
    label: 'Promotion Amount',
    alignRight: false
  },
  {
    id: 'apply',
    label: 'Apply for Order Value',
    alignRight: false
  },
  {
    id: 'role',
    label: 'Published at',
    alignRight: false
  },
  {
    id: 'desc',
    label: 'Description',
    alignRight: false
  },
  {
    id: 'act',
    label: 'Is Active',
    alignRight: false
  },
  {
    id: 'control',
    label: 'Action',
    align: true
  }
];
function Voucher(props) {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openDialog, setOpenDialog] = useState(false);
  const [openAddForm, setOpenAddForm] = useState(false);
  const [isvisible, SetVisible] = useState(false);
  const [voucherAction, setVoucherAction] = useState(false);
  const [notiSuccess, setNotiSuccess] = useState(false);
  const [notiFailed, setNotiFailed] = useState(false);
  const handleOpen = () => setOpenAddForm(true);

  const handleClose = () => setOpenAddForm(false);

  const handleCloseSuccessNoti = () => setNotiSuccess(false);
  const handleCloseFailedNoti = () => setNotiFailed(false);
  const toggle = () => {
    SetVisible(!isvisible);
  };
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

  const token = Cookies.get('tokenUser');
  const [vouchers, setVouchers] = useState([]);
  useEffect(() => {
    async function getAllVoucher() {
      const voucherList = await voucherApi.getAllVoucher(token);
      console.log(voucherList.data);
      setVouchers(voucherList.data);
    }
    getAllVoucher();
  }, [voucherAction]);

  const handleUpdateListVoucher = () => {
    setVoucherAction(!voucherAction);
  };
  const isUserNotFound = vouchers.length === 0;
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

    await voucherApi
      .delete(idDel, token)
      .then((response) => {
        console.log('Delete success !');
        setOpenSuccess(true);
        setVoucherAction(!voucherAction);
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
  const handleClickNotify = (des, promotionAmount, applyForOrderValue, code) => {
    const obj = {};
    obj.voucherDescription = des;
    obj.promotionAmount = promotionAmount;
    obj.applyForOrderValue = applyForOrderValue;
    obj.code = code;
    console.log(obj);
    voucherApi
      .notify(obj, token)
      .then((res) => {
        console.log('success!');
        setNotiSuccess(true);
      })
      .catch((err) => {
        if (err.response) {
          console.log('failed');
          setNotiFailed(true);
        }
      });
  };
  return (
    <>
      <Page title="Foody | Admin">
        <Container style={{ maxWidth: '1700px' }}>
          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
            <Box sx={{ pb: 5 }} style={{ padding: 0 }}>
              <Typography variant="h4" gutterBottom>
                Vouchers
              </Typography>
              <div role="presentation">
                <Breadcrumbs aria-label="breadcrumb">
                  <Link underline="hover" color="inherit" href="/voucher">
                    Home
                  </Link>
                  <Typography color="text.primary">Vouchers</Typography>
                </Breadcrumbs>
              </div>
            </Box>
            <Button variant="contained" startIcon={<Icon icon={plusFill} />} onClick={handleOpen}>
              Add Voucher
            </Button>
            <Modal
              title="Add form"
              open={openAddForm}
              onCancel={toggle}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <VoucherAdd handleUpdateListVoucher={handleUpdateListVoucher} />
            </Modal>
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
                    {vouchers
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((row) => {
                        const {
                          _id,
                          code,
                          applyForOrderValue,
                          promotionAmount,
                          description,
                          name,
                          isActive,
                          published_at
                        } = row;
                        const date = formatIsoStringToDate(published_at);
                        const isItemSelected = selected.indexOf(_id) !== -1;
                        const promote = promotionAmount
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
                        const apply = applyForOrderValue
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
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

                            <TableCell align="left">
                              <Typography
                                variant="subtitle2"
                                noWrap
                                style={{
                                  backgroundColor: 'rgb(135, 208, 104)',
                                  color: '#fff',
                                  borderColor: 'transparent',
                                  textAlign: 'center',
                                  borderRadius: '3px'
                                }}
                              >
                                {code}
                              </Typography>
                            </TableCell>
                            <TableCell align="left">
                              <Typography variant="subtitle2" noWrap>
                                {name}
                              </Typography>
                            </TableCell>
                            <TableCell align="left">
                              <Typography variant="subtitle2" noWrap>
                                {promote}
                                <span style={{ color: 'orange' }}> VND</span>
                              </Typography>
                            </TableCell>
                            <TableCell align="left">
                              <Typography variant="subtitle2" noWrap>
                                {apply}
                                <span style={{ color: 'orange' }}> VND</span>
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <Typography variant="subtitle2" style={{ color: '#00AB55' }}>
                                {' '}
                                {`${date.dt}/${date.month}/${date.year} | ${date.time}`}
                              </Typography>
                            </TableCell>
                            <TableCell align="left">
                              <Typography variant="subtitle2" noWrap>
                                {description}
                              </Typography>
                            </TableCell>
                            <TableCell align="left">
                              <Typography variant="subtitle2" noWrap>
                                {isActive === true ? (
                                  <Label variant="ghost" color="success">
                                    True
                                  </Label>
                                ) : (
                                  <Label variant="ghost" color="error">
                                    False
                                  </Label>
                                )}
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
                              <Button
                                variant="contained"
                                size="small"
                                startIcon={<NotificationsActiveIcon />}
                                color="warning"
                                onClick={() =>
                                  handleClickNotify(
                                    description,
                                    promotionAmount,
                                    applyForOrderValue,
                                    code
                                  )
                                }
                                style={{ marginBottom: '10px', marginLeft: '5px' }}
                              >
                                Notify
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
              count={vouchers.length}
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
      <Snackbar open={notiSuccess} autoHideDuration={6000} onClose={handleCloseSuccessNoti}>
        <MuiAlert
          onClose={handleCloseSuccessNoti}
          severity="success"
          sx={{
            width: '100%'
          }}
        >
          Notify Voucher for All User !
        </MuiAlert>
      </Snackbar>
      <Snackbar open={notiFailed} autoHideDuration={6000} onClose={handleCloseFailedNoti}>
        <MuiAlert
          onClose={handleCloseFailedNoti}
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
          <DialogContentText>This will delete voucher .</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleClickOK}>OK</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default Voucher;
