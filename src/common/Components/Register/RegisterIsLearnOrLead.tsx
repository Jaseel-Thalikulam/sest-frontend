import React from 'react';
import { Grid, Paper, Button, Typography } from '@mui/material';
import './Register.scss';
import { useDispatch } from 'react-redux';
import { handleOpenAndClose } from '../../../redux/modalSlice/modalSlice';
import { UserDetails } from '../../../redux/userSlice/UserSlice';
import { RootStateType } from '../../../redux/store';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { handleChangeState } from '../../../redux/modalSlice/RegisterFormModalSlice';
import RegisterIllustartion from '../../../../public/illustrations/undraw_online_test_re_kyfx.svg';

const RegisterIsLearnOrLead = () => {
  const dispatch = useDispatch();

  function RoleOfUser(role: string) {
    dispatch(handleOpenAndClose());
    dispatch(
      UserDetails({
        role: role,
        URLs: {
          github: '',
          linkedin: '',
          pinterest: '',
        },
        name: '',
        username: '',
        _id: '',
        phoneNumber: null,
        isBanned: false,
        tags: null,
        avatarUrl:null,
      })
    );
    dispatch(handleChangeState());
  }

  return (
    <Grid container spacing={6} justifyContent="center" alignItems="center">
      <Grid item lg={4}>
        {/* Image on the left */}
        <img
          src={RegisterIllustartion}
          alt="Illustration"
          className="max-w-full"
          style={{ width: '100%', maxWidth: '300px' }}
        />
      </Grid>

      <Grid item lg={6}>
        <Paper elevation={0} className="Paper  ">
          {/* Text and buttons on the right */}
          <Typography variant="h6" className="illustration-text">
            Welcome! Do you prefer to learn or lead ?
          </Typography>
          <button
            className='rounded-3xl m-2'
  type="button"
  style={{ backgroundColor: '#2563EB', color: 'white', padding: '10px 20px', fontSize: '16px', fontWeight: 'bold', border: 'none', cursor: 'pointer' }}
  onClick={() => RoleOfUser('Learn')}
>
  Learn
</button>
          <button
            className='rounded-3xl m-2'
  type="button"
  style={{ backgroundColor: '#2563EB', color: 'white', padding: '10px 20px', fontSize: '16px', fontWeight: 'bold', border: 'none', cursor: 'pointer' }}
  onClick={() => RoleOfUser('Learn')}
>
Lead
</button>



        </Paper>
      </Grid>
    </Grid>
  );
};

export default RegisterIsLearnOrLead;
