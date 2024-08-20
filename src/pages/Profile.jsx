import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const [formData, setFormData] = useState({
    email: '',
    fullName: '',
    department: '',
    section: '',
    rollNumber: '',
    registrationNumber: '',
    cgpa: '',
    year: '',
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:8080/api/profile', {
          headers: { Authorization: `Bearer ${token}` },
          params: { email: localStorage.getItem('userEmail') },
        });
        setUser(response.data);
        setFormData({
          email: response.data.email,
          fullName: response.data.fullName,
          department: response.data.department,
          section: response.data.section,
          rollNumber: response.data.rollNumber,
          registrationNumber: response.data.registrationNumber,
          cgpa: response.data.cgpa,
          year: response.data.year,
        });
        setProfileImage(response.data.profileImage);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchProfile();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleImageChange = (e) => {
    setProfileImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:8080/api/update-profile', formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const handleImageUpload = async () => {
    if (!user || !user.id) {
      console.error('User information is not available.');
      return;
    }

    if (profileImage) {
      const imageFormData = new FormData();
      imageFormData.append('image', profileImage);
      try {
        const token = localStorage.getItem('token');
        await axios.post(`http://localhost:8080/api/upload-image/${user.id}`, imageFormData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        });
        alert('Profile image updated successfully!');
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }
  };

  return (
    <div className="bg-gradient-to-r from-indigo-100 via-purple-200 to-pink-300 min-h-screen">
      <Navbar />
      <div className="container mx-auto p-8">
        <h1 className="text-3xl font-extrabold text-gray-800 mb-6 animate__animated animate__fadeIn">
          Update Profile
        </h1>
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 hover:shadow-2xl transition-shadow duration-300 ease-in-out">
          <div className="mb-4">
            <label className="block text-gray-700 text-lg font-medium">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg mt-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-lg font-medium">Department</label>
            <input
              type="text"
              name="department"
              value={formData.department}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg mt-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-lg font-medium">Section</label>
            <input
              type="text"
              name="section"
              value={formData.section}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg mt-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-lg font-medium">Roll Number</label>
            <input
              type="text"
              name="rollNumber"
              value={formData.rollNumber}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg mt-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-lg font-medium">Registration Number</label>
            <input
              type="text"
              name="registrationNumber"
              value={formData.registrationNumber}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg mt-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-lg font-medium">CGPA</label>
            <input
              type="number"
              name="cgpa"
              value={formData.cgpa}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg mt-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
              step="0.01"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-lg font-medium">Year</label>
            <input
              type="text"
              name="year"
              value={formData.year}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg mt-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition duration-300 ease-in-out"
          >
            Update Profile
          </button>
        </form>
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4 animate__animated animate__fadeIn">
            Upload Profile Image
          </h2>
          <input
            type="file"
            onChange={handleImageChange}
            className="mb-4 p-2 border border-gray-300 rounded-lg bg-white shadow-sm"
          />
          <button
            onClick={handleImageUpload}
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition duration-300 ease-in-out"
          >
            Upload Image
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
