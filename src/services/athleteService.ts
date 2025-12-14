import apiClient from "./api";
import { extractErrorMessage } from "../utils/errorHandler";
import type { IAthlete } from "../interfaces/Athlete";

const endpoint = "/Athlete";

const getAll = async (): Promise<{ success: boolean; data: IAthlete[] | null }> => {
  try {
    const response = await apiClient.get(endpoint);
    return { success: true, data: response.data };
  } catch (error) {
    console.error("Error fetching athletes:", error);
    return { success: false, data: null };
  }
};

const getById = async (id: number) => {
  try {
    const response = await apiClient.get(`${endpoint}/${id}`);
    return { success: true, data: response.data as IAthlete };
  } catch (error) {
    console.error("Error fetching athlete by id:", error);
    return { success: false, data: null };
  }
};

const post = async (formData: FormData) => {
  try {
    const response = await apiClient.post(endpoint, formData);
    return { success: true, data: response.data as IAthlete };
  } catch (error: any) {
    console.error("Error creating athlete:", error);
    const errorMessage = extractErrorMessage(error) || "Error saving athlete";
    return { success: false, data: null, error: errorMessage };
  }
};

const put = async (id: number, formData: FormData) => {
  try {
    const response = await apiClient.put(`${endpoint}/${id}`, formData);
    return { success: true, data: response.data as IAthlete };
  } catch (error: any) {
    console.error("Error updating athlete:", error);
    const errorMessage = extractErrorMessage(error);
    return { success: false, error: errorMessage };
  }
};

const remove = async (id: number) => {
  try {
    await apiClient.delete(`${endpoint}/${id}`);
    return { success: true };
  } catch (error) {
    console.error("Error deleting athlete:", error);
    return { success: false };
  }
};

const search = async (name: string): Promise<{ success: boolean; data: IAthlete[] | null }> => {
  try {
    const response = await apiClient.get(`${endpoint}/search`, {
      params: { name },
    });
    return { success: true, data: response.data };
  } catch (error) {
    console.error("Error searching athletes:", error);
    return { success: false, data: null };
  }
};

const purchase = async (id: number): Promise<{ success: boolean; data?: IAthlete; error?: string }> => {
  try {
    const response = await apiClient.post(`${endpoint}/${id}/purchase`, {});
    return { success: true, data: response.data as IAthlete };
  } catch (error: any) {
    console.error("Error purchasing athlete:", error);
    const errorMessage = extractErrorMessage(error) || "Purchase failed";
    return { success: false, error: errorMessage };
  }
};

export default { getAll, getById, post, put, remove, search, purchase };