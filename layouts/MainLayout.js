import React from 'react';
import { connect } from 'react-redux';
import { useRouter } from 'next/router';
import { logoutThunk } from '../redux/thunks/authThunk';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

const MainLayout = ({ login, fetchCategory, logoutThunk, children }) => {
	const router = useRouter();
	const handleLogoutSubmit = (event) => {
		event.preventDefault();
		logoutThunk(router);
	};
	return (
		<>
			<NavBar fetchCategory={fetchCategory} login={login} handleLogoutSubmit={handleLogoutSubmit} />
			{children}
			<Footer />
		</>
	);
};

const mapStateToProps = (state) => ({
	fetchCategory: state.categories.fetchCategory,
	login: state.auth.login
});

const mapDispatchToProps = {
	logoutThunk
};

export default connect(mapStateToProps, mapDispatchToProps)(MainLayout);
