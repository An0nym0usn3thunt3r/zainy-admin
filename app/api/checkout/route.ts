import { NextRequest, NextResponse } from "next/server";
import PaymentGatway from "@/lib/paymentUtil";

const reqPayment = async (amount: number) => {
  const payment = await PaymentGatway(
    amount,
    "AED",
    "hi",
    `${process.env.ECOMMERCE_STORE_URL}/payment_success`,
    `${process.env.ECOMMERCE_STORE_URL}/cart`,
    true
  );

  return payment;
};

export async function POST(req: NextRequest) {
  const requestBody = await req.json();

  if (!requestBody || !requestBody.amount) {
    return new NextResponse("Not enough data to checkout", { status: 400 });
  }

  const amount = requestBody.amount;

  console.log("Request comes with : " + amount);
  try {
    // const { cartItems, customer } = await req.json();

    // if (!cartItems || !customer) {
    //   console.log("!! cartItems")
    //   return new NextResponse("Not enough data to checkout", { status: 400 });
    // }

    const payment = await reqPayment(amount);
    return NextResponse.json(payment);
  } catch (err) {
    console.log("[checkout_POST]", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
