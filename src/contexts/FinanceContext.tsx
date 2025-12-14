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
		formData: FormData
	) => Promise<{ success: boolean; data?: IAthlete; error?: string }>;
	refresh: () => Promise<void>;
	searchAthletes: (name: string) => Promise<{ success: boolean; data: IAthlete[] | null }>;
}

export const FinanceContext = createContext<IFinanceContext | null>(null);

export const FinanceProvider = ({
	children,
}: {
	children: React.ReactNode;
}) => {
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
			const purchaseResult = await AthleteService.purchase(id);
			
			if (purchaseResult.success && purchaseResult.data) {
				await refresh();
				return { success: true, athlete: purchaseResult.data };
			} else {
				return { success: false, error: purchaseResult.error };
			}
		} catch (error) {
			console.error("Error in purchaseAthlete:", error);
			return { success: false, error: "An unexpected error occurred" };
		}
	};

	const requestLoan = async (amount: number) => {
		const r = await FinanceService.requestLoan(amount);
		if (r.success && r.data) {
			setFinance(r.data);
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

	const editAthlete = async (id: number, formData: FormData) => {
		const r = await AthleteService.put(id, formData);
		if (r.success && r.data) {
			setAthletes((prev) =>
				prev.map((a) => (a.id === id ? r.data! : a))
			);
			return { success: true, data: r.data };
		}
		return { success: false, error: r.error };
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
