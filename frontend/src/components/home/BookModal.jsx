import { AiOutlineClose } from "react-icons/ai";
import { PiBookOpenTextLight } from "react-icons/pi";
import { BiUserCircle } from "react-icons/bi";

const BookModal = ({ book, onClose }) => {
  return (
    <div
      className="fixed bg-black bg-opacity-70 backdrop-blur-sm top-0 left-0 right-0 bottom-0 z-50 flex justify-center items-center"
      onClick={onClose}
    >
      <div
        onClick={(event) => event.stopPropagation()}
        className="w-[600px] max-w-full h-[450px] bg-gray-900/90 border border-gray-700 rounded-2xl p-6 flex flex-col relative shadow-2xl text-gray-200"
      >
        {/* Close button */}
        <AiOutlineClose
          className="absolute right-6 top-6 text-2xl text-red-400 hover:text-red-500 cursor-pointer transition"
          onClick={onClose}
        />

        {/* Year Badge */}
        <h2 className="w-fit px-4 py-1 bg-gradient-to-r from-red-400 to-pink-500 rounded-lg text-white font-semibold shadow-md">
          {book.publishYear}
        </h2>

        {/* Book ID */}
        <h4 className="my-2 text-sm text-gray-400">ID: {book._id}</h4>

        {/* Title */}
        <div className="flex items-center gap-x-2 mt-2">
          <PiBookOpenTextLight className="text-sky-400 text-2xl" />
          <h2 className="text-lg font-bold text-sky-300">{book.title}</h2>
        </div>

        {/* Author */}
        <div className="flex items-center gap-x-2 mt-2">
          <BiUserCircle className="text-purple-400 text-2xl" />
          <h2 className="text-lg font-medium">{book.author}</h2>
        </div>

        {/* Divider */}
        <div className="my-4 border-t border-gray-700"></div>

        {/* Custom content */}
        <p className="text-gray-300">
          Anything you want to show here…
        </p>
        <p className="my-3 text-sm text-gray-400 leading-relaxed">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni quia
          voluptatum sint. Nisi impedit libero eveniet cum vitae qui expedita
          necessitatibus assumenda laboriosam, facilis iste cumque a pariatur
          nesciunt cupiditate voluptas? Quis atque earum voluptate dolor nisi
          dolorum est? Deserunt placeat cumque quo dicta architecto, dolore
          vitae voluptate sequi repellat!
        </p>
      </div>
    </div>
  );
};

export default BookModal;
