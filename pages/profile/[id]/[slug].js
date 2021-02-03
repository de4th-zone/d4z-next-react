import React from 'react';
import { fetchCategoryThunk } from '../../../redux/thunks/categoryThunk';
import MainLayout from '../../../layouts/MainLayout';
import Authentication from '../../../helpers/Authentication';

const Profile = (props) => {
	return <MainLayout>PROFILE</MainLayout>;
};

Profile.getInitialProps = async (ctx) => {
	await ctx.store.dispatch(fetchCategoryThunk());
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default Authentication(Profile, 'profile');
