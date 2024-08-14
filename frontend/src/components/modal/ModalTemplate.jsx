import React from "react";

const ModalTemplate = ({ modalText, onConfirm, onClose, modalIsOpen }) => {
  if (!modalIsOpen) return null;

  return (
    <>
      <div
        className="fixed top-0 left-0 w-full h-full z-50 bg-black opacity-50 transition duration-300 ease-in-out"
        onClick={onClose}
      />
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg z-50">
        <h3 className="text-2xl">{modalText}</h3>
        <div className="flex justify-end mt-4">
          <button
            className="bg-red-500 text-white p-2 ml-4 rounded-lg"
            onClick={onConfirm}
          >
            Confirm
          </button>
          <button
            className="bg-gray-300 text-gray-800 p-2 ml-4 rounded-lg"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </>
  );
};

export default ModalTemplate;
