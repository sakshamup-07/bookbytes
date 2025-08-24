import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import { MdOutlineAddBox } from 'react-icons/md';
import BooksTable from '../components/home/BooksTable';
import BooksCard from '../components/home/BooksCard';

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showType, setShowType] = useState('table');

  useEffect(() => {
    setLoading(true);
    axios
      .get('http://localhost:5555/books')
      .then((response) => {
        setBooks(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-gray-100 p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-sky-400 to-purple-400 bg-clip-text text-transparent">
          📚 Bookstore Dashboard
        </h1>
        <Link
          to="/books/create"
          className="flex items-center gap-2 bg-gradient-to-r from-sky-500 to-purple-600 text-white px-5 py-2.5 rounded-xl shadow-lg hover:scale-105 transition-transform"
        >
          <MdOutlineAddBox className="text-2xl" />
          <span className="font-medium">Add New Book</span>
        </Link>
      </div>

      {/* Toggle Buttons */}
      <div className="flex justify-center gap-6 mb-10">
        <button
          className={`px-6 py-2 rounded-lg font-semibold shadow-md transition-all duration-300 ${
            showType === 'table'
              ? 'bg-sky-600 text-white scale-105'
              : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
          }`}
          onClick={() => setShowType('table')}
        >
          Table View
        </button>
        <button
          className={`px-6 py-2 rounded-lg font-semibold shadow-md transition-all duration-300 ${
            showType === 'card'
              ? 'bg-sky-600 text-white scale-105'
              : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
          }`}
          onClick={() => setShowType('card')}
        >
          Card View
        </button>
      </div>

      {/* Content */}
      <div className="bg-gray-900/70 backdrop-blur-md rounded-2xl shadow-2xl p-6 border border-gray-700">
        {loading ? (
          <div className="flex justify-center items-center h-60">
            <Spinner />
          </div>
        ) : showType === 'table' ? (
          <BooksTable books={books} />
        ) : (
          <BooksCard books={books} />
        )}
      </div>

      {/* Footer */}
      <div className="mt-12 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} Bookstore Inc. · Crafted with ❤️ by Saksham
      </div>
    </div>
  );
};

export default Home;
