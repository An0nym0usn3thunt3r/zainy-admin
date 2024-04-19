'use client'

import axios from 'axios';
import { useState } from 'react';

const MyComponent = () => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

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

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    try {
      const res = await axios.request(options);
      setResponse(res.data);
    } catch (err:any) {
      setError(err);
      console.log(err)
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {/* Your form elements here */}
        <button type="submit">Submit</button>
      </form>
      {response && <p>{JSON.stringify(response, null, 2)}</p>}
      {error && <p>Error:</p>}
    </div>
  );
};

export default MyComponent;