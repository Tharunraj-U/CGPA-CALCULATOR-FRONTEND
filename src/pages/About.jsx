import React from 'react';
import Navbar from '../components/Navbar';

const About = () => {
  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-indigo-100 via-purple-200 to-pink-300 p-6">
        <div className="bg-white p-8 rounded-lg shadow-xl w-4/5 max-w-2xl transition-transform transform hover:scale-105 hover:shadow-2xl">
          <h1 className="text-3xl font-bold mb-4 text-center text-gray-800 font-poppins">
            About VEC CGPA Calculator
          </h1>
          <p className="text-lg mb-4 text-gray-700 font-poppins">
            The VEC CGPA Calculator is a tool designed specifically for the IT Department students of Velammal Engineering College (VEC).
            This application allows students to calculate their Cumulative Grade Point Average (CGPA) based on their grades and credit points.
          </p>
          <p className="text-lg mb-4 text-gray-700 font-poppins">
            The calculator is user-friendly and helps students keep track of their academic performance in real-time. 
            It provides accurate calculations and offers insights into how different grades affect their CGPA.
          </p>
          <p className="text-lg mb-4 text-gray-700 font-poppins">
            This tool is intended to assist students in understanding their academic standing and planning their coursework effectively.
          </p>
          <p className="text-lg text-gray-700 font-poppins">
            For more information, please contact the IT Department at VEC.
          </p>
        </div>
      </div>
    </>
  );
};

export default About;
