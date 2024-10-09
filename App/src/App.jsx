import { useEffect } from "react";
import { useUserStore } from "./lib/userStore.js";
import Loading from "./pages/Loading.jsx";
import Header from "./features/Header.jsx";
import Main from "./features/Main.jsx";
import Footer from "./features/Footer.jsx";
import { getAllUsers } from "./lib/fetchData.js";


function App() {

	const { isLoading, fetchUserInfo, fetchNullUserInfo } = useUserStore();

	useEffect(() => {
		fetchUserInfo();
		// fetchNullUserInfo();
		async function run() {
			const users = await getAllUsers();
			//console.log(users);
		}

		run();
	}, []);

	if (isLoading) return <Loading />
	return (
		<>
			<Header />
			<Main />
			<Footer />
		</>
	)
}

export default App
