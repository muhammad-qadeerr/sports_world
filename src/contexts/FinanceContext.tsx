import React, { createContext, useState, useEffect } from "react";
import type { IAthlete } from "../interfaces/Athlete";
import type { IFinance } from "../interfaces/Finance";
import AthleteService from "../services/athleteService";
import FinanceService from "../services/financeService";

export interface IFinanceContext {
	athletes: IAthlete[];
	finance: IFinance | null;
	getAthleteQuantity: () => number;
	saveAthlete: (formData: FormData) => Promise<{ success: boolean; error?: string }>;
	purchaseAthlete: (id: number) => Promise<{ success: boolean; athlete?: IAthlete; error?: string }>;
	requestLoan: (amount: number) => Promise<{ success: boolean; error?: string }>;
	deleteAthlete: (id: number) => Promise<{ success: boolean }>;
	editAthlete: (
		id: number,
		updatedAthlete: IAthlete
	) => Promise<{ success: boolean }>;
	refresh: () => Promise<void>;
	searchAthletes: (name: string) => Promise<{ success: boolean; data: IAthlete[] | null }>;
}

export const FinanceContext = createContext<IFinanceContext | null>(null);

export const FinanceProvider = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	// Dummy athletes for now
	const dummyAthletes: IAthlete[] = [
		{
			id: 1,
			name: "John Smith",
			gender: "Male",
			price: 50000,
			purchaseStatus: false,
		},
		{
			id: 2,
			name: "Sarah Johnson",
			gender: "Female",
			price: 45000,
			purchaseStatus: false,
		},
		{
			id: 3,
			name: "Mike Davis",
			gender: "Male",
			price: 55000,
			purchaseStatus: true,
		},
		{
			id: 4,
			name: "Emma Wilson",
			gender: "Female",
			price: 48000,
			purchaseStatus: false,
		},
		{
			id: 5,
			name: "Alex Brown",
			gender: "Male",
			price: 52000,
			purchaseStatus: false,
		},
	];

	const [athletes, setAthletes] = useState<IAthlete[]>([]);
	const [finance, setFinance] = useState<IFinance | null>(null);

	useEffect(() => {
		(async () => {
			await refresh();
		})();
	}, []);

	const refresh = async () => {
		const a = await AthleteService.getAll();
		if (a.success && a.data) setAthletes(a.data);

		const f = await FinanceService.getFinance();
		if (f.success) setFinance(f.data);
	};

	const getAthleteQuantity = () => athletes.length;

	const saveAthlete = async (formData: FormData) => {
		const r = await AthleteService.post(formData);
		if (r.success && r.data) {
			setAthletes((prev) => [r.data!, ...prev]);
			return { success: true };
		}
		return { success: false, error: r.error };
	};

	const purchaseAthlete = async (id: number) => {
		try {
			// Call the purchase endpoint - backend handles all validation and finance updates
			const purchaseResult = await AthleteService.purchase(id);
			
			if (purchaseResult.success && purchaseResult.data) {
				// Refresh data from server to get updated state
				await refresh();
				return { success: true, athlete: purchaseResult.data };
			} else {
				return { success: false, error: purchaseResult.error };
			}
		} catch (error) {
			console.error('Error in purchaseAthlete:', error);
			return { success: false, error: 'An unexpected error occurred' };
		}
	};

	const requestLoan = async (amount: number) => {
		const r = await FinanceService.requestLoan(amount);
		if (r.success && r.data) {
			// Update finance with the response data (backend automatically updates money left)
			setFinance(r.data);
			// Refresh to ensure we have the latest data
			await refresh();
			return { success: true };
		}
		return { success: false, error: r.error };
	};

	const deleteAthlete = async (id: number) => {
		const r = await AthleteService.remove(id);
		if (r.success) {
			setAthletes((prev) => prev.filter((a) => a.id !== id));
			return { success: true };
		}
		return { success: false };
	};

	const editAthlete = async (id: number, updatedAthlete: IAthlete) => {
		const r = await AthleteService.put(id, updatedAthlete);
		if (r.success) {
			setAthletes((prev) =>
				prev.map((a) => (a.id === id ? updatedAthlete : a))
			);
			return { success: true };
		}
		return { success: false };
	};

	const searchAthletes = async (name: string) => {
		return await AthleteService.search(name);
	};

	return (
		<FinanceContext.Provider
			value={{
				athletes,
				finance,
				getAthleteQuantity,
				saveAthlete,
				purchaseAthlete,
				requestLoan,
				deleteAthlete,
				editAthlete,
				refresh,
				searchAthletes,
			}}
		>
			{children}
		</FinanceContext.Provider>
	);
};
