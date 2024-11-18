

import axios from 'axios';
import { useState, useEffect } from 'react';


const API_URL = "http://localhost:8000/v1";
const token = process.env.TOKEN;

const config = {
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  }
};

export const useFetch = (url: string) => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}${url}`, config);
        setData(response.data);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
};

export const fetchProductById = async (productId: string) => {
  const response = await axios.get(`${API_URL}/vendor/product/products/${productId}`, config);
  return response.data;
};

export const updateProduct = async (productId: string, productData: any) => {
  const response = await axios.put(`${API_URL}/vendor/product/update/${productId}`, productData, config);
  return response.data;
};

export const addProduct = async (productData: any) => {
  const response = await axios.post(`${API_URL}/vendor/product/create`, productData, config);
  return response.data;
};

export const fetchProducts = async () => {
  const response = await axios.get(`${API_URL}/vendor/product/products`,config
    
  );
  console.log(response,"ye hai response");
  
  return response.data;
};


export default useFetch;



// import { useState, useEffect } from 'react';
// import axios from 'axios';
// const API_URL = "http://localhost:8000/v1";
// const token='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImM3YjQxYjFiLTI3MjYtNGQyMy1iOTYyLTYwMTdlMWZlY2FkZCIsImVtYWlsIjoibWFuaXNoQGV4YW1wbGUuY29tIiwiaWF0IjoxNzMxOTI0ODYxLCJleHAiOjE3MzIwMTEyNjF9.gF9FLz79Xa_MSRubYq4kJwzOtmzGKhDni9FFc36deT8'


// const config = {
//     headers: {
//         'Content-Type': 'application/json', // Correct capitalization
//         'Authorization': `Bearer ${token}` // Usually, tokens are prefixed with 'Bearer'
//     }
// };

// const useFetch = (url: string) => {
//   const [data, setData] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get(API_URL);
//         setData(response.data);
//       } catch (error) {
//        // setError(error.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [url]);

//   return { data, loading, error };
// };






// export const fetchProducts = async () => {
//   const response = await axios.get(`${API_URL}/vendor/product/products`,config
    
//   );
//   console.log(response,"ye hai response");
  
//   return response.data;
// };


// export default useFetch;








