import { Link } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";

const BackButton = ({ destination = "/" }) => {
  return (
    <div className="flex">
      <Link
        to={destination}
        className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-sky-400 px-4 py-2 rounded-xl shadow-lg border border-gray-700 transition-all duration-200"
      >
        <BsArrowLeft className="text-2xl" />
        <span className="hidden sm:block font-medium">Back</span>
      </Link>
    </div>
  );
};

export default BackButton;
