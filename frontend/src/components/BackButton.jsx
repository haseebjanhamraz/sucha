import { useNavigate } from "react-router-dom";
import { FaArrowCircleLeft } from "react-icons/fa";
const BackButton = () => {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate(`/cows/`);
  };
  return (
    <div>
      <FaArrowCircleLeft
        className="text-2xl cursor-pointer"
        onClick={handleBack}
      />
    </div>
  );
};

export default BackButton;
