import React, { useContext } from "react";
import { FinanceContext } from "../contexts/FinanceContext";

const FinanceOverview = () => {
	const ctx = useContext(FinanceContext);
	if (!ctx) return null;
	const f = ctx.finance;

	return (
		<section className="p-6 border rounded bg-white shadow">
			<h3 className="text-xl font-semibold mb-4">Financial Situation</h3>
			{f ? (
				<div className="space-y-2">
					<p className="text-lg">
						<strong>Money Left:</strong> ${f.moneyLeft.toFixed(2)}
					</p>
					<p className="text-lg">
						<strong>Athletes Purchased:</strong> {f.numberOfPurchases}
					</p>
					<p className="text-lg">
						<strong>Total Spent:</strong> ${f.moneySpent.toFixed(2)}
					</p>
				</div>
			) : (
				<p className="text-gray-500">Loading...</p>
			)}
		</section>
	);
};

export default FinanceOverview;
