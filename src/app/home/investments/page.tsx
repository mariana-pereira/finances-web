'use client';
import "../../globals.css";
import { useEffect, useState } from "react";
import api from "@/lib/axios";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";

type Investment = {
  objectiveId: string;
  objectiveName: string;
  targetAmount: number;
  total: number;
};

export default function Investments() {
  const [investments, setInvestments] = useState<Investment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const token = localStorage.getItem("token");

  function goToNewInvestment() {
    router.push("/home/investments/new");
  }

  useEffect(() => {
    if (!token) router.push("/auth");
  }, [router]);

  useEffect(() => {
    const fetchInvestments = async () => {
      try {
        if (!token) {
          setError("Token not found. Please log in.");
          setLoading(false);
          return;
        }

        const response = await api.get<Investment[]>(
          "/investments/sum",
          { headers: { Authorization: `Bearer ${token}` } }
        );

        setInvestments(response.data);
      } catch (err) {
        console.error("Error fetching investments:", err);
        setError("Failed to load data.");
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
        Carregando...
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
    <main className="min-h-screen bg-black text-white flex justify-center py-10 px-4">
      <div className="w-full max-w-5xl flex flex-col gap-10">
        {/* Header Card */}
        <section className="bg-zinc-900 rounded-2xl p-6 sm:p-8 shadow-lg w-full">
          <div className="flex items-center justify-between mb-6">
        <div className="flex flex-col">
          <h1 className="text-2xl sm:text-3xl font-bold mb-1">Saldo Total</h1>
          <p className="text-zinc-400 text-lg sm:text-xl">
            R$ {totalSum.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
          </p>
        </div>

        <button 
          className="bg-blue-900 rounded-full w-20 h-20 flex items-center justify-center"
          onClick={goToNewInvestment}
        >
          <Plus color="white" size={85} />
        </button>
      </div>

          {/* Investment List */}
          {investments.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {investments.map((item) => (
                <div
                  key={item.objectiveId}
                  className="bg-zinc-800 p-4 rounded-xl text-center flex flex-col justify-between"
                >
                  <strong className="text-lg sm:text-xl truncate">
                    {item.objectiveName}
                  </strong>
                  <span className="text-zinc-400 mt-2 text-base sm:text-lg">
                    R$ {item.total.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-zinc-500">Nenhum investimento encontrado.</p>
          )}
        </section>

        {/* Placeholder for future sections */}
        <section className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="h-32 bg-zinc-900 rounded-2xl"></div>
          <div className="h-32 bg-zinc-900 rounded-2xl"></div>
        </section>
      </div>
    </main>
  );
}
