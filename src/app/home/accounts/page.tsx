import { Plus } from "lucide-react";
import "../../globals.css";

export default function Accounts() {
  return (
    <main className="w-[77vw] flex flex-col px-10">
      <div className="flex flex-row justify-between">
        <div className="flex flex-row w-[40vw] bg-zinc-900 rounded-lg p-6 justify-between">
          <div className="flex flex-col justify-between">
            <strong className="text-2xl">Saldo Total</strong>
            <span className="text-zinc-400">R$ 2000,00</span>
          </div>
          <div className="flex flex-col justify-end">
            <strong>Saldo em Conta</strong>
            <span className="text-zinc-400 mt-4">R$ 1000,00</span>
          </div>
          <div className="flex flex-col justify-end">
            <strong>Investimentos</strong>
            <span className="text-zinc-400 mt-4">RS 1000,00</span>
          </div>
        </div>
        <div className="bg-blue-900 rounded-full w-36 h-36 flex items-center justify-center">
          <Plus color="white" size={85} />
        </div>
      </div>
      <div>
        <div></div>
        <div></div>
      </div>
    </main>
  );
}