"use client";

import { CldUploadButton } from "next-cloudinary";
import { useEffect, useState } from "react";

interface TransactionResponse {
  token: string;
}

declare global {
  interface Window {
    snap?: {
      pay: (
        token: string,
        callbacks: {
          onSuccess?: (result: any) => void;
          onPending?: (result: any) => void;
          onError?: (result: any) => void;
          onClose?: () => void;
        },
      ) => void;
    };
  }
}

const Client = () => {
  const [formData, setFormData] = useState({
    userId: "",
    amount: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCheckout = async () => {
    try {
      const { userId, amount } = formData;

      // Validate form input
      if (!userId || !amount) {
        alert("Please fill in all fields.");
        return;
      }

      // Call the API to get Midtrans transaction token
      const response = await fetch("/api/transaction", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify([
          {
            _id: "1",
            amount: parseInt(amount, 10), // Parse amount as integer
            userId: userId,
          },
        ]),
      });

      // Parse the response and ensure it's typed correctly
      const data: TransactionResponse = await response.json();
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
        console.error(
          "Failed to get transaction token or Snap.js is not loaded",
        );
      }
    } catch (error) {
      console.error("Checkout error:", error);
    }
  };

  useEffect(() => {
    // Make sure that Snap.js is loaded by adding it as a script dynamically if necessary
    if (!window.snap) {
      const script = document.createElement("script");
      script.src = "https://app.sandbox.midtrans.com/snap/snap.js";
      script.setAttribute(
        "data-client-key",
        process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY || "",
      );
      document.body.appendChild(script);
    }
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 bg-white rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
          Checkout & Upload
        </h2>

        {/* Midtrans Form */}
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            User ID
          </label>
          <input
            type="text"
            name="userId"
            value={formData.userId}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
            placeholder="Enter your User ID"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Amount
          </label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
            placeholder="Enter amount"
          />
        </div>

        <button
          className="w-full bg-blue-500 text-white font-semibold py-3 rounded-lg hover:bg-blue-600 transition duration-300 mb-6"
          onClick={handleCheckout}
        >
          Checkout
        </button>

        {/* Cloudinary Upload Button */}
        <div className="mt-6">
          <CldUploadButton
            options={{ multiple: true }}
            uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_NAME}
            className="w-full bg-blue-500 text-white font-semibold py-3 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            <span>Upload</span>
          </CldUploadButton>
        </div>
      </div>
    </div>
  );
};

export default Client;
