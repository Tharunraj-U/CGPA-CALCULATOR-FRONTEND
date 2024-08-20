import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import cbum from "../assets/cbum.jpg"; // Default image in case API fails

const Home = () => {
  const [studentData, setStudentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const token = localStorage.getItem("token");
        const email = localStorage.getItem("userEmail");
        const response = await axios.get(`http://localhost:8080/api/profile?email=${email}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setStudentData(response.data);
      } catch (err) {
        setError("Failed to fetch student data.");
        console.error("Error fetching student data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStudentData();
  }, []);

  if (loading) return <div className="text-center text-lg mt-10">Loading...</div>;
  if (error) return <div className="text-red-500 text-center mt-10">{error}</div>;

  return (
    <div className="bg-gradient-to-r from-indigo-100 via-purple-200 to-pink-300 min-h-screen">
    <Navbar /> {/* Include the Navbar at the top */}
    
    {/* Main Content */}
    <div className="flex flex-col justify-center items-center h-full p-4 animate-fadeIn">
      <h1 className="text-4xl font-bold mb-4 text-white drop-shadow-md">Welcome, {studentData.fullName}!</h1>
      
      <div className="flex flex-col items-center bg-white p-6 rounded-md shadow-xl w-full max-w-md transform transition-transform hover:scale-105 hover:shadow-2xl">
        <img
          src={studentData.profileImage ? `data:image/jpeg;base64,${studentData.profileImage}` : cbum}
          alt="Student"
          className="w-32 h-32 rounded-full mb-4 object-cover border-4 border-blue-500 hover:border-indigo-600 transition-transform duration-300 ease-in-out"
        />
        
        <div className="w-full text-center">
          <p className="text-xl font-semibold text-gray-800 mb-1">Department: 
            <span className="text-blue-600 font-bold">{studentData.department}</span>
          </p>
          <p className="text-xl font-semibold text-gray-800 mb-1">Section: 
            <span className="text-blue-600 font-bold">{studentData.section}</span>
          </p>
          <p className="text-xl font-semibold text-gray-800 mb-1">Roll No: 
            <span className="text-blue-600 font-bold">{studentData.rollNumber}</span>
          </p>
          <p className="text-xl font-semibold text-gray-800 mb-1">Reg No: 
            <span className="text-blue-600 font-bold">{studentData.registrationNumber}</span>
          </p>
          
          {/* CGPA Section with Highlight */}
          <div className="relative mt-4">
            <p className="text-2xl font-bold text-gray-800 mb-1">Current CGPA: 
              <span className="text-green-400 font-extrabold ml-2 animate-pulse">{studentData.cgpa}</span>
            </p>
            <div className="absolute inset-0 bg-gradient-to-r from-green-300 via-green-400 to-green-500 opacity-30 rounded-full blur-lg"></div>
          </div>
  
          {/* Additional Design Elements */}
          <div className="mt-4 p-4 bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-300 rounded-lg shadow-lg">
            <p className="text-lg font-semibold text-white">Keep up the good work, {studentData.fullName}! Your efforts are paying off.</p>
          </div>
  
          
        </div>
      </div>
    </div>
  </div>
  
  );
};

export default Home;
