import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "../pages/HomePage";
import AdminPage from "../pages/AdminPage";
import RegisterAthelePage from "../pages/RegisterAthelePage";
import DashboardPage from "../pages/DashboardPage";

import PageNavigation from "../components/shared/PageNavigation";
import PageFooter from "../components/shared/PageFooter";

const AppRouting = () => {
	return (
		<BrowserRouter>
			<PageNavigation />

			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/athletes" element={<AdminPage />} />
				<Route path="/register" element={<RegisterAthelePage />} />
				<Route path="/dashboard" element={<DashboardPage />} />
			</Routes>

			<PageFooter />
		</BrowserRouter>
	);
};

export default AppRouting;
