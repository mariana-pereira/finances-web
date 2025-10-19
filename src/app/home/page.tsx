'use client';
import "../globals.css";

import { useEffect, useState } from 'react';
import axios from 'axios';

type Investment = {
  objectiveId: string;
  objectiveName: string;
  targetAmount: number;
  total: number;
};

export default function Home() {
  const [investments, setInvestments] = useState<Investment[]>([]);
  const [loading, setLoading] = useState(true);
   const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchInvestments = async () => {
      try {
        const token = localStorage.getItem('token'); // 🔑 get token from localStorage
        if (!token) {
          setError('Token not found. Please log in.');
          setLoading(false);
          return;
        }

        const response = await axios.get<Investment[]>(
          'https://finances-api-dq8n.onrender.com/investments/sum',
          {
            headers: {
              Authorization: `Bearer ${token}`, // ✅ attach Bearer token
            },
          }
        );

        setInvestments(response.data);
      } catch (err) {
        console.error('Error fetching investments:', err);
        setError('Failed to load data.');
      } finally {
        setLoading(false);
      }
    };

    fetchInvestments();
  }, []);

  const totalSum = investments.reduce((acc, curr) => acc + curr.total, 0);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-600 text-lg">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-600 text-lg">
        {error}
      </div>
    );
  }

  return (
    <main className="w-[77vw] flex flex-col px-10">
      <div className="flex flex-row justify-between">
        <div className="flex flex-col w-[40vw] bg-zinc-900 rounded-lg p-6 justify-between">
          <div className="flex flex-col justify-between ">
            <strong className="text-2xl">Saldo Total</strong>
            <span className="text-zinc-400"> R$ {totalSum.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
          </div>
          {investments.map((item) => (
            <div
              key={item.objectiveId}
              className="flex flex-col justify-end items-center mb-4"
            >
              <strong>{item.objectiveName}</strong>
              <span className="text-zinc-400 mt-4">
                R$ {item.total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div>
        <div></div>
        <div></div>
      </div>
    </main>
  );
}
