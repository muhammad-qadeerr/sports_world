import { useNavigate } from "react-router-dom";

const HomePage = () => {
	const navigate = useNavigate();
	return (
		<div className="min-h-screen bg-white text-gray-900">
			{/* Hero Section */}
			<div className="container mx-auto px-6 py-20">
				<div className="text-center mb-16">
					<h1 className="text-7xl md:text-8xl font-black mb-6 text-blue-600 tracking-tight">
						SportsWorld
					</h1>
					<p className="text-2xl text-gray-600 max-w-3xl mx-auto font-light leading-relaxed">
						Your platform for{" "}
						<span className="text-blue-600 font-semibold">
							athlete management
						</span>{" "}
						and
						<span className="text-orange-600 font-semibold">
							{" "}
							financial administration
						</span>
					</p>
				</div>

				{/* Features Grid */}
				<div>
					<h2 className="text-5xl font-black text-center mb-12 text-blue-600">
						Core Features
					</h2>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
						<div
							onClick={() => navigate("/athletes")}
							className="group bg-blue-50 border-2 border-blue-200 rounded-2xl p-8 hover:border-blue-400 hover:shadow-lg transition-all cursor-pointer"
						>
							<div className="w-16 h-16 bg-blue-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
								<svg
									className="w-8 h-8 text-white"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M12 4.354a4 4 0 110 5.292m-5.292-5.292A4 4 0 0012 4.354m0 0A4 4 0 008.646 8.646m5.292-5.292A4 4 0 0115.354 8.646"
									/>
								</svg>
							</div>
							<h3 className="text-2xl font-bold text-gray-900 mb-3">
								Admin Athletes
							</h3>
							<p className="text-gray-600">
								Manage all registered athletes with advanced search, edit, and
								delete capabilities.
							</p>
						</div>

						<div
							onClick={() => navigate("/register")}
							className="group bg-orange-50 border-2 border-orange-200 rounded-2xl p-8 hover:border-orange-400 hover:shadow-lg transition-all cursor-pointer"
						>
							<div className="w-16 h-16 bg-orange-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
								<svg
									className="w-8 h-8 text-white"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
									/>
								</svg>
							</div>
							<h3 className="text-2xl font-bold text-gray-900 mb-3">
								Register Athletes
							</h3>
							<p className="text-gray-600">
								Easily add new athletes to your system with simple registration
								process.
							</p>
						</div>

						<div
							onClick={() => navigate("/dashboard")}
							className="group bg-gray-100 border-2 border-gray-300 rounded-2xl p-8 hover:border-gray-500 hover:shadow-lg transition-all cursor-pointer"
						>
							<div className="w-16 h-16 bg-gray-700 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
								<svg
									className="w-8 h-8 text-white"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
									/>
								</svg>
							</div>
							<h3 className="text-2xl font-bold text-gray-900 mb-3">
								Financial Dashboard
							</h3>
							<p className="text-gray-600">
								Monitor finances and track investments in real-time.
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default HomePage;
