import { useEffect } from 'react';
import { useUserStore } from './lib/userStore.js';
import Loading from './pages/Loading/Loading.jsx';
import Header from './features/Header/Header.jsx';
import Main from './features/Main/Main.jsx';
import Footer from './features/Footer/Footer.jsx';
import { getAllUsers } from '../../server/lib/getData.js';


function App() {

	const { currentUser, isLoading, fetchUserInfo, fetchNullUserInfo } = useUserStore();

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
	)
}

export default App
