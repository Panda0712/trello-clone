import axios from "axios";
import { API_ROOT } from "~/utils/constants";

// Boards
// export const fetchBoardDetailsAPI = async (boardId) => {
//   const res = await axios.get(`${API_ROOT}/v1/boards/${boardId}`);

//   return res.data;
// };

// update board details
export const updateBoardDetailsAPI = async (boardId, updatedData) => {
  const res = await axios.put(`${API_ROOT}/v1/boards/${boardId}`, updatedData);

  return res.data;
};

// move cards to different columns
export const moveCardToDifferentColumnsAPI = async (updatedData) => {
  const res = await axios.put(
    `${API_ROOT}/v1/boards/supports/moving_card`,
    updatedData
  );

  return res.data;
};

// Columns
export const createNewColumnAPI = async (newColumnData) => {
  const res = await axios.post(`${API_ROOT}/v1/columns`, newColumnData);
  return res.data;
};

// update column details
export const updateColumnDetailsAPI = async (columnId, updatedData) => {
  const res = await axios.put(
    `${API_ROOT}/v1/columns/${columnId}`,
    updatedData
  );

  return res.data;
};

// delete columns
export const deleteColumnDetailsAPI = async (columnId) => {
  const res = await axios.delete(`${API_ROOT}/v1/columns/${columnId}`);

  return res.data;
};

// Cards
export const createNewCardAPI = async (newCardData) => {
  const res = await axios.post(`${API_ROOT}/v1/cards`, newCardData);
  return res.data;
};
