"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import api from "@/lib/axios";

import { FormInput } from "@/components/FormInput";
import { FormSelect } from "@/components/FormSelect";
import dayjs from "dayjs";

const InvestmentSchema = z.object({
  type: z.string().min(1, "Tipo é obrigatório"),
  tax_rate: z.string().min(1, "Taxa é obrigatória"),
  amount: z.coerce.number().positive("Valor deve ser maior que zero"),
  date: z.string().date(),
  expiration_date: z
    .string()
    .optional()
    .transform((value) => {
      if (!value) return undefined;

      const d = new Date(value);
      return isNaN(d.getTime()) ? undefined : d;
    }),
  account_id: z.string().uuid("Selecione uma conta válida"),
  objective_id: z.string().uuid("Selecione um objetivo válido"),
});

type InvestmentFormData = z.infer<typeof InvestmentSchema>;

export default function NewInvestmentPage() {
  const [loading, setLoading] = useState(false);
  const [loadingOptions, setLoadingOptions] = useState(true);
  const [message, setMessage] = useState("");
  const [accounts, setAccounts] = useState<any[]>([]);
  const [objectives, setObjectives] = useState<any[]>([]);
  const [token, setToken] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm<InvestmentFormData>({
    resolver: zodResolver(InvestmentSchema),
  });

  useEffect(() => {
    const stored = localStorage.getItem("token");
    setToken(stored);
  }, []);

  useEffect(() => {
    async function loadData() {
      try {
        if (!token) return; 
        
        const [accRes, objRes] = await Promise.all([
          api.get("/accounts", {
            headers: { Authorization: `Bearer ${token}` },
          }),

          api.get("/objectives", {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        setAccounts(
          accRes.data.map((item: any) => ({
            value: item.id,
            label: item.bank,
          }))
        );

        setObjectives(
          objRes.data.map((item: any) => ({
            value: item.id,
            label: item.name,
          }))
        );
      } catch (e) {
        console.error("Erro carregando dados", e);
      } finally {
        setLoadingOptions(false);
      }
    }

    loadData();
  }, []);

  async function onSubmit(data: InvestmentFormData) {
    data.date = dayjs(data.date).toISOString();
    const payload = {
    ...data,
    expiration_date: data.expiration_date ? dayjs(data.expiration_date).toISOString() : undefined,
  };

    setLoading(true);
    setMessage("");

    try {
      const response = await api.post(
        "/investments",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.data) {
        throw new Error("Erro ao criar investimento");
      }

      setMessage("💰 Investimento criado com sucesso!");
      reset();
    } catch (error: any) {
      setMessage(error.message || "Erro inesperado");
    } finally {
      setLoading(false);
    }
  }

  const investmentTypeOptions = [
    { value: "CDB", label: "CDB" },
    { value: "LCI", label: "LCI" },
    { value: "LCA", label: "LCA" },
    { value: "Tesouro Direto", label: "Tesouro Direto" },
    { value: "Ação", label: "Ação" },
    { value: "ETF", label: "ETF" },
  ];

  if (loadingOptions) {
    return (
      <div className="p-6 text-center text-lg text-zinc-600">
        Loading options...
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Criar Novo Investimento</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <FormSelect
          label="Tipo"
          options={investmentTypeOptions}
          register={register("type")}
          error={errors.type}
        />

        <FormInput
          label="Taxa"
          placeholder="110% CDI"
          register={register("tax_rate")}
          error={errors.tax_rate}
        />

        <FormInput
          label="Valor"
          type="number"
          placeholder="100"
          register={register("amount")}
          error={errors.amount}
        />

        <FormInput
          label="Data"
          type="date"
          register={register("date")}
          error={errors.date}
        />

        <FormInput
          label="Data Expiração"
          type="date"
          register={register("expiration_date")}
          required={false}
          error={errors.expiration_date}
        />

        <FormSelect
          label="Conta"
          options={accounts}
          register={register("account_id")}
          error={errors.account_id}
        />

        <FormSelect
          label="Objetivo"
          options={objectives}
          register={register("objective_id")}
          error={errors.objective_id}
        />

        <button
          disabled={loading}
          type="submit"
          className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
        >
          {loading ? "Carregando..." : "Criar Investimento"}
        </button>
      </form>

      {message && (
        <p className="mt-4 text-center text-lg font-medium">{message}</p>
      )}
    </div>
  );
}
