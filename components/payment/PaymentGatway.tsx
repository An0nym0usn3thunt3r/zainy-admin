"use client";

import axios from "axios";

const PaymentGatway = async (AMOUNT:string, CURRENCY_CODE:string, MSG:string, SUCCESS_URL:string, CANCEL_URL:string, TEST:boolean) => {
  const options = {
    method: "POST",
    url: "https://api-v2.ziina.com/api/payment_intent",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      authorization: process.env.PAYMENT_GATWAY_URL,
    },
    data: {
      amount: AMOUNT,
      currency_code: CURRENCY_CODE,
      message: MSG,
      success_url: SUCCESS_URL,
      cancel_url: CANCEL_URL,
      test: TEST,
    },
  };

  try {
    const res = await axios.request(options);
    return res.data;
  } catch (err: any) {
    console.log(err);
    return err;
  }
};

export default PaymentGatway;
