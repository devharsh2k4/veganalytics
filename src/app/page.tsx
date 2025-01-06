"use client"

import { useState, useEffect } from 'react';
import axios from 'axios';
import Hero from './components/Hero';

interface SocialMediaData {
  labels: string[];
  likes: number[];
  shares: number[];
  comments: number[];
}

const fetchCsvData = async (): Promise<SocialMediaData> => {
  const response = await axios.get('/api/social');
  return response.data;
};

export default function Home() {
  const [data, setData] = useState<SocialMediaData>({
    labels: [],
    likes: [],
    shares: [],
    comments: [],
  });

  useEffect(() => {
    fetchCsvData().then(setData).catch(console.error);
  }, []);

  return (
    <div>
     <Hero/>
      <ul>
        {data.labels.map((label, index) => (
          <li key={index}>
            <strong>{label}</strong>: {data.likes[index]} likes,{' '}
            {data.shares[index]} shares, {data.comments[index]} comments
          </li>
        ))}
      </ul>
    </div>
  );
}
