import FinanceOverview from "../components/FinanceOverview";
import LoanComponent from "../components/LoanComponent";
import PurchaseComponent from "../components/PurchaseComponent";

const DashboardPage = () => {
	return (
		<div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 py-8">
			<div className="container mx-auto p-4">
				<header className="mb-6 text-center">
					<h1 className="text-4xl font-bold text-gray-800">
						Dashboard for Finances and Purchases
					</h1>
					<p className="text-gray-600 mt-2">
						Monitor financial situation, get loans, and purchase athletes.
					</p>
				</header>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
					<FinanceOverview />
					<LoanComponent />
					<PurchaseComponent />
				</div>
			</div>
		</div>
	);
};

export default DashboardPage;
