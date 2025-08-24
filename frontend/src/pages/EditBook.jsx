import React, { useState, useEffect } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const EditBook = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publishYear, setPublishYear] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/books/${id}`)
      .then((response) => {
        setAuthor(response.data.author);
        setPublishYear(response.data.publishYear);
        setTitle(response.data.title);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar('❌ Error fetching book details!', { variant: 'error' });
        console.log(error);
      });
  }, [id]);

  const handleEditBook = () => {
    const data = { title, author, publishYear };
    setLoading(true);
    axios
      .put(`http://localhost:5555/books/${id}`, data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('✅ Book updated successfully!', { variant: 'success' });
        navigate('/');
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar('❌ Error updating book!', { variant: 'error' });
        console.log(error);
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-gray-100 p-6">
      <BackButton />
      <h1 className="text-4xl font-bold text-center my-10 bg-gradient-to-r from-sky-400 to-purple-400 bg-clip-text text-transparent">
        Edit Book
      </h1>

      {loading ? (
        <div className="flex justify-center items-center h-40">
          <Spinner />
        </div>
      ) : (
        <div className="bg-gray-900/70 backdrop-blur-md rounded-2xl shadow-2xl w-full max-w-2xl p-10 mx-auto border border-gray-700">
          {/* Title */}
          <div className="mb-6">
            <label className="block text-lg font-semibold mb-2 text-gray-300">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter book title"
              className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-600 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
          </div>

          {/* Author */}
          <div className="mb-6">
            <label className="block text-lg font-semibold mb-2 text-gray-300">Author</label>
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="Enter author name"
              className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-600 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
          </div>

          {/* Publish Year */}
          <div className="mb-6">
            <label className="block text-lg font-semibold mb-2 text-gray-300">Publish Year</label>
            <input
              type="number"
              value={publishYear}
              onChange={(e) => setPublishYear(e.target.value)}
              placeholder="2025"
              className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-600 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-4 mt-8">
            <button
              className="px-6 py-3 rounded-lg bg-gray-700 text-gray-200 font-semibold shadow-lg hover:bg-gray-600 hover:scale-105 transition-transform"
              onClick={() => navigate('/')}
            >
              Cancel
            </button>
            <button
              className="px-6 py-3 rounded-lg bg-gradient-to-r from-sky-500 to-purple-600 text-white font-bold shadow-lg hover:scale-105 transition-transform"
              onClick={handleEditBook}
            >
              Save Changes
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditBook;
