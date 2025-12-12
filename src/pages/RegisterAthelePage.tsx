import AthleteFrom from "../components/AthleteFrom";

const RegisterAthelePage = () => {
	return (
		<div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 py-8">
			<div className="container mx-auto p-4">
				<header className="mb-6 text-center">
					<h1 className="text-4xl font-bold text-gray-800">
						Register Potential Athlete
					</h1>
				</header>
				<div className="flex justify-center">
					<AthleteFrom />
				</div>
			</div>
		</div>
	);
};

export default RegisterAthelePage;
