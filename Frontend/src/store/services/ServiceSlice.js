import axios from 'axios';
import { createSlice } from '@reduxjs/toolkit';
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import { baseAPIURL } from '../../../constants';

const initialState = {
  services: [],
  servicesSearch: '',
  token: null,
  responseMassage: '',
  locations: [],
  selectedLocation: 'All',
  isLoading: false,
  showToast: false,
  errorMessage: '',
  user: [],
};

export const ServiceSlice = createSlice({
  name: 'Services',
  initialState,
  reducers: {
    getPosts: (state, action) => {
      state.services = action.payload;
    },
    getToken: (state, action) => {
      state.token = action.payload;
    },
    removeToken: (state, action) => {
      state.token = action.payload;
    },
    getResponseMassage: (state, action) => {
      state.responseMassage = action.payload;
    },
    getlocations: (state, action) => {
      state.locations = action.payload;
    },
    getSelectedLocation: (state, action) => {
      state.selectedLocation = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setToast: (state, action) => {
      state.showToast = action.payload;
    },
    setErrorMessage: (state, action) => {
      state.errorMessage = action.payload;
    },
    getuser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const {
  getPosts,
  getToken,
  removeToken,
  getResponseMassage,
  getlocations,
  getSelectedLocation,
  setLoading,
  setToast,
  setErrorMessage,
  getuser,
} = ServiceSlice.actions;

export const fetchLocation = () => async (dispatch) => {
  const storedToken = localStorage.getItem('token');
  try {
    const response = await axios.get(baseAPIURL + '/location', {
      headers: {
        Authorization: `Bearer ${storedToken}`,
      },
    });
    dispatch(getlocations(response.data.data));
  } catch (error) {
    throw new Error();
  }
};

export const fetchServices = () => async (dispatch) => {
  try {
    const response = await axios.get('/api/data/blog/BlogPosts');
    dispatch(getPosts(response.data));
  } catch (err) {
    throw new Error();
  }
};

export const getTokenAsync = (userData) => (dispatch) => {
  return new Promise(async (resolve, reject) => {
    try {
      dispatch(setLoading(true));
      dispatch(setToast(false));
      const response = await axios.post(baseAPIURL + '/admin/login', userData);
      console.log(response)
      const userWithoutPassword = { ...response.data.user, password: undefined };
      localStorage.setItem('user', JSON.stringify(userWithoutPassword));
      dispatch(getToken(response.data.token));
      dispatch(getuser(response.data.user));
      resolve(response.data.token);
      dispatch(setLoading(false));
    } catch (err) {
      dispatch(setErrorMessage(err.response.data.message));
      dispatch(setToast(true));
      dispatch(setLoading(false));
      dispatch(getResponseMassage(err.response.data.message));
      reject(new Error(err.response.data.message));
    }
  });
};

export default ServiceSlice.reducer;
