"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { Heart, Share2, MessageCircle, ArrowLeft, Calendar, DollarSign, Users, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Post } from "@/utils/types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function DonationPage() {
  const { slug } = useParams();
  const [projectData, setProjectData] = useState<Post | null>(null);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(42);
  const [loadingPayment, setLoadingPayment] = useState(false);
  const [amount, setAmount] = useState<number | string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [donorName, setDonorName] = useState("");
  const [donorEmail, setDonorEmail] = useState("");

  // Fetch project data with headers
  useEffect(() => {
    const fetchProjectData = async () => {
      try {
        const response = await fetch(`/api/posts/${slug}`, {
          method: "GET",
          headers: {
            "x-userId": "your-x-userId-value", // Retrieve the actual value if needed
            "x-role": "your-x-role-value",
            "x-accountType": "your-x-accountType-value",
            "x-username": "your-x-username-value",
          },
        });

        const data = await response.json();
        setProjectData(data.data);
      } catch (error) {
        console.error("Failed to fetch project data:", error);
      }
    };

    if (slug) {
      fetchProjectData();
    }
  }, [slug]);

  // Fetch donor details from headers when modal opens
  useEffect(() => {
    const fetchDonorDetails = async () => {
      // Assuming you fetch donor info from the headers as well
      setDonorName("your-x-username-value"); // Replace with actual value from header
      setDonorEmail("your-x-email-value"); // Replace with actual value from header
    };

    fetchDonorDetails();
  }, []);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);
  };

  const handleSupportProject = () => {
    setIsModalOpen(true);
  };

  const processPayment = async () => {
    if (!amount || isNaN(Number(amount))) {
      alert("Please fill in the donation amount with valid information.");
      return;
    }

    setLoadingPayment(true);
    setIsModalOpen(false);

    try {
      const response = await fetch("/api/transaction", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify([
          {
            _id: projectData?._id,
            amount: parseInt(amount.toString(), 10),
            userId: projectData?.userId,
            donorName,
            donorEmail,
          },
        ]),
      });

      const { token, orderId } = await response.json();

      if (token && window.snap) {
        window.snap.pay(token, {
          onSuccess: function (result) {
            updateTransactionStatus(
              orderId,
              "success",
              result.payment_type,
              result.transaction_time
            );
            window.location.href = `/success?orderId=${orderId}&payment_method=${result.payment_type}&payment_date=${result.transaction_time}`;
          },
          onPending: function (result) {
            updateTransactionStatus(
              orderId,
              "pending",
              result.payment_type,
              result.transaction_time
            );
          },
          onError: function (result) {
            updateTransactionStatus(
              orderId,
              "failed",
              result.payment_type,
              result.transaction_time
            );
          },
          onClose: function () {
            console.log("Payment popup closed!");
          },
        });
      }
    } catch (error) {
      console.error("Failed to process payment:", error);
    } finally {
      setLoadingPayment(false);
    }
  };

  const updateTransactionStatus = async (
    orderId: string,
    status: string,
    method: string,
    date: string
  ) => {
    try {
      await fetch("/api/transaction/status", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderId,
          payment_method: method,
          payment_status: status,
          payment_date: date,
        }),
      });
    } catch (error) {
      console.error("Error updating transaction status:", error);
    }
  };

  if (!projectData) {
    return (
      <div className="min-h-screen w-full bg-[#ECF0F1] flex items-center justify-center">
        <p className="text-2xl text-[#2C3E50]">Loading...</p>
      </div>
    );
  }

  const progressPercentage = (projectData.amount / projectData.target_amount) * 100;

  return (
    <div className="min-h-screen w-full bg-[#ECF0F1] p-4 md:p-8">
      <Link
        href="/explore"
        className="inline-flex items-center text-[#2C3E50] hover:text-[#E67E22] mb-6"
      >
        <ArrowLeft className="mr-2" size={20} />
        Back to Explore
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-lg overflow-hidden shadow-xl border-2 border-[#E67E22]"
      >
        <img
          src={projectData.imageUrl[0] || "/placeholder.svg?height=400&width=800"}
          alt={projectData.title}
          className="w-full h-64 md:h-96 object-cover"
        />
        <div className="p-6">
          <div className="flex flex-wrap justify-between items-center mb-4">
            <h1 className="text-3xl font-bold text-[#2C3E50] mr-4">
              {projectData.title}
            </h1>
            <span className="inline-block px-3 py-1 text-sm font-semibold rounded-full bg-[#27AE60] text-white">
              {projectData.status}
            </span>
          </div>

          <p className="text-[#34495E] mb-6">{projectData.content}</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="flex items-center">
              <DollarSign className="text-[#E67E22] mr-2" />
              <div>
                <p className="text-sm text-[#34495E]">Raised</p>
                <p className="font-semibold text-[#2C3E50]">Rp. {projectData.amount.toLocaleString("id-ID")}</p>
              </div>
            </div>
            <div className="flex items-center">
              <Users className="text-[#E67E22] mr-2" />
              <div>
                <p className="text-sm text-[#34495E]">Supporters</p>
                <p className="font-semibold text-[#2C3E50]">{likeCount}</p>
              </div>
            </div>
            <div className="flex items-center">
              <Clock className="text-[#E67E22] mr-2" />
              <div>
                <p className="text-sm text-[#34495E]">Days Left</p>
                <p className="font-semibold text-[#2C3E50]">
                  {Math.max(0, Math.ceil((new Date(projectData.deadLineAt).getTime() - new Date().getTime()) / (1000 * 3600 * 24)))}
                </p>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <div className="flex justify-between mb-2">
              <span className="text-sm font-semibold text-[#2C3E50]">Rp. {projectData.amount.toLocaleString("Id-ID")} raised</span>
              <span className="text-sm font-semibold text-[#2C3E50]">Rp. {projectData.target_amount.toLocaleString("id-ID")} goal</span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
          </div>

          <div className="flex flex-wrap justify-between items-center mb-6">
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
              <DialogTrigger asChild>
                <Button
                  className="bg-[#E67E22] hover:bg-[#D35400] text-white font-semibold py-2 px-4 rounded-full mb-4 md:mb-0"
                  onClick={handleSupportProject}
                  disabled={loadingPayment}
                >
                  {loadingPayment ? "Processing..." : "Donate Now"}
                </Button>
              </DialogTrigger>

              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Make a Donation</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="amount" className="text-right">
                      Amount ($)
                    </Label>
                    <Input
                      id="amount"
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="col-span-3"
                    />
                  </div>
                </div>
                <Button
                  className="bg-[#E67E22] text-white w-full"
                  onClick={processPayment}
                >
                  Proceed with Donation
                </Button>
              </DialogContent>
            </Dialog>

            <div className="flex space-x-4">
              <Button
                variant="outline"
                size="icon"
                onClick={handleLike}
                className={`rounded-full ${
                  isLiked ? "text-red-500" : "text-[#34495E]"
                }`}
              >
                <Heart className={isLiked ? "fill-current" : ""} />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="rounded-full text-[#34495E]"
              >
                <Share2 />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="rounded-full text-[#34495E]"
              >
                <MessageCircle />
              </Button>
            </div>
          </div>

          <div className="flex flex-wrap justify-between text-sm text-[#34495E]">
            <span>Category: {projectData.categoryId.toString()}</span>
            <span>Created: {new Date(projectData.createdAt).toLocaleDateString()}</span>
            <span>Deadline: {new Date(projectData.deadLineAt).toLocaleDateString()}</span>
          </div>

          {projectData.tags && projectData.tags.length > 0 && (
            <div className="mt-6">
              <h2 className="text-xl font-semibold text-[#2C3E50] mb-2">Tags</h2>
              <div className="flex flex-wrap gap-2">
                {projectData.tags.map((tag, index) => (
                  <span key={index} className="bg-[#ECF0F1] text-[#34495E] px-2 py-1 rounded-full text-sm">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
