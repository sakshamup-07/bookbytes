import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";

const ShowBook = () => {
  const [book, setBook] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/books/${id}`)
      .then((res) => {
        setBook(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [id]);

  // 👇 my themed return stays inside this function
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-200 p-6">
      <BackButton />
      <h1 className="text-3xl font-bold text-sky-400 mb-6">📖 Show Book</h1>

      {loading ? (
        <Spinner />
      ) : (
        <div className="flex flex-col border border-gray-700 bg-gray-900/80 backdrop-blur-md rounded-2xl w-full max-w-2xl p-6 shadow-xl">
          <div className="my-4">
            <span className="text-xl font-semibold text-gray-400 mr-4">Id:</span>
            <span>{book._id}</span>
          </div>
          <div className="my-4">
            <span className="text-xl font-semibold text-gray-400 mr-4">Title:</span>
            <span className="text-sky-300">{book.title}</span>
          </div>
          <div className="my-4">
            <span className="text-xl font-semibold text-gray-400 mr-4">Author:</span>
            <span>{book.author}</span>
          </div>
          <div className="my-4">
            <span className="text-xl font-semibold text-gray-400 mr-4">Publish Year:</span>
            <span>{book.publishYear}</span>
          </div>
          <div className="my-4">
            <span className="text-xl font-semibold text-gray-400 mr-4">Create Time:</span>
            <span>{new Date(book.createdAt).toLocaleString()}</span>
          </div>
          <div className="my-4">
            <span className="text-xl font-semibold text-gray-400 mr-4">Last Update Time:</span>
            <span>{new Date(book.updatedAt).toLocaleString()}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowBook;
