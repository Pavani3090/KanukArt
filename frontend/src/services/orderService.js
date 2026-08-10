import axios from "axios";

const API = "http://localhost:8080/api/orders";

export const getArtistOrders = async (artistId) => {
    const response = await axios.get(`${API}/artist/${artistId}`);
    return response.data;
};

export const acceptOrder = async (orderItemId) => {
    const response = await axios.put(
        `${API}/item/${orderItemId}/status?status=ACCEPTED`
    );
    return response.data;
};

export const rejectOrder = async (orderItemId) => {
    const response = await axios.put(
        `${API}/item/${orderItemId}/status?status=REJECTED`
    );
    return response.data;
};