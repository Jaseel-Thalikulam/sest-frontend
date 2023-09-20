import React, { useState } from 'react';
import { useElements, useStripe, CardElement } from '@stripe/react-stripe-js';
import axiosInstanceTutor from '../../../tutor/interceptor/axiosInstanceTutor';
import axiosInstanceStudent from '../../../student/interceptor/axiosInstance.Student';
import { useSelector } from 'react-redux';
import { RootStateType } from '../../../redux/store';
import TextField from '@mui/material/TextField'; // Import MUI TextField
import Button from '@mui/material/Button'; // Import MUI Button
import PublicMethods from '../../../Methods/PublicMethods';
import Paymentfailed from '../../../../public/illustrations/undraw_warning_re_eoyh.svg'
import SuccessFullySubscribed from '../../../../public/illustrations/undraw_completing_re_i7ap.svg'
import creditCardPayment from '../../../../public/illustrations/undraw_credit_card_payments_re_qboh.svg'

interface IProp {
  amount: number;
  TutorId: string;
  handlesetSubscribed: () => void;
}

function StripPayment({ amount, TutorId, handlesetSubscribed }: IProp) {
  const publicMethod = new PublicMethods()
  const data = useSelector((state: RootStateType) => state.user);
  const { email, _id } = data;
  const [paymentEmail, setPaymentEmail] = useState(email);
  const [clientSecret, setClientSecret] = useState('');
  const [status, setStatus] = useState('pending');
  const [isEmailValid, setIsEmailValid] = useState(true); // State to track email validation
  const stripe = useStripe();
  const elements = useElements();

  const CardElementOptions = {
    style: {
      base: {
        fontSize: '16px'
      },
      invalid: {},
    },
    hidePostalCode: true,
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const enteredEmail = e.target.value;
    setPaymentEmail(enteredEmail);
    // Validate the email using a regular expression
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    const isValid = emailRegex.test(enteredEmail);
    setIsEmailValid(isValid);
  };

  const handlePay = async () => {
    if (!isEmailValid) {
      // If the email is not valid, prevent payment and show an error message
      console.error('Invalid email address');
      return;
    }

    if (localStorage.getItem('jwt-lead')) {
      const response = await axiosInstanceTutor.post('/Subscription/Payment', {
        amount: amount * 100,
        email: paymentEmail,
        StudentId: _id,
        TutorId
      });

      if (response.data.success) {
        setClientSecret(response.data.client_secret);
      } else {
        console.error(response);
      }
    } else if (localStorage.getItem('jwt-learn')) {
      const response = await axiosInstanceStudent.post('/Subscription/Payment', {
        amount: amount * 100,
        email: paymentEmail,
        StudentId: _id,
        TutorId
      });
      if (response.data.success) {
        setClientSecret(response.data.client_secret);
      } else {
        console.error(response);
      }
    }

    const cardElement = elements!.getElement(CardElement);

    try {
      const { paymentMethod } = await stripe!.createPaymentMethod({
        type: 'card',
        card: cardElement!,
      });

      const confirmCardPayment = await stripe?.confirmCardPayment(clientSecret, {
        payment_method: paymentMethod!.id,
      });

      console.log(confirmCardPayment);

      if (confirmCardPayment?.paymentIntent?.status === 'succeeded') {

        if (localStorage.getItem('jwt-lead')) {
          const response = await axiosInstanceTutor.post('/addSubscription', {
            StudentId: _id,
            amount,
            TutorId
          });
          if (response.data.success) {
            handlesetSubscribed();
            setStatus('success');
          }
        } else if (localStorage.getItem('jwt-learn')) {
          const response = await axiosInstanceStudent.post('/addSubscription', {
            StudentId: _id,
            amount,
            TutorId
          });
          if (response.data.success) {
            handlesetSubscribed();
            setStatus('success');
          }
        }
      } else {
        setStatus('rejected');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {status !== 'success' && status !== 'rejected' && (
        <div className="h-auto flex items-center m-20">
          <div className="w-1/2">
            <img src={creditCardPayment} alt="Your Image" className="w-full h-auto" />
          </div>
          <div className="w-1/2 p-15">
            <TextField
              className='mb-10'
              type="text"
              label="Email"
              variant="standard"
              fullWidth
              value={paymentEmail}
              onChange={handleEmailChange}
              placeholder="Enter email"
              error={!isEmailValid} // Show error state if email is not valid
              helperText={!isEmailValid ? 'Invalid email address' : ''}
            />
            <CardElement options={CardElementOptions} />
          </div>
        </div>
      )}
      {status === 'success' ? (
        <div className="flex justify-center items-center m-20">
          <img src={SuccessFullySubscribed} className="w-56 h-56" />{" "}
          {/* Adjust the size as needed */}
          <p className="ml-4 text-gray-700 text-2xl">
            Successfully Subscribed
          </p>
        </div>
      ) : status === 'rejected' ? (
        <div className="flex justify-center items-center m-20">
          <img src={Paymentfailed} className="w-56 h-56" />{" "}
          {/* Adjust the size as needed */}
          <p className="ml-4 text-gray-700 text-2xl">
            Payment Failed
          </p>
        </div>
      ) : (
        // Render the Pay button when status is 'pending'
        <button onClick={handlePay}>
          Pay {publicMethod.formatRupees(amount)}
        </button>
      )}
    </>
  );
}

export default StripPayment;
