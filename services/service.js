import axios from 'axios';

const api = axios.create({
  baseURL: 'http://172.30.118.3:2419',
});

export const createSupply = async (supply) => {
  try {
    const response = await api.post('/vehicle', supply);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getSupplies = async () => {
  try {
    const response = await api.get('/all');
    return response.data;
  } catch (error) {
    throw error;
  }
}

export const getSupply = async (id) => {    
  try {
    const response = await api.get(`/vehicle/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export const getManufacturers = async () => {
  try {
    const response = await api.get('/types');
    return response.data;
  } catch (error) {
    throw error;
  }
}

export const getManufacturerDetails = async (manufacturer) => {
  try {
    const response = await api.get(`/vehicles/${manufacturer}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export const testConnection = async () => {
    try {
      const response = await api.get('/all');
      if (response.status !== 200) {
        throw new Error('Server is down');
      }
      return response.data;
    } catch (error) {
      throw error;
    }
  };

export const getAllProjects = async () => {
  try {
    const response = await api.get('/allProjects');
    return response.data;
  } catch (error) {
    throw error;
  }
}