import React, { useState } from 'react';
import { useElements, useStripe, CardElement } from '@stripe/react-stripe-js';
import {axiosInstance} from '../../interceptor/axiosInstance';
import { useSelector } from 'react-redux';
import { RootStateType } from '../../../redux/store';
import TextField from '@mui/material/TextField'; // Import MUI TextField
import PublicMethods from '../../../Methods/PublicMethods';
import Paymentfailed from '../../../../public/svg/undraw_warning_re_eoyh.svg'
import SuccessFullySubscribed from '../../../../public/svg/undraw_completing_re_i7ap.svg'
import creditCardPayment from '../../../../public/svg/undraw_credit_card_payments_re_qboh.svg'
import { ISubscriptionPayment } from '../../../interface/ISubscription/ISubscriptionPayment';
import ICommonAPI from '../../../interface/IcommonAPI/IcommonAPI';
import ErrorBoundary from '../errorBoundary/ErrorBoundary';

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

      console.error('Invalid email address');
      return;
    }


      const response:{ data:ISubscriptionPayment} = await axiosInstance.post('/Subscription/Payment', {
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

        
          const response:{data:ICommonAPI} = await axiosInstance.post('/addSubscription', {
            StudentId: _id,
            amount,
            TutorId
          });
          if (response.data.success) {
            handlesetSubscribed();
            setStatus('success');
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
      <ErrorBoundary>

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
        <button onClick={()=>void handlePay()}>
          Pay {publicMethod.formatRupees(amount)}
        </button>
      )}
          </ErrorBoundary>
    </>
  );
}

export default StripPayment;
