import { toast } from "react-toastify";
import authorizedAxiosInstance from "~/utils/authorizeAxios";
import { API_ROOT } from "~/utils/constants";

// Boards
export const fetchBoardsAPI = async (searchPath) => {
  const res = await authorizedAxiosInstance.get(
    `${API_ROOT}/v1/boards${searchPath}`
  );

  return res.data;
};

// create new board
export const createNewBoardAPI = async (data) => {
  const res = await authorizedAxiosInstance.post(`${API_ROOT}/v1/boards`, data);
  toast.success("Board created successfully!!");
  return res.data;
};

// update board details
export const updateBoardDetailsAPI = async (boardId, updatedData) => {
  const res = await authorizedAxiosInstance.put(
    `${API_ROOT}/v1/boards/${boardId}`,
    updatedData
  );

  return res.data;
};

// move cards to different columns
export const moveCardToDifferentColumnsAPI = async (updatedData) => {
  const res = await authorizedAxiosInstance.put(
    `${API_ROOT}/v1/boards/supports/moving_card`,
    updatedData
  );

  return res.data;
};

// update card
export const updateCardDetailsAPI = async (cardId, updateData) => {
  const res = await authorizedAxiosInstance.put(
    `${API_ROOT}/v1/cards/${cardId}`,
    updateData
  );
  return res.data;
};

// Columns
export const createNewColumnAPI = async (newColumnData) => {
  const res = await authorizedAxiosInstance.post(
    `${API_ROOT}/v1/columns`,
    newColumnData
  );
  return res.data;
};

// update column details
export const updateColumnDetailsAPI = async (columnId, updatedData) => {
  const res = await authorizedAxiosInstance.put(
    `${API_ROOT}/v1/columns/${columnId}`,
    updatedData
  );

  return res.data;
};

// delete columns
export const deleteColumnDetailsAPI = async (columnId) => {
  const res = await authorizedAxiosInstance.delete(
    `${API_ROOT}/v1/columns/${columnId}`
  );

  return res.data;
};

// Cards
export const createNewCardAPI = async (newCardData) => {
  const res = await authorizedAxiosInstance.post(
    `${API_ROOT}/v1/cards`,
    newCardData
  );
  return res.data;
};

// Authentication
// Users

export const registerUserAPI = async (data) => {
  const response = await authorizedAxiosInstance.post(
    `${API_ROOT}/v1/users/register`,
    data
  );
  toast.success(
    "Account created successfully! Please check and verify your account before logging in!",
    { theme: "colored" }
  );
  return response.data;
};

export const verifyUserAPI = async (data) => {
  const response = await authorizedAxiosInstance.put(
    `${API_ROOT}/v1/users/verify`,
    data
  );
  toast.success(
    "Account verified successfully! Now you can login to enjoy our services! Have a good day!",
    { theme: "colored" }
  );
  return response.data;
};

export const refreshTokenAPI = async () => {
  const response = await authorizedAxiosInstance.get(
    `${API_ROOT}/v1/users/refresh_token`
  );
  return response.data;
};

// Invitation
export const inviteUserToBoardAPI = async (data) => {
  const res = await authorizedAxiosInstance.post(
    `${API_ROOT}/v1/invitations/board`,
    data
  );
  toast.success("User invited to board successfully!!");
  return res.data;
};
