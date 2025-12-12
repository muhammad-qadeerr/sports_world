import AthleteList from "../components/AthleteList";

const AdminPage = () => {
	return (
		<div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 py-8">
			<div className="container mx-auto p-4">
				<header className="mb-6 text-center">
					<h1 className="text-4xl font-bold text-gray-800">
						Administer Athletes
					</h1>
					<p className="text-gray-600 mt-2">
						Manage all registered athletes: search, edit, and delete.
					</p>
				</header>
				<AthleteList />
			</div>
		</div>
	);
};

export default AdminPage;
