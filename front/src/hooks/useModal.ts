import { useState } from "react";

interface ModalState<T> {
  isOpen: boolean;
  openModal: (data?: T) => void;
  closeModal: () => void;
  getData: () => T | undefined;
}

const useModal = <T = any >(): ModalState<T> => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalData, setModalData]=useState<T | undefined> (undefined);
  

  const openModal = (data?: T): void => {
    setModalData(data);
    setIsOpen(true);
  };

  const closeModal = (): void => {
    console.log("Cerrando Modal");
    setModalData(undefined);
    setIsOpen(false);
  };


  const getData = () : T | undefined => {
    return modalData;
  }

  return {
    isOpen,
    openModal,
    closeModal,
    getData
  }
};

export default useModal;