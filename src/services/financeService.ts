import apiClient from "./api";
import { extractErrorMessage } from "../utils/errorHandler";
import type { IFinance } from "../interfaces/Finance";

const endpoint = "/Finance";

const getFinance = async () => {
  try {
    const response = await apiClient.get(endpoint);
    return { success: true, data: response.data as IFinance };
  } catch (error) {
    console.error("Error fetching finance:", error);
    return { success: false, data: null };
  }
};

const requestLoan = async (amount: number) => {
  try {
    const response = await apiClient.post(`${endpoint}/loan`, amount, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return { success: true, data: response.data as IFinance };
  } catch (error: any) {
    console.error("Error requesting loan:", error);
    const errorMessage = extractErrorMessage(error) || "Loan request failed";
    return { success: false, data: null, error: errorMessage };
  }
};

export default { getFinance, requestLoan };