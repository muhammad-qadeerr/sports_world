import { useContext, useState } from "react";
import { FinanceContext } from "../contexts/FinanceContext";

const PurchaseComponent = () => {
	const ctx = useContext(FinanceContext);
	const [successMessage, setSuccessMessage] = useState<string>("");
	const [errorMessage, setErrorMessage] = useState<string>("");

	if (!ctx) return null;

	const available = ctx.athletes.filter((a) => !a.purchaseStatus);

	const buy = async (id?: number, athleteName?: string) => {
		if (!id) return;
		
		setSuccessMessage("");
		setErrorMessage("");
		
		const confirmed = window.confirm(
			`Are you sure you want to purchase ${athleteName || "this athlete"}?`
		);
		
		if (!confirmed) return;

		const res = await ctx.purchaseAthlete(id);
		if (res.success && res.athlete) {
			setSuccessMessage(`Congratulations! 🎉 You have purchased ${res.athlete.name}`);
			setTimeout(() => setSuccessMessage(""), 7000);
		} else {
			setErrorMessage(res.error || "Purchase failed");
			setTimeout(() => setErrorMessage(""), 7000);
		}
	};

	return (
		<section className="p-6 border rounded bg-white shadow">
			<h3 className="text-xl font-semibold mb-4">Purchase Athlete</h3>
			{successMessage && (
				<div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
					<p className="font-semibold">{successMessage}</p>
				</div>
			)}
			{errorMessage && (
				<div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
					<p className="font-semibold">{errorMessage}</p>
				</div>
			)}
			{available.length === 0 ? (
				<p className="text-gray-500">No available athletes</p>
			) : (
				<div className="space-y-2">
					{available.map((a) => (
						<div
							key={a.id}
							className="border p-4 rounded bg-gray-50 flex justify-between items-center"
						>
							<div>
								<p className="font-semibold">{a.name}</p>
								<p>Price: ${a.price.toFixed(2)}</p>
							</div>
							<button
								onClick={() => buy(a.id, a.name)}
								className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600"
							>
								Purchase
							</button>
						</div>
					))}
				</div>
			)}
		</section>
	);
};

export default PurchaseComponent;
