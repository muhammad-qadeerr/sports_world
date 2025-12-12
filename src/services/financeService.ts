import axios from "axios";
import type { IFinance } from "../interfaces/Finance";

const endpoint = "https://localhost:7096/api/Finance";

const getFinance = async () => {
  try {
    const r = await axios.get(endpoint, {
      headers: {
        'accept': 'text/plain'
      }
    });
    return { success: true, data: r.data as IFinance };
  } catch (error) {
    console.error('Error fetching finance:', error);
    return { success: false, data: null };
  }
};

const requestLoan = async (amount: number) => {
  try {
    const r = await axios.post(`${endpoint}/loan`, amount, {
      headers: {
        'accept': 'text/plain',
        'Content-Type': 'application/json'
      }
    });
    return { success: true, data: r.data as IFinance };
  } catch (error: any) {
    console.error('Error requesting loan:', error);
    let errorMessage = 'Loan request failed';
    
    if (error.response) {
      // Server responded with error status
      if (error.response.data) {
        // Try to extract error message from response
        if (typeof error.response.data === 'string') {
          errorMessage = error.response.data;
        } else if (error.response.data.message) {
          errorMessage = error.response.data.message;
        } else if (error.response.data.error) {
          errorMessage = error.response.data.error;
        } else if (error.response.data.title) {
          errorMessage = error.response.data.title;
        }
      }
    } else if (error.message) {
      errorMessage = error.message;
    }
    
    return { success: false, data: null, error: errorMessage };
  }
};

export default { getFinance, requestLoan };