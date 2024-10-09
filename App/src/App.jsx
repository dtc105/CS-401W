import { useEffect } from "react";
import { useUserStore } from "./lib/userStore.js";
import Loading from "./pages/Loading.jsx";
import Header from "./features/Header.jsx";
import Main from "./features/Main.jsx";
import Footer from "./features/Footer.jsx";
import { auth } from "./lib/firebase.js";
import { onAuthStateChanged } from "firebase/auth";



function App() {

	const { isLoading, fetchUserInfo } = useUserStore();

	useEffect(() => {
		const unSub = onAuthStateChanged(auth, (user) => {
			fetchUserInfo(user?.uid);
		});

		return (() => {
			unSub();
		})
	}, [fetchUserInfo]);

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
