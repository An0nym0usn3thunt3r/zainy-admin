'use client'

import axios from 'axios';
import { useState } from 'react';

const MyComponent = async () => {
  const options = {
    method: 'POST',
    url: 'https://api-v2.ziina.com/api/payment_intent',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      authorization: 'Bearer 12vtblGQd7EL+8r/Sgh5rWC34fPGYDNfAP5E/kNQr2dfcbGR1XvW3waZ2bd2giyh'
    },
    data: {
      amount: 1000,
      currency_code: 'AED',
      message: 'string',
      success_url: 'https://www.whatsapp.com',
      cancel_url: 'https://www.nexadevs.pro',
      test: true
    }
  };

    try {
      const res = await axios.request(options);
      console.log(res)
      return res
    } catch (err:any) {
      console.log(err)
      return err;
    }
};

export default MyComponent;
