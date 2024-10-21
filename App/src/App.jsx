import { useEffect } from "react";
import { useUserStore } from "./lib/userStore.js";
<<<<<<< HEAD
=======
import { auth } from "./lib/firebase.js";
import { onAuthStateChanged } from "firebase/auth";
>>>>>>> origin/design
import Loading from "./pages/Loading.jsx";
import Header from "./features/Header.jsx";
import Main from "./features/Main.jsx";
import Footer from "./features/Footer.jsx";
<<<<<<< HEAD
import { getAllUsers } from "../../server/lib/fetchData.js";
=======
>>>>>>> origin/design


function App() {

<<<<<<< HEAD
	const { isLoading, fetchUserInfo, fetchNullUserInfo } = useUserStore();

	useEffect(() => {
		fetchUserInfo();
		// fetchNullUserInfo();
		async function run() {
			const users = await getAllUsers();
			console.log(users);
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
=======
	const { currentUser, isLoading, fetchUserInfo } = useUserStore();
	
	useEffect(() => {
		const unSub = onAuthStateChanged(auth, async (user) => {
			if (!currentUser) {
				await fetchUserInfo(user?.uid);
			}
		});

		return (() => {
			unSub();
		})
	}, [currentUser, fetchUserInfo]);

	if (isLoading) return <Loading />
	return (
		// reference to user light/dark mode preference to be inserted in html tag
		<html> 
			<Header />
			<Main />
			<Footer />
		</ html>
>>>>>>> origin/design
	)
}

export default App
