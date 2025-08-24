import React, { useState } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const DeleteBook = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  const handleDeleteBook = () => {
    setLoading(true);
    axios
      .delete(`http://localhost:5555/books/${id}`)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('✅ Book deleted successfully!', { variant: 'success' });
        navigate('/');
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar('❌ Error deleting book!', { variant: 'error' });
        console.log(error);
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-gray-100 p-6">
      <BackButton />
      <h1 className="text-4xl font-bold text-center my-10 bg-gradient-to-r from-red-400 to-pink-500 bg-clip-text text-transparent">
        Delete Book
      </h1>

      {loading ? (
        <div className="flex justify-center items-center h-40">
          <Spinner />
        </div>
      ) : (
        <div className="flex flex-col items-center bg-gray-900/70 backdrop-blur-md rounded-2xl shadow-2xl w-full max-w-xl p-10 mx-auto border border-gray-700">
          <h3 className="text-2xl font-semibold mb-6 text-center">
            Are you sure you want to <span className="text-red-400">delete</span> this book?
          </h3>

          <div className="flex gap-6 w-full">
            <button
              className="flex-1 py-3 rounded-xl bg-gradient-to-r from-red-600 to-pink-600 text-white font-bold shadow-lg hover:scale-105 transition-transform"
              onClick={handleDeleteBook}
            >
              Yes, Delete it
            </button>
            <button
              className="flex-1 py-3 rounded-xl bg-gray-700 text-gray-200 font-semibold shadow-lg hover:bg-gray-600 hover:scale-105 transition-transform"
              onClick={() => navigate('/')}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeleteBook;
