import { Button, FormGroup, TextField, Typography, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import MuiAlert from '@mui/material/Alert';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Snackbar from '@mui/material/Snackbar';
import Stack from '@mui/material/Stack';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import voucherApi from '../../../api/voucherApi';

const initialValue = {
  name: '',
  username: '',
  email: '',
  phone: ''
};

const useStyles = makeStyles({
  container: {
    width: '40%',
    height: '100%',
    margin: '2% 30% 0 30%',
    '& > *': {
      marginTop: 20
    },
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '10px'
  },
  textField: {
    width: '400px',
    margin: '10px 0'
  }
});

const VoucherAdd = (props) => {
  const { handleUpdateListVoucher } = props;
  const [user, setUser] = useState(initialValue);
  const [loading, setLoading] = useState(false);
  const classes = useStyles();

  const onValueChange = (e) => {
    console.log(e.target.value);
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  // Notifications

  const [openSuccess, setOpenSuccess] = useState(false);

  const [openFailed, setOpenFailed] = useState(false);

  const handleCloseSuccess = () => {
    setOpenSuccess(false);
  };
  const handleCloseFailed = () => {
    setOpenFailed(false);
  };

  // handle form data
  const { register, handleSubmit } = useForm();
  const token = Cookies.get('tokenUser');
  const onSubmit = (item) => {
    item.isActive = loading;
    const data = JSON.stringify(item);
    console.log(data);
    voucherApi
      .createVoucher(data, token)
      .then((res) => {
        console.log('add success');
        setOpenSuccess(true);
        handleUpdateListVoucher();
      })
      .catch((error) => {
        if (error.response) {
          console.log('add failed!');
          setOpenSuccess(false);
        }
      });
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormGroup className={classes.container}>
          <Typography variant="h4">Create new voucher</Typography>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <FormControl>
                <TextField
                  {...register('name')}
                  id="standard-basic"
                  label="Voucher Name"
                  size="medium"
                  variant="outlined"
                  className={classes.textField}
                />
              </FormControl>
              <FormControl>
                <TextField
                  {...register('description')}
                  id="standard-basic"
                  label="Description"
                  variant="outlined"
                  className={classes.textField}
                />
              </FormControl>
              <FormControl>
                <TextField
                  {...register('promotionAmount')}
                  id="standard-basic"
                  label="Promotion Amount"
                  variant="outlined"
                  className={classes.textField}
                />
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl>
                <TextField
                  {...register('applyForOrderValue')}
                  id="standard-basic"
                  label="ApplyForOrderValue"
                  variant="outlined"
                  className={classes.textField}
                />
              </FormControl>
              <FormControl>
                <TextField
                  {...register('code')}
                  id="standard-basic"
                  label="Voucher Code"
                  variant="outlined"
                  className={classes.textField}
                />
              </FormControl>
              <FormControlLabel
                {...register('isActive')}
                sx={{
                  display: 'block'
                }}
                control={
                  <Switch
                    checked={loading}
                    onChange={() => setLoading(!loading)}
                    name="loading"
                    color="info"
                  />
                }
                label="Is Active"
                style={{ marginTop: '18px' }}
              />
              {/* Categories */}
            </Grid>
          </Grid>

          <FormControl>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              style={{ width: '100%', margin: '10px auto' }}
            >
              Submit
            </Button>
          </FormControl>
        </FormGroup>
      </form>
      <Stack spacing={2} sx={{ width: '100%' }}>
        <Snackbar open={openSuccess} autoHideDuration={6000} onClose={handleCloseSuccess}>
          <MuiAlert onClose={handleCloseSuccess} severity="success" sx={{ width: '100%' }}>
            Great, Successfully Added !
          </MuiAlert>
        </Snackbar>

        <Snackbar open={openFailed} autoHideDuration={6000} onClose={handleCloseFailed}>
          <MuiAlert onClose={handleCloseFailed} severity="error" sx={{ width: '100%' }}>
            Something went wrong !
          </MuiAlert>
        </Snackbar>
      </Stack>
    </>
  );
};
export default VoucherAdd;
