import React from 'react';
import Link from 'next/link';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { fetchCategoryThunk } from '../../../redux/thunks/categoryThunk';
import MainLayout from '../../../layouts/MainLayout';
import Authentication from '../../../helpers/Authentication';
import Nav from 'react-bootstrap/Nav';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import InputForm from '../../../components/InputForm';
import SelectForm from '../../../components/SelectForm';

const Profile = (props) => {
	const initialValues = {
		first_name: '',
		last_name: '',
		user_name: '',
		email: '',
		phone_number: '',
		address: '',
		gender: '',
		avatar: ''
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
		phone_number: Yup.string()
			.min(10, 'Phone number must be at least 10 characters')
			.matches(/^[0-9]+$/, 'Phone number invalid'),
		address: Yup.string()
			.min(6, 'Address must be at least 6 characters')
			.max(66, 'Address must be at most 66 characters'),
		avatar: Yup.string().max(300, 'Image must be at most 300 characters'),
		gender: Yup.string().oneOf(['male', 'female', 'orther'], 'Gender invalid').required('Select gender')
	});
	const onSubmit = (values) => {
		const user = {
			first_name: values.first_name,
			last_name: values.last_name,
			user_name: values.user_name,
			email: values.email,
			phone_number: values.phone_number,
			address: values.address,
			gender: values.gender,
			avatar: values.avatar
		};
	};
	return (
		<MainLayout>
			<div className="container">
				<ol className="breadcrumb my-4">
					<li className="breadcrumb-item">
						<Link href="/">
							<a>Home</a>
						</Link>
					</li>
					<li className="breadcrumb-item active">Profile</li>
				</ol>
				<div className="row">
					<div className="col-sm-3">
						<div className="text-center mb-4">
							<h3>User name</h3>
							<img
								src="http://ssl.gstatic.com/accounts/ui/avatar_2x.png"
								className="avatar rounded-circle img-thumbnail"
								alt="avatar"
							/>
							<h6>Upload a different photo...</h6>
							{/* <input type="file" className="text-center center-block file-upload" /> */}
						</div>
						<div class="card mb-4">
							<div class="card-header">
								Website <i className="fa fa-link fa-1x" />
							</div>
							<div class="card-body">
								<a href="http://bootnipets.com">de4thzone.com</a>
							</div>
						</div>
						<ul className="list-group mb-4">
							<li className="list-group-item text-muted">
								Activity <i className="fa fa-dashboard fa-1x" />
							</li>
							<li className="list-group-item text-right">
								<span className="pull-left">
									<strong>Shares</strong>
								</span>
								125
							</li>
							<li className="list-group-item text-right">
								<span className="pull-left">
									<strong>Likes</strong>
								</span>
								13
							</li>
							<li className="list-group-item text-right">
								<span className="pull-left">
									<strong>Posts</strong>
								</span>
								37
							</li>
							<li className="list-group-item text-right">
								<span className="pull-left">
									<strong>Followers</strong>
								</span>
								78
							</li>
						</ul>
						<div class="card">
							<div class="card-header">Social Media</div>
							<div class="card-body">
								<i className="fa fa-facebook fa-2x mr-1" />
								<i className="fa fa-github fa-2x mr-1" />
								<i className="fa fa-twitter fa-2x mr-1" />
								<i className="fa fa-pinterest fa-2x mr-1" />
								<i className="fa fa-google-plus fa-2x" />
							</div>
						</div>
					</div>
					<div className="col-sm-9">
						<Tab.Container id="profile-tabs" defaultActiveKey="editprofile">
							<Nav as="nav" className="nav-tabs mb-3">
								<Nav.Item as="li">
									<Nav.Link eventKey="notification">Notification</Nav.Link>
								</Nav.Item>
								<Nav.Item as="li">
									<Nav.Link eventKey="activity">Activity</Nav.Link>
								</Nav.Item>
								<Nav.Item as="li">
									<Nav.Link eventKey="editprofile">Edit profile</Nav.Link>
								</Nav.Item>
							</Nav>
							<Tab.Content>
								<Tab.Pane eventKey="notification">Notification</Tab.Pane>
								<Tab.Pane eventKey="activity">Activity</Tab.Pane>
								<Tab.Pane eventKey="editprofile">
									<Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
										{({ values, errors, touched, handleSubmit, setFieldValue, setFieldTouched }) => (
											<form onSubmit={handleSubmit}>
												<div class="form-row">
													<div className="form-group col-md-6">
														<InputForm
															label="First name"
															placeholder="First name"
															id="first_name"
															name="first_name"
															type="text"
														/>
													</div>
													<div className="form-group col-md-6">
														<InputForm
															label="Last name"
															placeholder="Last name"
															id="last_name"
															name="last_name"
															type="text"
														/>
													</div>
												</div>
												<div class="form-row">
													<div className="form-group col-md-6">
														<InputForm
															label="User name"
															placeholder="User name"
															id="user_name"
															name="user_name"
															type="text"
															/* isError={register.isError}
															errorMessage={register.errorMessage.user_name} */
														/>
													</div>
													<div className="form-group col-md-6">
														<InputForm
															label="Email"
															placeholder="Email"
															id="email"
															name="email"
															type="text"
															/* isError={register.isError}
															errorMessage={register.errorMessage.email} */
														/>
													</div>
												</div>
												<div class="form-row">
													<div className="form-group col-md-6">
														<InputForm
															label="Phone number"
															placeholder="84 336 077 131"
															id="phone_number"
															name="phone_number"
															type="text"
														/>
													</div>
													<div className="form-group col-md-6">
														<SelectForm label="Gender" name="gender">
															<option value="">Select gender</option>
															<option value="male">Male</option>
															<option value="female">Female</option>
															<option value="orther">Other</option>
														</SelectForm>
													</div>
												</div>
												<div class="form-row">
													<div className="form-group col-md-6">
														<InputForm label="Avatar" placeholder="Avatar" id="avatar" name="avatar" type="text" />
													</div>
												</div>
												<div className="form-group">
													<button className="btn btn-success mr-2" type="submit">
														<i className="fa fa-floppy-o mr-1" aria-hidden="true"></i>Save
													</button>
													<button className="btn btn-light" type="reset">
														<i className="fa fa-refresh mr-1" aria-hidden="true"></i>Reset
													</button>
												</div>
											</form>
										)}
									</Formik>
								</Tab.Pane>
							</Tab.Content>
						</Tab.Container>
					</div>
				</div>
			</div>
		</MainLayout>
	);
};

Profile.getInitialProps = async (ctx) => {
	await ctx.store.dispatch(fetchCategoryThunk());
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default Authentication(Profile, 'profile');
