"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { api } from "../../../lib/axios";
import "../../globals.css";

const createUserFormSchema = z.object({
  name: z
    .string()
    .min(3, "O nome é obrigatório")
    .transform((name) => {
      return name
        .trim()
        .split(" ")
        .map((word) => {
          return word[0].toLocaleUpperCase().concat(word.substring(1));
        })
        .join(" ");
    }),
  email: z
    .string()
    .min(3, "O e-mail é obrigatório")
    .email("Formato de e-mail inválido")
    .toLowerCase(),
  password: z.string().min(6, "A senha precisa de no mínimo 6 caracteres"),
  passwordConfirmation: z
    .string()
    .min(6, "A senha precisa de no mínimo 6 caracteres"),
});

type CreateUserFormData = z.infer<typeof createUserFormSchema>;

export default function Register() {
  const [inputError, setInputError] = useState("");

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<CreateUserFormData>({
    resolver: zodResolver(createUserFormSchema),
  });

  async function createUser(data: CreateUserFormData) {
    const { name, email, password, passwordConfirmation } = data;

    try {
      if (password !== passwordConfirmation) {
        setInputError("As senhas são diferentes");
        return;
      }

      const response = await api.post("/auth/register", {
        name,
        email,
        password,
      });

      console.log(response)

      router.push("/home");
    } catch (error) {
      setInputError("Erro de cadastro");
      console.error(error);
    }
  }

  return (
    <main className="h-screen flex flex-col items-center justify-center">
      <h1 className="to-zinc-900 text-3xl font-bold dark:text-zinc-100 mb-7 align-middle">
        Registrar-se
      </h1>
      <form
        onSubmit={handleSubmit(createUser)}
        className="flex flex-col gap-4 w-full max-w-xs"
      >
        <input
          type="text"
          className="border border-zinc-200 shadow-sm rounded h-10"
          {...register("name")}
        />
        <input
          type="email"
          className="border border-zinc-200 shadow-sm rounded h-10"
          {...register("email")}
        />
        <input
          type="password"
          className="border border-zinc-200 shadow-sm rounded h-10"
          {...register("password")}
        />
        <input
          type="password"
          className="border border-zinc-200 shadow-sm rounded h-10"
          {...register("passwordConfirmation")}
        />

        {inputError && (
          <h3>
            <span>{inputError}</span>
          </h3>
        )}

        <button
          className="bg-zinc-900 rounded font-semibold text-white h-10 hover:bg-zinc-800"
          type="submit"
        >
          Salvar
        </button>
      </form>
    </main>
  );
}
