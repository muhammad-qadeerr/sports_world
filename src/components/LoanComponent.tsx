import { useContext, useState } from "react";
import { FinanceContext } from "../contexts/FinanceContext";

const LoanComponent = () => {
	const ctx = useContext(FinanceContext);
	const [amount, setAmount] = useState<number>(0);
	const [msg, setMsg] = useState<string>("");
	const [isSuccess, setIsSuccess] = useState<boolean>(false);

	if (!ctx) return null;

	const request = async () => {
		if (amount <= 0) {
			setMsg("Amount must be greater than 0");
			setIsSuccess(false);
			setTimeout(() => setMsg(""), 3000);
			return;
		}
		
		const r = await ctx.requestLoan(amount);
		if (r.success) {
			setMsg("Loan received successfully! Financial situation updated.");
			setIsSuccess(true);
			setAmount(0); // Clear the input
		} else {
			setMsg(r.error || "Loan request failed");
			setIsSuccess(false);
		}
		setTimeout(() => setMsg(""), 5000);
	};

	return (
		<section className="p-6 border rounded bg-white shadow">
			<h3 className="text-xl font-semibold mb-4">Get More Money (Loan)</h3>
			<div className="mb-4">
				<label className="block text-gray-700 mb-2">Loan Amount</label>
				<input
					type="number"
					value={amount}
					onChange={(e) => setAmount(parseFloat(e.target.value || "0"))}
					className="border border-gray-300 p-2 w-full rounded"
					min="0"
					step="0.01"
				/>
			</div>
			<button
				onClick={request}
				className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
			>
				Get Loan
			</button>
			{msg && (
				<div className={`mt-4 p-3 rounded ${
					isSuccess 
						? "bg-green-100 border border-green-400 text-green-700" 
						: "bg-red-100 border border-red-400 text-red-700"
				}`}>
					<p className="font-semibold">{msg}</p>
				</div>
			)}
		</section>
	);
};

export default LoanComponent;
