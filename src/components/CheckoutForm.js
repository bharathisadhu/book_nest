import { useElements, useStripe, CardElement } from "@stripe/react-stripe-js";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import SSLComponent from "./SSLComponent";
import Image from "next/image";
import { Minus, Plus, X } from "lucide-react";

const CheckoutForm = ({ cartBook, setCartBook }) => {
  const [isDiscountSectionHidden, setIsDiscountSectionHidden] = useState(false);
  const [discount, setDiscount] = useState(0);
  const [couponInput, setCouponInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [clientSecret, setClientSecret] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [error, setError] = useState("");
  const [isCashOnDelivery, setIsCashOnDelivery] = useState(false);
  const [isStripePayment, setIsStripePayment] = useState(true);
  const [isSSLPayment, setSSLPayment] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const { data: session } = useSession();
  const router = useRouter();

  const subtotal = Array.isArray(cartBook)
    ? cartBook.reduce((sum, item) => sum + item.price * item.cardCount, 0)
    : 0;

  const tax = subtotal * 0.1; // Assuming 10% tax
  const deliveryCharge = isCashOnDelivery ? 10 : 0; // Add $10 if Cash on Delivery
  const total = subtotal + tax + deliveryCharge - discount;

  const handleCouponApply = () => {
    if (cartBook.length > 0 && couponInput === "BookNest10") {
      const discountAmount = (total * 10) / 100;
      setDiscount(discountAmount);
      setIsDiscountSectionHidden(true);
      Swal.fire({
        title: "Coupon Applied!",
        text: `You have received a discount of $${discountAmount.toFixed(2)}.`,
        icon: "success",
      });
    } else if (cartBook.length > 3 && couponInput === "BookNest20") {
      const discountAmount = (total * 20) / 100;
      setDiscount(discountAmount);
      setIsDiscountSectionHidden(true);
      Swal.fire({
        title: "Coupon Applied!",
        text: `You have received a discount of $${discountAmount.toFixed(2)}.`,
        icon: "success",
      });
    } else {
      let errorMessage = "The coupon code you entered is not valid.";
      if (cartBook.length < 1) {
        errorMessage = "Please select a book to apply the coupon.";
      } else if (cartBook.length < 3 && couponInput === "BookNest20") {
        errorMessage = "Please select more than 3 books to apply the coupon.";
      }
      Swal.fire({
        icon: "error",
        title: "Invalid Coupon",
        text: errorMessage,
      });
    }
  };

  useEffect(() => {
    const fetchClientSecret = async () => {
      try {
        if (total > 0 && !isCashOnDelivery) {
          const booksArray = cartBook.map((item) => ({
            bookId: item.BookId,
            bookName: item.name,
            price: item.price,
            quantity: item.cardCount,
          }));

          const response = await axios.post("/api/create-payment-intent", {
            price: total - discount,
            email: session?.user?.email || "anonymous",
            name: session?.user?.name || "anonymous",
            books: booksArray,
          });
          setClientSecret(response.data.clientSecret);
        }
      } catch (error) {
        console.error("Error fetching client secret:", error);
      }
    };

    if (session) {
      fetchClientSecret();
    }
  }, [cartBook, session, discount, total, isCashOnDelivery]);

  const countryCodeMap = {
    Bangladesh: "BD",
    "United States": "US",
    Egypt: "EG",
    "United Kingdom": "GB",
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements || loading || cartBook.length === 0) {
      return;
    }

    setLoading(true);

    const customerDetails = {
      name: event.target.your_name.value,
      email: event.target.your_email.value,
      address: event.target.your_Address.value,
      city: event.target.select_city.value,
      country: countryCodeMap[event.target.select_country.value] || "UNKNOWN",
      postalCode: event.target.postal_code.value,
    };

    const booksArray = cartBook.map((item) => ({
      bookId: item.BookId,
      bookName: item.name,
      price: item.price,
      quantity: item.cardCount,
    }));

    const totalAmount = total + deliveryCharge - discount.toFixed(2);

    if (isCashOnDelivery) {
      const payment = {
        name: customerDetails.name,
        email: customerDetails.email,
        address: customerDetails.address,
        city: customerDetails.city,
        country: customerDetails.country,
        postalCode: customerDetails.postalCode,
        transactionId: "Cash on Delivery",
        date: new Date(),
        books: booksArray,
        totalAmount,
        status: "pending",
      };

      try {
        const response = await axios.post("/api/payments", payment);
        console.log(response.data);
        Swal.fire({
          position: "center",
          icon: "success",
          title:
            "Thank you for your order! Your order will be on its way soon! 🚚",
          showConfirmButton: false,
          timer: 2000,
        });
      } catch (error) {
        console.error("Error processing payment:", error);
        Swal.fire({
          icon: "error",
          title: "Payment Error",
          text: "There was an error processing your payment. Please try again.",
        });
      } finally {
        setTimeout(() => {
          router.push("/");
        }, 500);
      }
    } else {
      const card = elements.getElement(CardElement);

      if (!card) {
        setLoading(false);
        return;
      }

      try {
        const { data } = await axios.post("/api/create-payment-intent", {
          name: customerDetails.name,
          email: customerDetails.email,
          address: customerDetails.address,
          city: customerDetails.city,
          country: customerDetails.country,
          postalCode: customerDetails.postalCode,
          date: new Date(),
          books: booksArray,
          totalAmount,
          status: "pending",
        });

        if (data.error) {
          setError(data.error);
          setLoading(false);
          return;
        }

        const clientSecret = data.clientSecret;

        const { paymentMethod, error: paymentMethodError } =
          await stripe.createPaymentMethod({
            type: "card",
            card,
            billing_details: {
              email: customerDetails.email || "anonymous",
              name: customerDetails.name || "anonymous",
              address: {
                line1: customerDetails.address,
                city: customerDetails.city,
                postal_code: customerDetails.postalCode,
                country: customerDetails.country,
              },
            },
          });

        if (paymentMethodError) {
          setError(paymentMethodError.message);
          Swal.fire({
            icon: "error",
            title: "Payment Error",
            text: paymentMethodError.message,
          });
          setLoading(false);
          return;
        }

        const { paymentIntent, error: confirmError } =
          await stripe.confirmCardPayment(clientSecret, {
            payment_method: paymentMethod.id,
          });

        if (confirmError) {
          setError(confirmError.message);
          Swal.fire({
            icon: "error",
            title: "Payment Confirmation Error",
            text: confirmError.message,
          });
          setLoading(false);
          return;
        }

        if (paymentIntent.status === "succeeded") {
          const payment = {
            name: customerDetails.name,
            email: customerDetails.email,
            address: customerDetails.address,
            city: customerDetails.city,
            country: customerDetails.country,
            postalCode: customerDetails.postalCode,
            transactionId: paymentIntent.id,
            date: new Date(),
            books: booksArray,
            totalAmount,
            status: "completed",
          };

          const response = await axios.post("/api/payments", payment);
          setCartBook([]); // Clear the cart after successful payment
          Swal.fire({
            position: "center",
            icon: "success",
            title:
              "Thank you for your payment! Your order will be on its way soon! 🚚",
            showConfirmButton: false,
            timer: 2000,
          });
        } else if (paymentIntent.status === "requires_action") {
          Swal.fire({
            icon: "info",
            title: "Authentication Required",
            text: "Please complete the additional authentication steps.",
          });
        } else {
          setError("Payment failed. Please try again.");
          Swal.fire({
            icon: "error",
            title: "Payment Error",
            text: "Payment failed. Please try again.",
          });
        }
      } catch (error) {
        setError(`Error processing payment: ${error.message}`);
        Swal.fire({
          icon: "error",
          title: "Payment Error",
          text: error.message,
        });
      } finally {
        setLoading(false);
      }
    }
  };

  const updatecardCount = (id, newcardCount) => {
    setCartBook((prevState) =>
      prevState.map((item) =>
        item._id === id
          ? { ...item, cardCount: Math.max(0, newcardCount) }
          : item
      )
    );
  };

  const [method, setMethod] = useState([
    {
      name: "VISA",
      type: "visa",
      logo: "https://sandbox.sslcommerz.com/gwprocess/v4/image/gw/visa.png",
      gw: "visacard",
      r_flag: "1",
      redirectGatewayURL:
        "https://sandbox.sslcommerz.com/gwprocess/v4/bankgw/indexhtmlOTP.php?mamount=1000.00&ssl_id=2310191520231MLVg8ZTsa9Ld4k&Q=REDIRECT&SESSIONKEY=9CE83C4562A96645C7652AF10D220C37&tran_type=success&cardname=visavard",
    },
  ]);
  const [showModal, setShowModal] = useState(false);

  const PaymentOption = async () => {
    let res = await fetch("/api/ssl_payment", { method: "POST" });
    let JSON = await res.json();
    console.log(JSON["data"]["desc"]);
    setMethod(JSON["data"]["desc"]);
    setShowModal(true); // Show the modal after fetching the data
  };

  const PayNow = (PayURL) => {
    window.open(PayURL, "_blank");
  };

  const handlePaymentMethodChange = (method) => {
    if (method === "cash") {
      setIsCashOnDelivery(true);
      setIsStripePayment(false);
      setSSLPayment(false);
    } else if (method === "ssl") {
      setIsCashOnDelivery(false);
      setIsStripePayment(false);
      setSSLPayment(true);
    } else {
      setIsCashOnDelivery(false);
      setIsStripePayment(true);
      setSSLPayment(false);
    }
  };

  return (
    <section className="bg-white py-8 antialiased dark:bg-gray-800 md:py-16">
      <form
        onSubmit={handleSubmit}
        className="mx-auto max-w-screen-xl px-4 2xl:px-0"
      >
        <div className="mt-6 sm:mt-8 lg:flex lg:items-start lg:gap-12 xl:gap-16">
          <div className="min-w-0 flex-1 space-y-8">
            <div className="flex flex-col lg:flex-row gap-4 w-full">
              <div className="space-y-4 w-full">
                {/* Set this div to full width */}
                <div className="md:col-span-2 space-y-4">
                  {/* Cart items display */}
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Cart Information
                  </h2>
                  <div className="max-h-[400px] md:max-h-[820px] overflow-y-auto p-4 text-black border-4 dark:text-white">
                    {cartBook?.length > 0 ? (
                      cartBook.map((item) => (
                        <div
                          key={item._id}
                          className="flex items-center space-x-4 border-b pb-4"
                        >
                          <Image
                            src={item.image}
                            alt={item.name}
                            width={80}
                            height={120}
                            className="object-cover"
                          />
                          <div className="flex-grow">
                            <h2 className="font-semibold">{item.name}</h2>
                            <p className="text-sm text-gray-600">
                              {item.author}
                            </p>
                            <p className="font-bold mt-2">
                              ${item.price?.toFixed(2)}
                            </p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() =>
                                updatecardCount(item._id, item.cardCount - 1)
                              }
                              className="p-1 border rounded"
                            >
                              <Minus className="h-4 w-4" />
                            </button>
                            <input
                              type="number"
                              value={item.cardCount}
                              min="0"
                              onChange={(e) => {
                                const newcardCount = parseInt(e.target.value);
                                if (!isNaN(newcardCount))
                                  updatecardCount(item._id, newcardCount);
                              }}
                              className="w-16 text-center text-black border rounded p-1"
                            />
                            <button
                              onClick={() =>
                                updatecardCount(item._id, item.cardCount + 1)
                              }
                              className="p-1 border rounded"
                            >
                              <Plus className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handleRemove(item._id)}
                              className="p-1 border rounded text-[#F65D4E]"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-500">Your cart is empty.</p>
                    )}
                  </div>
                </div>
              </div>

              <div className="flow-root w-full">
                {" "}
                {/* Set this div to full width */}
                <h2 className="text-xl font-semibold text-gray-900 mb-4 dark:text-white">
                  Payment Information
                </h2>
                {/* <div className="border-t-2 border-gray-300 w-full md:w-[60%] lg:w-[65%] mt-4"></div> */}
                <div className="-my-3 divide-y divide-gray-200 dark:divide-gray-800">
                  <dl className="flex items-center justify-between gap-4 py-3">
                    <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                      Subtotal
                    </dt>
                    <dd className="text-base font-medium text-green-500">
                      ${subtotal.toFixed(2)}
                    </dd>
                  </dl>

                  <dl className="flex items-center justify-between gap-4 py-3">
                    <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                      Tax
                    </dt>
                    <dd className="text-base font-medium text-gray-900 dark:text-white">
                      ${tax.toFixed(2)}
                    </dd>
                  </dl>

                  <dl className="flex items-center justify-between gap-4 py-3">
                    {discount > 0 && (
                      <>
                        <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                          Discount
                        </dt>
                        <dd className="text-base font-medium text-green-500">
                          -${discount.toFixed(2)}
                        </dd>
                      </>
                    )}
                    {/* Coupon Section */}
                    {!isDiscountSectionHidden && (
                      <div
                        id="discountSection"
                        className="relative w-full rounded-lg flex h-12 justify-center items-center"
                      >
                        <input
                          value={couponInput}
                          onChange={(e) => setCouponInput(e.target.value)}
                          id="couponInput"
                          className="peer w-full rounded-l-lg border border-[#F65D4E] bg-transparent px-4 py-2 focus:outline-none"
                          name="coupon"
                          type="text"
                          placeholder="Coupon Code"
                        />
                        <label
                          className="absolute -top-2 left-2 rounded-md bg-[#F65D4E] px-2 text-xs text-sky-100 duration-300 "
                          htmlFor="navigate_ui_input_33"
                        >
                          Have a coupon code
                        </label>
                        {/* button */}
                        <div>
                          <button
                            onClick={handleCouponApply}
                            className="py-2 px-6 h-[42px] bg-[#F65D4E] hover:bg-red-600 duration-300 text-white flex items-center justify-center overflow-hidden hover:overflow-visible relative group rounded-r-lg"
                          >
                            <svg
                              viewBox="0 0 1024 1024"
                              className="icon rotate-45 group-hover:duration-700 absolute w-12 -translate-x-full translate-y-full scale-0 group-hover:scale-100 group-hover:translate-x-8 group-hover:-translate-y-8 duration-150"
                              version="1.1"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="#000000"
                            >
                              <g strokeWidth="0"></g>
                              <g
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              ></g>
                              <g>
                                <path
                                  d="M244.5 662l268.1-446.4 268 446.4z"
                                  fill="#9ED5E4"
                                ></path>
                                <path
                                  d="M780.6 676.2H244.5c-5.3 0-10.2-2.7-12.8-7.1s-2.6-9.8 0-14.3l268.1-446.3c2.6-4.4 7.5-7.1 12.8-7.1 5.3 0 10.2 2.7 12.8 7.1l268.1 446.3c2.6 4.4 2.6 9.8 0 14.3-2.7 4.4-7.6 7.1-12.9 7.1z m-510.5-28.5H755L512.6 244.2 270.1 647.7z"
                                  fill="#154B8B"
                                ></path>
                                <path
                                  d="M512.6 23s129 131.7 129 352.4-129 376-129 376-129-155.3-129-376S512.6 23 512.6 23z"
                                  fill="#F7F9F9"
                                ></path>
                                <path
                                  d="M512.6 765.7c-4.5 0-8.8-2-11.6-5.4-1.4-1.6-33.7-40.9-66.4-108.1-30.1-61.9-65.9-160.2-65.9-276.8 0-116.9 36-208.8 66.1-265.4 32.8-61.6 65.5-95.3 66.9-96.7 2.8-2.9 6.7-4.5 10.8-4.5 4.1 0 8 1.6 10.8 4.5 1.4 1.4 34.1 35.1 66.9 96.7 30.1 56.6 66.1 148.5 66.1 265.4 0 116.6-35.8 214.9-65.9 276.8-32.7 67.2-65 106.5-66.4 108.1-2.8 3.4-7.1 5.4-11.6 5.4z"
                                  fill="#F65D4E"
                                ></path>
                              </g>
                            </svg>
                            <span className="relative">Apply</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </dl>
                  <dl className="flex items-center justify-between gap-4 py-3">
                    {isCashOnDelivery && (
                      <>
                        <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                          Delivery Charge
                        </dt>
                        <dd className="text-base font-medium text-gray-900 dark:text-white">
                          $10.00
                        </dd>
                      </>
                    )}
                  </dl>
                  <dl className="flex items-center justify-between gap-4 py-3">
                    <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                      Total
                    </dt>
                    <dd className="text-base font-medium text-gray-900 dark:text-white">
                      ${total.toFixed(2)}
                    </dd>
                  </dl>
                </div>
                <h2 className="text-xl my-4 font-semibold text-gray-900 dark:text-white">
                  Delivery Details
                </h2>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="your_name"
                      className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="your_name"
                      name="your_name"
                      className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                      value={session?.user.name || ""}
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="your_email"
                      className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Your Email
                    </label>
                    <input
                      type="email"
                      id="your_email"
                      name="your_email"
                      className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                      value={session?.user.email || ""}
                      required
                    />
                  </div>

                  <div>
                    <div className="mb-2 flex items-center gap-2">
                      <label
                        htmlFor="select-country"
                        className="block text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Country*
                      </label>
                    </div>
                    <select
                      id="select_country"
                      name="select_country"
                      className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                      required
                    >
                      <option selected>Bangladesh</option>
                    </select>
                  </div>

                  <div>
                    <div className="mb-2 flex items-center gap-2">
                      <label
                        htmlFor="select_city"
                        className="block text-sm font-medium text-gray-900 dark:text-white"
                      >
                        City*
                      </label>
                    </div>
                    <select
                      id="select_city"
                      name="select_city"
                      className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                      required
                    >
                      <option selected>Chittagong</option>
                      <option value="DK">Dhaka</option>
                    </select>
                  </div>
                  <div>
                    <label
                      htmlFor="your_address"
                      className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Address
                    </label>
                    <input
                      type="text"
                      id="your_Address"
                      name="your_Address"
                      className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="postal_code"
                      className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Postal Code
                    </label>
                    <input
                      type="number"
                      id="postal_code"
                      name="postal_code"
                      className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                      required
                    />
                  </div>
                </div>
                <div class="space-y-2">
                  <h3 class="text-xl font-semibold text-gray-900 my-4 dark:text-white">
                    Delivery Methods
                  </h3>
                  <div className="flex flex-col md:flex-row gap-6">
                    <div class="grid grid-cols-1 gap-4 ">
                      <div class="rounded-lg border border-gray-200 bg-gray-50 p-4 ps-4 dark:border-gray-700 dark:bg-gray-800">
                        <div class="flex items-start">
                          <div class="flex h-5 items-center">
                            <input
                              id="dhl"
                              aria-describedby="dhl-text"
                              type="radio"
                              name="delivery-method"
                              value=""
                              class="h-4 w-4 border-gray-300 bg-white text-primary-600 focus:ring-2 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600"
                              checked={isCashOnDelivery}
                              onChange={() => handlePaymentMethodChange("cash")}
                            />
                          </div>

                          <div class="ms-4 text-sm">
                            <label
                              for="dhl"
                              class="font-medium leading-none text-gray-900 dark:text-white"
                            >
                              Cash on Delivery
                            </label>
                            <p
                              id="dhl-text"
                              class="mt-1 text-xs font-normal text-gray-500 dark:text-gray-400"
                            >
                              Get it by Tommorow
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* ssl commerzz */}
                    <div class="grid grid-cols-1 gap-4 ">
                      <div class="rounded-lg border border-gray-200 bg-gray-50 p-4 ps-4 dark:border-gray-700 dark:bg-gray-800">
                        <div class="flex items-start">
                          <div class="flex h-5 items-center">
                            <input
                              id="dhl"
                              aria-describedby="dhl-text"
                              type="radio"
                              name="delivery-method"
                              value=""
                              class="h-4 w-4 border-gray-300 bg-white text-primary-600 focus:ring-2 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600"
                              checked={isSSLPayment}
                              onChange={() => handlePaymentMethodChange("ssl")}
                            />
                          </div>

                          <div class="ms-4 text-sm">
                            <label
                              for="dhl"
                              class="font-medium leading-none text-gray-900 dark:text-white"
                            >
                              Pay Via SSL Commerz
                            </label>
                            <p
                              id="dhl-text"
                              class="mt-1 text-xs font-normal text-gray-500 dark:text-gray-400"
                            >
                              Pay With Local Bank
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="grid grid-cols-1 gap-4">
                      <div class="rounded-lg border border-gray-200 bg-gray-50 p-4 ps-4 dark:border-gray-700 dark:bg-gray-800">
                        <div class="flex items-start">
                          <div class="flex h-5 items-center">
                            <input
                              id="dhl1"
                              aria-describedby="dhl1-text"
                              type="radio"
                              name="delivery-method"
                              value=""
                              class="h-4 w-4 border-gray-300 bg-white text-primary-600 focus:ring-2 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600"
                              checked={isStripePayment}
                              onChange={() =>
                                handlePaymentMethodChange("stripe")
                              }
                            />
                          </div>

                          <div class="ms-4 text-sm">
                            <label
                              for="dhl1"
                              class="font-medium leading-none text-gray-900 dark:text-white"
                            >
                              Payment Via Stripe
                            </label>
                            <p
                              id="dhl1-text"
                              class="mt-1 text-xs font-normal text-gray-500 dark:text-gray-400"
                            >
                              Instant Payment
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  {!isCashOnDelivery && !isSSLPayment && (
                    <>
                      <div className="mt-4">
                        <input
                          type="text"
                          placeholder="Cardholder's Name"
                          className="px-4 py-3.5 bg-white dark:bg-gray-800 dark:text-white text-gray-800 w-full text-sm border rounded-md focus:border-purple-500 focus:bg-transparent outline-none"
                          // required
                        />
                      </div>
                      <CardElement
                        className="p-4 mt-4 border dark:text-white rounded"
                        options={{ hidePostalCode: true }}
                      />
                    </>
                  )}
                  {!isSSLPayment && (
                    <button
                      type="submit"
                      className="mt-4 w-full bg-[#F65D4E] text-white rounded p-2"
                      disabled={!stripe || !elements || loading}
                    >
                      {isCashOnDelivery ? "Place Order" : "Pay Now"}
                    </button>
                  )}
                  {isSSLPayment && (
                    <div className="py-4">
                      <button
                        onClick={PaymentOption}
                        className="mt-4 w-full bg-[#F65D4E] text-white rounded p-2"
                      >
                        Checkout
                      </button>
                    </div>
                  )}
                  {error && (
                    <p className="text-[#F65D4E] text-center mt-2">{error}</p>
                  )}
                  {transactionId && (
                    <p className="text-green-600">
                      Your transaction ID: {transactionId}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Modal */}
            {showModal && (
              <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-black bg-opacity-50">
                <div className="bg-white rounded-lg shadow-lg w-[60vh] p-4">
                  <div className="flex justify-between items-center pb-2">
                    <h2 className="text-xl font-bold">Select Payment Method</h2>
                    <button
                      onClick={() => setShowModal(false)}
                      className="text-gray-600 text-xl"
                    >
                      &times;
                    </button>
                  </div>
                  <section className="flex justify-center items-center py-4 ">
                    <div className="grid grid-cols-6 gap-4 p-4  ">
                      {method.map((item, i) => {
                        return (
                          <button
                            key={item.id}
                            className=" hover:shadow-xl "
                            onClick={() => {
                              PayNow(item["redirectGatewayURL"]);
                            }}
                          >
                            <Image
                              height={200}
                              width={200}
                              className=" w-16 "
                              src={item["logo"]}
                              alt="pay"
                            />
                          </button>
                        );
                      })}
                    </div>
                  </section>
                </div>
              </div>
            )}
          </div>
        </div>
      </form>
    </section>
  );
};

export default CheckoutForm;
