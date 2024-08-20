import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const CGPACalculator = () => {
  const subjectsData = {
    "1": {
      "I": [
        { name: "Communicative English", credits: 2 },
        { name: "Engineering Chemistry", credits: 3 },
        { name: "Matrices, Differential and Integral Calculus", credits: 4 },
        { name: "Programming for Problem Solving in C", credits: 3 },
        { name: "Engineering Graphics", credits: 4 },
        { name: "Chemistry Laboratory", credits: 1 },
        { name: "C Programming Laboratory", credits: 2 },
        { name: "Communicative English Laboratory", credits: 1 },
      ],
      "II": [
        { name: "Vector Calculus and Complex Functions", credits: 4 },
        { name: "Engineering Physics", credits: 3 },
        { name: "Programming for Problem Solving Using Python", credits: 4 },
        { name: "Basic Electrical, Electronics and Communication Engineering", credits: 3 },
        { name: "Introduction to Information and Computing Technology", credits: 3 },
        { name: "Constitution of India", credits: 0 },
        { name: "Physics Laboratory", credits: 1 },
        { name: "Workshop Practice", credits: 2 },
        { name: "Basic Electrical, Electronics & Communication Engineering Laboratory", credits: 1 },
        { name: "Quantitative Aptitude and Verbal Reasoning", credits: 1 },
      ]
    },
    "2": {
      "III": [
        { name: "Data Structures", credits: 3 },
        { name: "Digital Logic Circuits", credits: 4 },
        { name: "Object Oriented Programming", credits: 3 },
        { name: "Computer Architecture", credits: 3 },
        { name: "Discrete Mathematics", credits: 4 },
        { name: "Fundamentals of Nano Science", credits: 0 },
        { name: "Data Structures Laboratory", credits: 1 },
        { name: "Object Oriented Programming Laboratory", credits: 1 },
        { name: "Heritage of Tamil", credits: 1},
        { name: "Quantitative Aptitude & Behavioral Skills EEC", credits: 1 },
      ],
      "IV": [
        { name: "Probability and Statistics", credits: 4 },
        { name: "Operating System", credits: 3 },
        { name: "Design and Analysis of Algorithms", credits: 4 },
        { name: "Object Oriented Software Engineering", credits: 3 },
        { name: "Database Management Systems", credits: 3 },
        { name: "Java Programming", credits: 3 },
        { name: "Environmental Science and Engineering", credits: 0 },
        { name: "Operating System Laboratory", credits: 1 },
        { name: "Database Management Systems Laboratory", credits: 1 },
        { name: "Java Programming Laboratory PCC", credits: 1 },
        { name: "Quantitative Aptitude & Communication Skills", credits: 1 },
      ]
    },
    "3": {
      "V": [
        { name: "Web Technologies", credits: 3 },
        { name: "Compiler Engineering", credits: 4 },
        { name: "Data Communication and Networking", credits: 3 },
        { name: "Professional Ethics and Human Values", credits: 3 },
        { name: "Professional Elective", credits: 3 },
        { name: "Microprocessor and Microcontroller", credits: 3 },
        { name: "Software Quality Assurance", credits: 3 },
        { name: "Web Technologies Laboratory", credits: 1 },
        { name: "Data Communication and Networking Laboratory", credits: 1 },
        { name: "Quantitative Aptitude and Soft Skills", credits: 1 },
      ],
      "VI": [
        { name: "Computational Intelligence", credits: 3 },
        { name: "Big Data Analytics", credits: 3 },
        { name: "Mobile Communication", credits: 3 },
        { name: "Information Security", credits: 3 },
        { name: "Professional Elective II", credits: 3 },
        { name: "Open Elective II", credits: 3 },
        { name: "Mobile Application Development Laboratory", credits: 1 },
        { name: "Intelligent System Laboratory", credits: 1 },
        { name: "Internship EEC", credits: 1 },
        { name: "Mini Project PROJ", credits: 1 },
      ]
    },
    "4": {
      "VII": [
        { name: "Cryptography and Network Security", credits: 3 },
        { name: "Blockchain Technologies", credits: 4 },
        { name: "Cloud Computing and Virtualization", credits: 3 },
        { name: "Professional Elective III", credits: 3 },
        { name: "Professional Elective IV", credits: 3 },
        { name: "Open Elective III", credits: 3 },
        { name: "Advanced Computing Laboratory", credits: 2 },
        { name: "Security Laboratory", credits: 2 },
      ],
      "VIII": [
        { name: "Professional Elective V", credits: 3 },
        { name: "Professional Elective VI", credits: 3 },
        { name: "Project Work PROJ", credits: 6 },
      ]
    }
  };

  const [selectedYear, setSelectedYear] = useState("1");
  const [selectedSemester, setSelectedSemester] = useState("I");
  const [subjects, setSubjects] = useState(subjectsData[selectedYear][selectedSemester]);

  const navigate = useNavigate();

  useEffect(() => {
    setSubjects(subjectsData[selectedYear][selectedSemester]);
  }, [selectedYear, selectedSemester]);

  const handleYearChange = (e) => {
    const newYear = e.target.value;
    setSelectedYear(newYear);
    // Reset semester to the first available semester for the new year
    const firstSemester = Object.keys(subjectsData[newYear])[0];
    setSelectedSemester(firstSemester);
  };

  const handleSemesterChange = (e) => {
    setSelectedSemester(e.target.value);
  };

  const goToGradeEntryPage = () => {
    navigate('/grade-entry', { state: { subjects } });
  };
  return (
    <>
      <Navbar />

      <div className="bg-gradient-to-r from-indigo-100 via-purple-200 to-pink-300 min-h-screen p-4">
        <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg transition-shadow hover:shadow-2xl">
          <h1 className="text-2xl font-bold mb-4 text-center text-gray-800">CGPA Calculator</h1>
          
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold">Select Year:</label>
            <select
              value={selectedYear}
              onChange={handleYearChange}
              className="mt-1 block w-full bg-gray-100 border border-gray-300 rounded-lg p-2 transition-transform duration-300 hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="1">1st Year</option>
              <option value="2">2nd Year</option>
              <option value="3">3rd Year</option>
              <option value="4">4th Year</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-semibold">Select Semester:</label>
            <select
              value={selectedSemester}
              onChange={handleSemesterChange}
              className="mt-1 block w-full bg-gray-100 border border-gray-300 rounded-lg p-2 transition-transform duration-300 hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {Object.keys(subjectsData[selectedYear]).map((semester) => (
                <option key={semester} value={semester}>
                  {semester === "I" ? "Semester I" : semester === "II" ? "Semester II" : `Semester ${semester}`}
                </option>
              ))}
            </select>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2 text-gray-800">Subjects & Credits</h2>
            <ul className="space-y-2">
              {subjects.map((subject, index) => (
                <li
                  key={index}
                  className="p-4 bg-gray-50 rounded-lg shadow-md transition-transform transform hover:scale-105 hover:shadow-xl relative"
                >
                  <span className="font-medium">{subject.name}</span>
                  <span className="float-right text-blue-600 font-bold">{subject.credits} Credits</span>
                  <div className="absolute top-1 right-1 text-sm text-gray-500 bg-gray-200 p-2 rounded-md shadow-lg opacity-0 transition-opacity duration-300 hover:opacity-100">
                    {`Credits: ${subject.credits}`}
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <button
            onClick={goToGradeEntryPage}
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition-transform duration-300 transform hover:scale-105"
          >
            Proceed to Grade Entry
          </button>
        </div>
      </div>
    </>
  );
};

export default CGPACalculator;
