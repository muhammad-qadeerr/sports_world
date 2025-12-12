import { FinanceProvider } from "./contexts/FinanceContext";
import AppRouting from "./routing/AppRouting";

function App() {
	return (
		<FinanceProvider>
			<AppRouting />
		</FinanceProvider>
	);
}

export default App;
