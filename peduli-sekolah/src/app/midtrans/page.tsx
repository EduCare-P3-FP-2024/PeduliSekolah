"use client";

import { CldUploadButton } from "next-cloudinary";

const Client = () => {
  const handleCheckout = async () => {
    try {
      // Call the API to get Midtrans transaction token
      const response = await fetch("/api/transaction", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify([
          {
            _id: "1",
            amount: 10000,
            userId: "User1",
          },
          {
            _id: "2",
            amount: 20000,
            userId: "User2",
          },
        ]),
      });

      const data = await response.json();
      const token = data.token;

      if (token && window.snap) {
        // Trigger the Midtrans Snap payment page
        window.snap.pay(token, {
          onSuccess: function (result) {
            console.log("Payment success!", result);
            // Handle success logic here
          },
          onPending: function (result) {
            console.log("Payment pending!", result);
            // Handle pending logic here
          },
          onError: function (result) {
            console.error("Payment error!", result);
            // Handle error logic here
          },
          onClose: function () {
            console.log("Payment popup closed!");
            // Handle logic when the user closes the popup without completing payment
          },
        });
      } else {
        console.error("Failed to get transaction token or Snap.js is not loaded");
      }
    } catch (error) {
      console.error("Checkout error:", error);
    }
  };

  return (
    <div>
      <button className="btn" onClick={handleCheckout}>
        Checkout
      </button>
      <div>
        <CldUploadButton
        options={{ multiple: true }}
        uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_NAME}
      >
        <span>
          Upload
        </span>
      </CldUploadButton>
      </div>
    </div>
  );
};

export default Client;
