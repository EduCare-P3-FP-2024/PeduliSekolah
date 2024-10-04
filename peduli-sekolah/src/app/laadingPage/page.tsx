import filebg from '@/assets/fille.png'
import React from 'react';

export default function Laddingpage() {
  return (
    <>
      <section
        className="relative bg-cover bg-center h-screen rounded-lg"
        style={{ backgroundImage: `url(${filebg.src})` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="relative z-10 container mx-auto h-full flex flex-col justify-center items-center text-center px-4">
          <h2 className="text-3xl md:text-5xl font-bold text-white">
            Kami Membutuhkan bantuan anda
          </h2>
          <p className="text-lg text-gray-200 mt-4 max-w-2xl">
            peduli sekolah saat adalah suatu website yang menyediakan layanan berupa
            donasi antar sekolah. dimana jika ada sekolah yang membutuhkan dana maka
            aplikasi ini siap menampung donasi
          </p>
          <div className="flex mt-6 space-x-4">
            <a
              href="#"
              className="text-white text-lg border border-white px-4 py-2 rounded"
            >
              PH +61 8 6102 6565
            </a>
            <a href="#" className="btn btn-primary px-6 py-2 text-lg">
              Register Now
            </a>
          </div>
        </div>
      </section>
      <div className="container mx-auto mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center mb-10 px-4">
          <div className="w-full">
            <div className="relative pb-9/16 h-0">
              <img
                className="absolute top-0 left-0 w-full h-full"
                src="/file.png"
              />
            </div>
          </div>
          {/* Text */}
          <div className="text-center lg:text-left">
            <h2 className="text-3xl font-bold mb-4 leading-tight">
              Choose The Right Course To Achieve Your Goals
            </h2>
            <p className="mb-3 text-gray-600">
              Are you looking for PR or to expand your career opportunities at home,
              or simply to buy yourself time while exploring this beautiful country?
            </p>
            <p className="mb-6 text-gray-600">
              We can show you how to turn your mediocre study plan into a
              results-driven strategy that will change your life. Book your study
              consultation today and see for yourself.
            </p>
            <a href="#" className="btn btn-primary px-6 py-2">
              Find the Right Course
            </a>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 px-4">
          <div className="card bg-white shadow-lg rounded-lg overflow-hidden text-center">
            <img
              className="w-full"
              src="https://via.placeholder.com/400x300.png?text=Pathway+To+PR"
              alt="Pathway to PR"
            />
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">Pathway To PR</h3>
              <p className="text-gray-600 mb-4">
                If your goal is to achieve permanent residency, it's crucial to have
                a plan. We believe you should have a PR strategy, not just a course.
              </p>
              <a href="#" className="btn btn-outline btn-primary px-4 py-2">
                Learn More
              </a>
            </div>
          </div>
          <div className="card bg-white shadow-lg rounded-lg overflow-hidden text-center">
            <img
              className="w-full"
              src="https://via.placeholder.com/400x300.png?text=Course+Enrolment"
              alt="Course Enrolment"
            />
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">Course Enrolment</h3>
              <p className="text-gray-600 mb-4">
                Our experienced education agents will help you enroll in the right
                course to achieve your goals. We work with you to ensure PR
                opportunities.
              </p>
              <a href="#" className="btn btn-outline btn-primary px-4 py-2">
                Learn More
              </a>
            </div>
          </div>
          <div className="card bg-white shadow-lg rounded-lg overflow-hidden text-center">
            <img
              className="w-full"
              src="https://via.placeholder.com/400x300.png?text=Student+Visas"
              alt="Student Visas"
            />
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">Student Visas</h3>
              <p className="text-gray-600 mb-4">
                Our knowledgeable Certified Education Agents and Migration Agents
                will help you ensure your visa application is successful.
              </p>
              <a href="#" className="btn btn-outline btn-primary px-4 py-2">
                Learn More
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
