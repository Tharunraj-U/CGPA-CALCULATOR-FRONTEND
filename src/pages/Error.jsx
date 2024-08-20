import React from 'react';

const Error = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-red-100 p-6">
      <div className="bg-white p-8 rounded-lg shadow-lg w-4/5 max-w-md text-center">
        <h1 className="text-4xl font-bold text-red-500 mb-4">Error 404</h1>
        <p className="text-lg mb-4">
          Oops! The page you're looking for doesn't exist.
        </p>
        <p className="text-lg">
          It might have been moved or deleted. Please check the URL or return to the <a href="/home" className="text-blue-500 hover:underline">Home</a> page.
        </p>
      </div>
    </div>
  );
};

export default Error;
