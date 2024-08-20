import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import axios from 'axios';
import Navbar from '../components/Navbar';

const GradeEntry = () => {
  const location = useLocation();
  const { subjects } = location.state || { subjects: [] };

  const [studentData, setStudentData] = useState(null);
  const [grades, setGrades] = useState({});
  const [selectedDate, setSelectedDate] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cgpa, setCgpa] = useState(0);
  const [gpaOutOf10, setGpaOutOf10] = useState(0);

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const token = localStorage.getItem('token');
        const email = localStorage.getItem('userEmail');
        const response = await axios.get(`http://localhost:8080/api/profile?email=${email}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setStudentData(response.data);
      } catch (err) {
        setError('Failed to fetch student data.');
        console.error('Error fetching student data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchStudentData();
  }, []);

  useEffect(() => {
    const calculateCGPA = () => {
      let totalCredits = 0;
      let totalGradePoints = 0;
      let totalExtraCredits = 0;

      subjects.forEach((subject) => {
        const credits = subject.credits;
        const grade = grades[subject.name] || 'U';
        const gradePoints = calculateGradePoints(grade);
        totalCredits += credits;
        totalGradePoints += credits * gradePoints;
       
      });

      const cgpaValue = totalCredits > 0 ? (totalGradePoints + totalExtraCredits) / totalCredits : 0;
      const gpaValueOutOf4 = (cgpaValue / 10) * 4;
      setCgpa(gpaValueOutOf4.toFixed(2));

      setGpaOutOf10(cgpaValue.toFixed(2));
    };

    calculateCGPA();
  }, [grades, subjects]);

  const handleGradeChange = (subjectName, grade) => {
    setGrades((prevGrades) => ({
      ...prevGrades,
      [subjectName]: grade,
    }));
  };

  const calculateGradePoints = (grade) => {
    const gradePointsMap = {
      O: 10,
      'A+': 9,
      A: 8,
      'B+': 7,
      B: 6,
      C: 5,
      U: 0,
    };

    return gradePointsMap[grade] || 0;
  };

  const downloadPDF = () => {
    if (!studentData) {
      console.error('No student data available.');
      alert('Student data is missing, unable to generate PDF.');
      return;
    }

    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text('CGPA Report', 14, 16);

    doc.setFontSize(12);
    const info = [
      `Name: ${studentData.fullName}`,
      `Department: ${studentData.department}`,
      `Year: ${studentData.year}`,
      `Section: ${studentData.section}`,
      `Roll Number: ${studentData.rollNumber}`,
      `Registration Number: ${studentData.registrationNumber}`,
      `Current CGPA: ${studentData.cgpa}`,
      `Date: ${selectedDate}`,
    ];

    let yPosition = 22;
    info.forEach((line) => {
      doc.text(line, 14, yPosition);
      yPosition += 8;
    });

    if (studentData.profileImage) {
      const img = new Image();
      img.crossOrigin = 'Anonymous';
      img.src = `data:image/jpeg;base64,${studentData.profileImage}`;

      img.onload = () => {
        doc.addImage(img, 'JPEG', 160, 16, 40, 40);
        finalizePDF(doc, yPosition);
      };

      img.onerror = () => {
        console.error('Error loading image.');
        finalizePDF(doc, yPosition);
      };
    } else {
      finalizePDF(doc, yPosition);
    }
  };

  const finalizePDF = (doc, yPosition) => {
    // Generate the table data with obtained credits
    const tableData = subjects.map((subject) => {
      const grade = grades[subject.name] || 'N/A';
      const obtainedCredits = grade === 'U' ? (0.32 * subject.credits).toFixed(2) : '0.00';
      return [subject.name, subject.credits, grade, obtainedCredits];
    });

    doc.autoTable({
      head: [['Subject', 'Credits', 'Grade', 'Obtained Credits']],
      body: tableData,
      startY: yPosition + 10,
      theme: 'striped',
      styles: {
        cellPadding: 5,
        fontSize: 10,
        textColor: [0, 0, 0],
        lineWidth: 0.1,
        lineColor: [0, 0, 0],
      },
      margin: { left: 14, right: 14 },
      columnStyles: {
        0: { cellWidth: 70, fontStyle: 'bold' },
        1: { cellWidth: 30, fontStyle: 'bold' },
        2: { cellWidth: 40, fontStyle: 'bold' },
        3: { cellWidth: 40, fontStyle: 'bold' },
      },
      didDrawCell: (data) => {
        if (data.column.index === 0) {
          doc.rect(data.cell.x, data.cell.y, data.cell.width, data.cell.height);
        }
      },
    });

    // Position for CGPA and GPA
    yPosition = doc.lastAutoTable.finalY + 10;
    doc.setFontSize(12);
    doc.text(`CGPA: ${cgpa} (4-point scale)`, 14, yPosition);
    doc.text(`GPA: ${gpaOutOf10} (10-point scale)`, 14, yPosition + 10);

    // Save the PDF
    doc.save('cgpa_report.pdf');
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <Navbar />
      <div className="max-w-lg mx-auto p-4 bg-white shadow-lg rounded-lg">
        <h1 className="text-2xl font-bold mb-4">Enter Grades</h1>

        <div className="mb-4">
          <label className="font-semibold">Select Date:</label>
          <select
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="mt-2 w-full bg-gray-100 border border-gray-300 rounded-lg p-2"
          >
            <option value="">Select Date</option>
            <option value="2024-08-20">2024-08-20</option>
            <option value="2024-08-21">2024-08-21</option>
            <option value="2024-08-22">2024-08-22</option>
          </select>
        </div>

        <div className="mb-4">
          <h2 className="text-xl font-semibold mb-2">Subjects & Grades</h2>
          <ul className="space-y-2">
            {subjects.map((subject, index) => (
              <li
                key={index}
                className={`p-4 bg-gray-50 rounded-lg shadow-md transition duration-300 ${
                  grades[subject.name] === 'U' ? 'bg-red-400' : ''
                }`}
              >
                <div className="flex justify-between">
                  <span className="font-medium">{subject.name}</span>
                  <span className="text-blue-600 font-bold">{subject.credits} Credits</span>
                </div>
                <input
                  type="text"
                  placeholder="Enter grade"
                  onChange={(e) => handleGradeChange(subject.name, e.target.value)}
                  className="mt-2 w-full bg-gray-100 border border-gray-300 rounded-lg p-2"
                />
              </li>
            ))}
          </ul>
        </div>

        <button
          onClick={downloadPDF}
          className="mt-4 block w-full bg-green-500 text-white font-bold p-2 rounded-lg transition duration-300 hover:bg-green-600"
        >
          Download CGPA Report
        </button>

        <div className="mt-4">
          <h2 className="text-xl font-semibold mb-2">CGPA</h2>
          <div className="p-4 bg-gray-50 rounded-lg shadow-md">
            <span className="font-bold text-blue-600">{cgpa} (4-point scale)</span>
            <br />
            <span className="font-bold text-blue-600">{gpaOutOf10} (10-point scale)</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default GradeEntry;
