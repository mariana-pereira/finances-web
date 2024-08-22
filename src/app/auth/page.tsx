'use client'

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import "../globals.css";

const authFormSchema = z.object({
  email: z.string()
    .min(3, 'O e-mail é obrigatório')
    .email('Formato de e-mail inválido')
    .toLowerCase(),
  password: z.string()
    .min(6, 'A senha precisa de no mínimo 6 caracteres'),
})

type AuthFormData = z.infer<typeof authFormSchema>

export default function Auth() {

  const { register, handleSubmit, formState: { errors }, control } = useForm<AuthFormData>({
    resolver: zodResolver(authFormSchema),
  })

  function createUser(data: AuthFormData) {
    console.log(data)
  }

  return (
    <main className="h-screen flex flex-col items-center justify-center">
      <h1 className="to-zinc-900 text-3xl font-bold dark:text-zinc-100 mb-5 align-middle">Entrar</h1>
      <span className="mb-6">Ainda não tem uma conta? Cadastre-se</span>
      <form onSubmit={handleSubmit(createUser)} className="flex flex-col gap-4 w-full max-w-xs">
        <input
          type="email"
          className="border border-zinc-200 shadow-sm rounded h-10"
          {...register('email')}
        />
        <input
          type="password"
          className="border border-zinc-200 shadow-sm rounded h-10"
          {...register('password')}
        />

        <button
          className="bg-zinc-900 rounded font-semibold text-white h-10 hover:bg-zinc-800"
          type="submit"
        >
          Entrar
        </button>
      </form>
    </main>
  );
}
