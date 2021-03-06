import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import { loginThunk } from '../redux/thunks/authThunk';
import { fetchCategoryThunk } from '../redux/thunks/categoryThunk';
import InputForm from '../components/InputForm';
import MainLayout from '../layouts/MainLayout';
import Authentication from '../helpers/Authentication';

const Login = ({ loginThunk, login }) => {
	const router = useRouter();
	const initialValues = {
		user_name: '',
		password: ''
	};
	const validationSchema = Yup.object({
		user_name: Yup.string().required('User name is required'),
		password: Yup.string().required('Password is required')
	});
	const onSubmit = (values) => {
		const user = {
			user_name: values.user_name,
			password: values.password
		};
		loginThunk(user, router);
	};
	return (
		<>
			<MainLayout>
				<div className="container">
					<ol className="breadcrumb my-4">
						<li className="breadcrumb-item">
							<a href="/">Home</a>
						</li>
						<li className="breadcrumb-item active">Login</li>
					</ol>
					<div className="row">
						<div className="col-lg-8 col-md-10 mx-auto">
							<Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
								<Form>
									<h2 className="text-center mb-3">Login now</h2>
									<div className="form-group">
										<InputForm
											label="User name"
											placeholder="Enter user name"
											id="user_name"
											name="user_name"
											type="text"
											isError={login.isError}
											errorMessage={login.errorMessage.user}
										/>
									</div>
									<div className="form-group">
										<InputForm
											label="Password"
											placeholder="Password"
											id="password"
											name="password"
											type="password"
											isError={login.isError}
											errorMessage={login.errorMessage.user}
										/>
									</div>
									<div className="d-flex justify-content-between mb-3">
										<div className="form-group form-check">
											<input type="checkbox" className="form-check-input" id="remember" />
											<label className="form-check-label" htmlFor="remember">
												Remember
											</label>
										</div>
										<span>
											<a href="#!">Forgot password?</a>
										</span>
									</div>
									<div className="text-center">
										{login.isLoading ? (
											<button type="submit" className="btn btn-success" disabled>
												<span className="spinner-grow spinner-grow-sm mr-1" role="status" aria-hidden="true" />
												Login
											</button>
										) : (
											<button type="submit" className="btn btn-success">
												Login
											</button>
										)}
										<p className="mt-3">
											Not a member?{' '}
											<Link href="/register">
												<a>Register</a>
											</Link>
										</p>
										<p>or sign in with:</p>
										<a href="#!" className="btn-floating btn-fb btn-sm mr-1">
											<i className="fa fa-facebook" />
										</a>
										<a href="#!" className="btn-floating btn-tw btn-sm mr-1">
											<i className="fa fa-twitter" />
										</a>
										<a href="#!" className="btn-floating btn-li btn-sm mr-1">
											<i className="fa fa-linkedin"></i>
										</a>
										<a href="#!" className="btn-floating btn-git btn-sm">
											<i className="fa fa-github" />
										</a>
									</div>
								</Form>
							</Formik>
						</div>
					</div>
				</div>
			</MainLayout>
		</>
	);
};

Login.getInitialProps = async (ctx) => {
	await ctx.store.dispatch(fetchCategoryThunk());
};

const mapStateToProps = (state) => ({
	login: state.auth.login
});

const mapDispatchToProps = {
	loginThunk
};

export default Authentication(connect(mapStateToProps, mapDispatchToProps)(Login), 'login');
