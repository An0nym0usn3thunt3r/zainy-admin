const PaymentGatway = async (
    AMOUNT: number,
    CURRENCY_CODE: string,
    MSG: string,
    SUCCESS_URL: string,
    CANCEL_URL: string,
    TEST: boolean
  ) => {
    const requestOptions: RequestInit = {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        authorization: process.env.PAYMENT_GATWAY_URL || "", // Assuming process.env.PAYMENT_GATWAY_URL is a string
      },
      body: JSON.stringify({
        amount: AMOUNT,
        currency_code: CURRENCY_CODE,
        message: MSG,
        success_url: SUCCESS_URL,
        cancel_url: CANCEL_URL,
        test: TEST,
      }),
    };
  
    try {
      const response = await fetch("https://api-v2.ziina.com/api/payment_intent", requestOptions);
      const data = await response.json();
      console.log(data)
      return data;
    } catch (error) {
      console.error("Error:", error);
      return error;
    }
  };
  
  export default PaymentGatway;
  