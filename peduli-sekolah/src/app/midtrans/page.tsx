"use client";

import { CldUploadButton } from "next-cloudinary";
import { useState, useEffect } from "react";

interface TransactionResponse {
  token: string;
  orderId: string;
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

  const [imageUrl, setImageUrl] = useState<string | null>(null); // State to store uploaded image URL

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const updateTransactionStatus = async (
    orderId: string,
    payment_status: string,
    payment_method: string,
    payment_date: string
  ) => {
    try {
      const response = await fetch("/api/transaction/status", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderId,
          payment_method,
          payment_status,
          payment_date,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update transaction status");
      }

      console.log("Transaction status updated successfully");
    } catch (error) {
      console.error("Error updating transaction status:", error);
    }
  };

  const handleCheckout = async () => {
    try {
      const { userId, amount } = formData;

      if (!userId || !amount) {
        alert("Please fill in all fields.");
        return;
      }

      const response = await fetch("/api/transaction", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify([{ _id: "1", amount: parseInt(amount, 10), userId: userId }]),
      });

      const data: TransactionResponse = await response.json();
      const { token, orderId } = data; // Ensure both token and orderId are received

      if (token && window.snap) {
        window.snap.pay(token, {
          onSuccess: function (result) {
            updateTransactionStatus(orderId, "success", result.payment_type, result.transaction_time);
          },
          onPending: function (result) {
            updateTransactionStatus(orderId, "pending", result.payment_type, result.transaction_time);
          },
          onError: function (result) {
            updateTransactionStatus(orderId, "failed", result.payment_type, result.transaction_time);
          },
          onClose: function () {
            console.log("Payment popup closed!");
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

  const handleUploadSuccess = (result: any) => {
    // Extract the image URL from the result and store it in the state
    if (result?.info?.secure_url) {
      setImageUrl(result.info.secure_url); // Save image URL
    }
  };

  useEffect(() => {
    // Ensure Snap.js is loaded
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
            onSuccess={handleUploadSuccess} // Handle successful upload
            className="w-full bg-blue-500 text-white font-semibold py-3 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            <span>Upload</span>
          </CldUploadButton>
        </div>

        {/* Display Uploaded Image */}
        {imageUrl && (
          <div className="mt-4">
            <p>Uploaded Image:</p>
            <img src={imageUrl} alt="Uploaded" className="w-full h-auto" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Client;
