import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';

const API = "http://20.244.56.144/test/companies/AMZ/categories/Laptop/products?top=10&minPrice=1&maxPrice=10000";
const ACCESS_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzIwNzYyNjU0LCJpYXQiOjE3MjA3NjIzNTQsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6ImI3ZTQwMTc5LWRjZmQtNDlkMC04OTAzLWYwZWI0OTZkYjA5MyIsInN1YiI6InNhbmNoaXRoMTg5NF9iaXQyNUBtZXBjb2VuZy5hYy5pbiJ9LCJjb21wYW55TmFtZSI6Im1lcGNvIiwiY2xpZW50SUQiOiJiN2U0MDE3OS1kY2ZkLTQ5ZDAtODkwMy1mMGViNDk2ZGIwOTMiLCJjbGllbnRTZWNyZXQiOiJJdGZGTHJwSVVTV0dMSU1ZIiwib3duZXJOYW1lIjoiU2FuY2hpdGggUlMiLCJvd25lckVtYWlsIjoic2FuY2hpdGgxODk0X2JpdDI1QG1lcGNvZW5nLmFjLmluIiwicm9sbE5vIjoiMjFCSVQwNDYifQ.55eyBqNR2MZj61VYHfg2BKexGS1WG9af4x1XXQynN_Q";
  const fetchProducts = async () => {
    const response = await fetch(API_URL, {
        method: 'GET',
        headers: {
          const ACCESS_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzIwNzYyNjU0LCJpYXQiOjE3MjA3NjIzNTQsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6ImI3ZTQwMTc5LWRjZmQtNDlkMC04OTAzLWYwZWI0OTZkYjA5MyIsInN1YiI6InNhbmNoaXRoMTg5NF9iaXQyNUBtZXBjb2VuZy5hYy5pbiJ9LCJjb21wYW55TmFtZSI6Im1lcGNvIiwiY2xpZW50SUQiOiJiN2U0MDE3OS1kY2ZkLTQ5ZDAtODkwMy1mMGViNDk2ZGIwOTMiLCJjbGllbnRTZWNyZXQiOiJJdGZGTHJwSVVTV0dMSU1ZIiwib3duZXJOYW1lIjoiU2FuY2hpdGggUlMiLCJvd25lckVtYWlsIjoic2FuY2hpdGgxODk0X2JpdDI1QG1lcGNvZW5nLmFjLmluIiwicm9sbE5vIjoiMjFCSVQwNDYifQ.55eyBqNR2MZj61VYHfg2BKexGS1WG9af4x1XXQynN_Q";

        }
    });

    if (!response.ok) {
        throw new Error('Failed to fetch products');
    }

    let data = await response.json();
    data=JSON.stringify(data, null, 2);
    return data;
};

const ProductsList = () => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await fetchProducts();
                setData(result);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchData();
    }, []);

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h1>API Response</h1>
            <TextField id="outlined-basic" label="Company Name" variant="outlined" />

            <pre>{data}</pre>
        </div>
    );
};

export default ProductsList;
