import React, { ChangeEvent, useState } from "react";
import { DataModal } from "./types";
import  useModal from "../../hooks/useModal";




interface ModalProps{
  data: DataModal[]
}

const Modal: React.FC<ModalProps> = ({data}) => {
  const [modalData, setModalData] = useState({});
  const [errorsModal, setErrorsModal] = useState({});
const {isOpen, openModal, closeModal, getData} = useModal<any>();
  

  const handleInputchange = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setModalData({
      ...modalData,
      [name]: value,
    });
    setErrorsModal({
      ...errorsModal,
      [name] : value
    });
    console.log("ema", errorsModal);
  };



 

  return (
    <div className="z-10 bg-black/30 absolute h-full w-full flex items-center justify-center">
      <button className="bg-blue-500 text-white px-4 py-2 rounded w-24" onClick={openModal}>Abrir Modal</button>
      {isOpen && ( 
        <div className="h-auto w-auto bg-white flex items-center gap-10 flex-col p-3 overflow-hidden">
          {data.map((modal, index) => (
            <div key={index}>
              <div>
                <p>{modal.title}</p>
                <hr className="bg-black h-1 size-2 w-full" />
              </div>
              <div className="items-center flex flex-col">
                {modal.inputs.map((input, idx) => (
                  <div key={idx} className="mb-2">
                    <label className="block mb-1" htmlFor={input.name}>
                      {input.placeholder}
                    </label>
                    <input
                      type={input.type}
                      name={input.name}
                      placeholder={input.placeholder}
                      className="border p-2 w-full"
                      onChange={handleInputchange}
                    />
                  </div>
                ))}
              </div>
              <hr className="bg-black h-1 size-2 w-full" />
              <div className="w-full flex justify-between">
                <button className="bg-gray-500 text-white px-4 py-2 rounded w-24" onClick={closeModal}>Cancelar</button>
                <button className="bg-blue-500 text-white px-4 py-2 rounded w-24">{modal.footer}</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Modal;
