"use client";

import NavbarPublic from "@/components/NavbarPublic";
import HeroLandingPage from "@/components/HeroLandingPage";
import FeaturesLandingPage from "@/components/FeaturesLandingPage";
import CarouselLandingPage from "@/components/CarouselLandingPage";
import HowItWorksLandingPage from "@/components/HowItWorksLandingPage";
import FAQLandingPage from "@/components/FAQLandingPage";
import CTALandingPage from "@/components/CTALandingPage";
import Footer from "@/components/Footer";
import React from "react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#ECF0F1] w-full">
      {/* Header */}
      <NavbarPublic />

      {/* Hero Section */}
      <section className="bg-[#2C3E50] text-[#ECF0F1] py-20">
        <div className="container mx-auto">
          <HeroLandingPage />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-[#ECF0F1]">
        <div className="container mx-auto">
          <FeaturesLandingPage />
        </div>
      </section>

      {/* Success Stories */}
      <section className="bg-[#34495E] py-20">
        <div className="container mx-auto">
          <CarouselLandingPage />
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-[#ECF0F1]">
        <div className="container mx-auto">
          <HowItWorksLandingPage />
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-[#2C3E50] py-20">
        <div className="container mx-auto">
          <FAQLandingPage />
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[#E67E22] text-[#ECF0F1] py-20">
        <div className="container mx-auto">
          <CTALandingPage />
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
