
"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

function SslPaymentButton() {
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
    let res = await fetch("/api/ssl_payments", { method: "POST" });
    let JSON = await res.json();
    console.log(JSON["data"]["desc"]);
    setMethod(JSON["data"]["desc"]);
    setShowModal(true); // Show the modal after fetching the data
  };

  const PayNow = (PayURL) => {
    window.open(PayURL, "_blank");
  };

  return (
    <>
      <section className="flex flex-col items-center justify-center h-screen p-4">
        <button
          onClick={PaymentOption}
          className="p-2 bg-black rounded-lg text-white w-[22vh]"
        >
          Check Out
        </button>
      </section>

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
              <div className="grid grid-cols-6 gap-4 p-4">
                {method.map((item, i) => (
                  <button
                    key={i}
                    className="hover:shadow-xl"
                    onClick={() => PayNow(item.redirectGatewayURL)}
                  >
                    <Image
                      width={500}
                      height={500}
                      className="w-16"
                      src={item.logo}
                      alt={item.name}
                    />
                  </button>
                ))}
              </div>
            </section>
          </div>
        </div>
      )}
    </>
  );
}

export default SslPaymentButton;
