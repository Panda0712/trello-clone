import axios from "axios";
import { API_ROOT } from "~/utils/constants";

// Boards
export const fetchBoardDetailsAPI = async (boardId) => {
  const res = await axios.get(`${API_ROOT}/v1/boards/${boardId}`);

  return res.data;
};

// Columns
export const createNewColumnAPI = async (newColumnData) => {
  const res = await axios.post(`${API_ROOT}/v1/columns`, newColumnData);
  return res.data;
};

// Cards
export const createNewCardAPI = async (newCardData) => {
  const res = await axios.post(`${API_ROOT}/v1/cards`, newCardData);
  return res.data;
};
