import { useEffect } from "react";
import { useUserStore } from "./lib/userStore.js";
import { auth } from "./lib/firebase.js";
import { onAuthStateChanged } from "firebase/auth";
import Loading from "./pages/Loading.jsx";
import Header from "./features/Header.jsx";
import Main from "./features/Main.jsx";
import Footer from "./features/Footer.jsx";


function App() {

	const { currentUser, isLoading, fetchUserInfo } = useUserStore();
	
	useEffect(() => {
		const unSub = onAuthStateChanged(auth, async (user) => {
			if (!currentUser) {
				console.log("AHHHHHHHH", user);
				await fetchUserInfo(user?.uid);
			}
		});

		return (() => {
			unSub();
		})
	}, [currentUser, fetchUserInfo]);

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
