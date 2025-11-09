import React from 'react'
import { useEffect, useState } from 'react';
import api from '../services/api';


const Home = () => {

    const [message, setMessage] = useState("");

    useEffect(()=> {
        api.get("/health")
        .then(res => setMessage(res.data.message))
        .catch(() => setMessage("Error connecting to backend"));
    },[]);
    return (
        <div style={{ padding:"2rem"}}>
            <h1>Frontend Connected</h1>
            <p>{message}</p>
        </div>
    );
}

export default Home