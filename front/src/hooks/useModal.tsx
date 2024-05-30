import { useAppDispatch, useAppSelector } from "@/hooks";
import { URL_HOST_DEV, URL_HOST_PROD } from "@/lib/utils";
import {
  addEndpointAction,
  endpointModal,
  isCloseAction,
  isDataInputsAction,
  isOpenAction,
  isOpenData,
  isOpenModal,
  reducerNameAction,
  reducerNameModal,
} from "@/Slices/Modal/ModalSlice";
import { store } from "@/store";
import axios from "axios";

export interface ModalState<T> {
  isOpen: boolean;
  openModal?: (data: T, key: string, reducerName: string) => void;
  closeModal?: () => void;
  isDataInputs: T | null;
  dataImput: (data: { [key: string]: any } | null) => Promise<any>;
}

const useModal = (): ModalState<any> => {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector(isOpenModal);
  const isDataInputs = useAppSelector(isOpenData);
  const endpoint = useAppSelector(endpointModal);
  const reducerName = useAppSelector(reducerNameModal);

  const openModal = (data: [], key: string, reducerName: string) => {
    dispatch(isDataInputsAction(data));
    dispatch(isOpenAction(true));
    dispatch(addEndpointAction(key));
    dispatch(reducerNameAction(reducerName));
  };
  const closeModal = () => {
    dispatch(isCloseAction(false));
  };

  const dataImput = async (
    data: { [key: string]: any } | null
  ): Promise<any> => {

    const formData = new FormData();
    formData.append("archivo", data?.Imagen);
    //* Insert Image
    const image = await axios.post(`${URL_HOST_PROD}/api/v1/Image/add`, formData);
    const res = await axios.post(`${URL_HOST_PROD}${endpoint}`, {
      ...data,
      image: image.data.image_id,
    });
    store.dispatch({
      type: `${reducerName}/refresh`,
      payload: res.data,
    });
    return res;
  };

  return {
    isOpen,
    closeModal,
    openModal,
    isDataInputs,
    dataImput,
  };
};

export default useModal;
