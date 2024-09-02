import { useEffect } from 'react';
import { useUserStore } from './lib/userStore.js';
import Loading from './features/Loading/Loading.jsx';
import Header from './features/Header/Header.jsx';
import Main from './features/Main/Main.jsx';
import Footer from './features/Footer/Footer.jsx';

function App() {

	const { currentUser, isLoading, fetchUserInfo, fetchNullUserInfo } = useUserStore();

	useEffect(() => {
		// fetchUserInfo();
		fetchNullUserInfo();
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
