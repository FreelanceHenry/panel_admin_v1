import { BankApiRequest, BankResponse } from "@/components/orders/types";
import axios from "axios";

export const useApiGerneric = async (
  url: string,
  data: BankApiRequest
): Promise<BankResponse> => {
  const api = await axios.post(url, data);
  return {
    message: api.data.message ,
    code: api.data.code
  };
};

