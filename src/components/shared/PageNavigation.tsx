import { Link } from "react-router-dom";

const PageNavigation = () => {
	return (
		<nav className="bg-white text-gray-900 shadow-md border-b border-blue-200">
			<div className="container mx-auto px-6">
				<div className="flex justify-between items-center py-5">
					{/* Logo Section */}
					<Link
						to="/"
						className="flex items-center space-x-3 hover:opacity-90 transition-opacity group"
					>
						<div className="relative w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg p-2 shadow-md group-hover:shadow-lg transition-shadow">
							<svg viewBox="0 0 100 100" className="w-full h-full">
								{/* Ball with gradient effect */}
								<defs>
									<linearGradient
										id="ballGradient"
										x1="0%"
										y1="0%"
										x2="100%"
										y2="100%"
									>
										<stop offset="0%" stopColor="#ffffff" />
										<stop offset="100%" stopColor="#e0f2fe" />
									</linearGradient>
								</defs>
								<circle cx="50" cy="50" r="38" fill="url(#ballGradient)" />
								{/* Soccer ball pattern */}
								<g stroke="#1e293b" strokeWidth="2.5" fill="none">
									<path d="M 30 50 L 70 50 M 50 30 L 50 70" />
									<circle cx="50" cy="50" r="28" />
									<path d="M 35 40 L 65 60 M 65 40 L 35 60" opacity="0.5" />
								</g>
								{/* Speed lines */}
								<g stroke="#0369a1" strokeWidth="2" opacity="0.9">
									<line x1="12" y1="45" x2="0" y2="40" />
									<line x1="10" y1="60" x2="-2" y2="68" />
									<line x1="88" y1="50" x2="100" y2="45" />
									<line x1="90" y1="55" x2="102" y2="62" />
								</g>
							</svg>
						</div>
						<span className="text-xl font-black text-blue-600 whitespace-nowrap tracking-wider">
							SPORTSWORLD
						</span>
					</Link>

					{/* Navigation Links */}
					<ul className="flex items-center space-x-1">
						<li>
							<Link
								to="/"
								className="px-4 py-2 rounded-lg font-semibold text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-300 border border-transparent hover:border-blue-200"
							>
								Home
							</Link>
						</li>
						<li>
							<Link
								to="/athletes"
								className="px-4 py-2 rounded-lg font-semibold text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-300 border border-transparent hover:border-blue-200"
							>
								Admin Athletes
							</Link>
						</li>
						<li>
							<Link
								to="/register"
								className="px-4 py-2 rounded-lg font-semibold text-gray-700 hover:text-orange-600 hover:bg-orange-50 transition-all duration-300 border border-transparent hover:border-orange-200"
							>
								Register Athlete
							</Link>
						</li>
						<li>
							<Link
								to="/dashboard"
								className="px-4 py-2 rounded-lg font-semibold text-gray-700 hover:text-gray-900 hover:bg-gray-100 transition-all duration-300 border border-transparent hover:border-gray-300"
							>
								Dashboard
							</Link>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	);
};

export default PageNavigation;
