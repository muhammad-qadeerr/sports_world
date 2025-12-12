import axios from "axios";
import type { IAthlete } from "../interfaces/Athlete";

const endpoint = "https://localhost:7096/api/Athlete";

const getAll = async (): Promise<{ success: boolean; data: IAthlete[] | null }> => {
  try {
    const r = await axios.get(endpoint, {
      headers: {
        'accept': 'text/plain'
      }
    });
    return { success: true, data: r.data };
  } catch (error) {
    console.error('Error fetching athletes:', error);
    return { success: false, data: null };
  }
};

const getById = async (id: number) => {
  try {
    const r = await axios.get(`${endpoint}/${id}`);
    return { success: true, data: r.data as IAthlete };
  } catch {
    return { success: false, data: null };
  }
};

const post = async (formData: FormData) => {
  try {
    const r = await axios.post(endpoint, formData, {
      headers: {
        'accept': 'text/plain'
        // Content-Type will be set automatically by axios for FormData
      }
    });
    return { success: true, data: r.data as IAthlete };
  } catch (error: any) {
    console.error('Error creating athlete:', error);
    let errorMessage = 'Error saving athlete';
    
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

const put = async (id: number, athlete: IAthlete) => {
  try {
    await axios.put(`${endpoint}/${id}`, athlete, {
      headers: {
        'accept': 'text/plain',
        'Content-Type': 'application/json'
      }
    });
    return { success: true };
  } catch (error) {
    console.error('Error updating athlete:', error);
    return { success: false };
  }
};

const remove = async (id: number) => {
  try {
    await axios.delete(`${endpoint}/${id}`, {
      headers: {
        'accept': 'text/plain'
      }
    });
    return { success: true };
  } catch (error) {
    console.error('Error deleting athlete:', error);
    return { success: false };
  }
};

const search = async (name: string): Promise<{ success: boolean; data: IAthlete[] | null }> => {
  try {
    const r = await axios.get(`${endpoint}/search`, {
      params: {
        name: name
      },
      headers: {
        'accept': 'text/plain'
      }
    });
    return { success: true, data: r.data };
  } catch (error) {
    console.error('Error searching athletes:', error);
    return { success: false, data: null };
  }
};

const purchase = async (id: number): Promise<{ success: boolean; data?: IAthlete; error?: string }> => {
  try {
    const r = await axios.post(`${endpoint}/${id}/purchase`, {}, {
      headers: {
        'accept': 'text/plain'
      }
    });
    return { success: true, data: r.data as IAthlete };
  } catch (error: any) {
    console.error('Error purchasing athlete:', error);
    let errorMessage = 'Purchase failed';
    
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
    
    return { success: false, error: errorMessage };
  }
};

export default { getAll, getById, post, put, remove, search, purchase };