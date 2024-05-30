import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import useModal from "@/hooks/useModal";
import { DataModal, ErrorModal } from "./types";
import { toast } from "react-toastify";

const Modal: React.FC = () => {
  const [modalData, setModalData] = useState<any>({});
  const [errorsModal, setErrorsModal] = useState<ErrorModal | null>(null);
  const { isOpen, closeModal, isDataInputs, dataImput } = useModal();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const name = e.target.name;
    const file = e.target.files && e.target.files[0]

    if (name === 'Imagen' && file) {
      const formData = new FormData();
      formData.append('archivo', file);
      setModalData((prevData: any) => ({
          ...prevData,
          [name]: formData,
      }));
  } else {
      setModalData((prevData: any) => ({
          ...prevData,
          [name]: value,
      }));
  }
    setErrorsModal({
      ...errorsModal,
      [name]: value,
    });
  };


  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    for (const key in errorsModal) {
      if (!errorsModal[key]) {
        toast.warning("Favor Rellenar todos los campos Obligatorios");
        return;
      }
    }
    

    //*  InserData to Back
    dataImput(modalData)
      .then((res) => {
        res.status === 201 && toast.success("Se agrego Correctamente");
      })
      .catch((err) => {
        return toast.error(err);
      });

    //** Clean Data Modal and Errors
    setModalData({});
    setErrorsModal({});

    //** Exit Modal
    closeModal && closeModal();
  };

  useEffect(() => {
    const errorObj = isDataInputs[0]?.inputs?.reduce((acc: any, obj: any) => {
      if (!acc[obj.name]) {
        acc[obj.name] = "";
      }
      return acc;
    }, {});

    setErrorsModal(errorObj);
  }, [isDataInputs]);

  return (
    isOpen && (
      <div className="z-10 bg-black/30 absolute h-full w-full flex items-center justify-center">
        (
        <div className="h-auto w-auto bg-white flex items-center gap-10 flex-col p-3 overflow-hidden">
          {isDataInputs?.map((modal: DataModal, index: number) => (
            <form key={index} onSubmit={handleSubmit}>
              <div>
                <p>{modal.title}</p>
                <hr className="bg-black h-1 size-2 w-full" />
              </div>
              <div className="items-center flex flex-col">
                {modal.inputs.map((input, idx) => (
                  <div key={idx} className="mb-2">
                    <label className="flex mb-1" htmlFor={input.name}>
                      {input.placeholder}
                      {input.validate && (
                        <p className="text-red-500 text-xl">*</p>
                      )}
                    </label>

                    <input
                      type={input.type}
                      name={input.name}
                      placeholder={input.placeholder}
                      className="border p-2 w-full"
                      onChange={handleInputChange}
                    />
                  </div>
                ))}
              </div>
              <hr className="bg-black h-1 size-2 w-full" />
              <div className="w-full flex justify-between">
                <button
                  className="bg-gray-500 text-white px-4 py-2 rounded w-24"
                  onClick={closeModal}
                >
                  Cancelar
                </button>
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded w-24"
                  type="submit"
                >
                  {modal.footer}
                </button>
              </div>
            </form>
          ))}
        </div>
        )
      </div>
    )
  );
};

export default Modal;
