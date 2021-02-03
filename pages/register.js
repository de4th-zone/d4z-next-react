import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useRouter, withRouter } from 'next/router';
import Link from 'next/link';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { fetchCategoryThunk } from '../redux/thunks/categoryThunk';
import { registerThunk } from '../redux/thunks/authThunk';
import MainLayout from '../layouts/MainLayout';
import InputForm from '../components/InputForm';
import SelectForm from '../components/SelectForm';
import CheckBoxForm from '../components/CheckBoxForm';
import Authentication from '../helpers/Authentication';

const Register = ({ register, registerThunk }) => {
	const router = useRouter();
	const initialValues = {
		first_name: '',
		last_name: '',
		user_name: '',
		email: '',
		password: '',
		password_confirm: '',
		phone_number: '',
		address: '',
		gender: '',
		avatar: '',
		agreeterms: false
	};
	const validationSchema = Yup.object({
		first_name: Yup.string()
			.min(1, 'Fisrt name must be at least 1 characters')
			.max(16, 'Fisrt name must be at most 16 characters')
			.required('First name is required'),
		last_name: Yup.string()
			.min(1, 'Last name must be at least 1 characters')
			.max(16, 'Last name must be at most 16 characters')
			.required('Last name is required'),
		user_name: Yup.string()
			.min(6, 'User name must be at least 6 characters')
			.max(16, 'User name must be at most 16 characters')
			.matches(/^(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/, 'User name invalid')
			.required('User name is required'),
		email: Yup.string()
			.matches(
				/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
				'Email invalid'
			)
			.required('Email is required'),
		password: Yup.string().required('Password is required'),
		password_confirm: Yup.string()
			.required('Comfirm password is required')
			.oneOf([Yup.ref('password')], 'Password is not match'),
		phone_number: Yup.string()
			.min(10, 'Phone number must be at least 10 characters')
			.matches(/^[0-9]+$/, 'Phone number invalid'),
		address: Yup.string()
			.min(6, 'Address must be at least 6 characters')
			.max(66, 'Address must be at most 66 characters'),
		avatar: Yup.string().max(300, 'Image must be at most 300 characters'),
		gender: Yup.string().oneOf(['male', 'female', 'orther'], 'Gender invalid').required('Select gender'),
		agreeterms: Yup.boolean().oneOf([true], 'You must agree to terms of service').required('Required')
	});
	const onSubmit = (values) => {
		const user = {
			first_name: values.first_name,
			last_name: values.last_name,
			user_name: values.user_name,
			email: values.email,
			password: values.password,
			phone_number: values.phone_number,
			address: values.address,
			gender: values.gender,
			avatar: values.avatar
		};
		registerThunk(user, router);
	};
	return (
		<>
			<MainLayout>
				<div className="container">
					<ol className="breadcrumb my-4">
						<li className="breadcrumb-item">
							<a href="/">Home</a>
						</li>
						<li className="breadcrumb-item active">Register</li>
					</ol>
					<div className="row">
						<div className="col-lg-8 col-md-10 mx-auto">
							<Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
								{({ values, errors, touched, handleSubmit, setFieldValue, setFieldTouched }) => (
									<form onSubmit={handleSubmit}>
										<h2 className="text-center mb-3">Register</h2>
										<div className="form-group">
											<InputForm
												label="First name"
												placeholder="First name"
												id="first_name"
												name="first_name"
												type="text"
											/>
										</div>
										<div className="form-group">
											<InputForm
												label="Last name"
												placeholder="Last name"
												id="last_name"
												name="last_name"
												type="text"
											/>
										</div>
										<div className="form-group">
											<InputForm
												label="User name"
												placeholder="User name"
												id="user_name"
												name="user_name"
												type="text"
												isError={register.isError}
												errorMessage={register.errorMessage.user_name}
											/>
										</div>
										<div className="form-group">
											<InputForm
												label="Email"
												placeholder="Email"
												id="email"
												name="email"
												type="text"
												isError={register.isError}
												errorMessage={register.errorMessage.email}
											/>
										</div>
										<div className="form-group">
											<InputForm
												label="Password"
												placeholder="Password"
												id="password"
												name="password"
												type="password"
											/>
										</div>
										<div className="form-group">
											<InputForm
												label="Confirm password"
												placeholder="Confirm password"
												id="password_confirm"
												name="password_confirm"
												type="password"
											/>
										</div>
										<div className="form-group">
											<InputForm
												label="Phone number"
												placeholder="84 336 077 131"
												id="phone_number"
												name="phone_number"
												type="text"
											/>
										</div>
										<div className="form-group">
											<InputForm label="Address" placeholder="Address" id="address" name="address" type="text" />
										</div>
										<div className="form-group">
											<SelectForm label="Gender" name="gender">
												<option value="">Select gender</option>
												<option value="male">Male</option>
												<option value="female">Female</option>
												<option value="orther">Other</option>
											</SelectForm>
										</div>
										<div className="form-group">
											<InputForm label="Image" placeholder="Avatar" id="avatar" name="avatar" type="text" />
										</div>
										<div className="form-group form-check">
											<CheckBoxForm label="Agree to terms of service" id="agreeterms" name="agreeterms" />
										</div>
										<div className="text-center">
											{register.isLoading ? (
												<button type="submit" className="btn btn-success" disabled>
													<span className="spinner-grow spinner-grow-sm mr-1" role="status" aria-hidden="true" />
													Register
												</button>
											) : (
												<button type="submit" className="btn btn-success">
													Register
												</button>
											)}
											<p className="mt-3">or register with:</p>
											<a href="#!" className="btn-floating btn-fb btn-sm mr-1">
												<i className="fa fa-facebook" />
											</a>
											<a href="#!" className="btn-floating btn-tw btn-sm mr-1">
												<i className="fa fa-twitter" />
											</a>
											<a href="#!" className="btn-floating btn-li btn-sm mr-1">
												<i className="fa fa-linkedin" />
											</a>
											<a href="#!" className="btn-floating btn-git btn-sm">
												<i className="fa fa-github" />
											</a>
											<hr className="mt-4" />
											<p>
												By clicking <em>Register</em> you agree to our <a href="#!">terms of service</a>
											</p>
										</div>
									</form>
								)}
							</Formik>
						</div>
					</div>
				</div>
			</MainLayout>
		</>
	);
};

Register.getInitialProps = async (ctx) => {
	await ctx.store.dispatch(fetchCategoryThunk());
};

const mapStateToProps = (state) => ({
	register: state.auth.register
});

const mapDispatchToProps = { registerThunk };

export default Authentication(connect(mapStateToProps, mapDispatchToProps)(withRouter(Register)), 'register');
