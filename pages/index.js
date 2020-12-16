import React, { useEffect } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { connect } from 'react-redux';
import { wrapper } from '../redux/store';
import {
	fetchPostThunk,
	fetchMorePostThunk,
	fetchPostResetedThunk,
	fetchTrendingPostThunk
} from '../redux/thunks/postThunk';
import { fetchCategoryThunk } from '../redux/thunks/categoryThunk';
import isEmpty from '../helpers/isEmpty';
import Carousel from 'react-bootstrap/Carousel';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import Dropdown from 'react-bootstrap/Dropdown';
import NavItem from 'react-bootstrap/NavItem';
import NavLink from 'react-bootstrap/NavLink';

const Index = ({
	fetchPost,
	fetchPostThunk,
	fetchMorePostThunk,
	fetchTrendingPostThunk,
	fetchTrendingPost,
	fetchCategoryThunk,
	fetchCategory,
	fetchPostResetedThunk
}) => {
	useEffect(() => {
		return () => {};
	}, []);
	const handleClick = (page) => {
		fetchMorePostThunk(page);
	};
	return (
		<>
			<Head>
				<title>Home | De4th Zone</title>
			</Head>
			<Navbar collapseOnSelect expand="lg" bg="light" variant="light" fixed="top" className="shadow-sm">
				<Container>
					<Link href="/" passHref>
						<Navbar.Brand className="d-flex align-items-center">
							<img
								className="rounded-circle mr-2"
								src="https://avatars1.githubusercontent.com/u/57558120?s=460&u=edcf8c9d01f9f5b76c1c6e30d6c775ec147cc434&v=4"
								width={44}
								height={44}
								alt="logo"
							/>
							De4thZone
						</Navbar.Brand>
					</Link>
					<Navbar.Toggle aria-controls="responsive-navbar-nav" />
					<Navbar.Collapse id="responsive-navbar-nav">
						<Nav className="ml-auto align-items-lg-center">
							<Nav.Item>
								<Link href="/" passHref>
									<Nav.Link>Home</Nav.Link>
								</Link>
							</Nav.Item>
							<Nav.Item>
								<Link href="/other" passHref>
									<Nav.Link>About</Nav.Link>
								</Link>
							</Nav.Item>
							<Dropdown as={NavItem}>
								<Dropdown.Toggle as={NavLink} id="dropdown-custom-1">
									Categories
								</Dropdown.Toggle>
								<Dropdown.Menu align="right">
									{fetchCategory.category.map((node) => (
										<Link href={`/categories/${node.id}/${node.slug}`} key={node.id} passHref>
											<Dropdown.Item eventKey={node.id}>{node.title}</Dropdown.Item>
										</Link>
									))}
								</Dropdown.Menu>
							</Dropdown>
							<Dropdown as={NavItem}>
								<Dropdown.Toggle as={NavLink} id="dropdown-custom-1" className="d-flex align-items-center">
									<img
										src="https://i.pinimg.com/236x/3b/80/98/3b8098ccad8c037f82827c97630fc4d5.jpg"
										width={40}
										height={40}
										className="rounded-circle mr-1"
										alt="thucdaik"
									/>
									thucdaik
								</Dropdown.Toggle>
								<Dropdown.Menu align="right">
									<Dropdown.Item>Profile</Dropdown.Item>
									<Dropdown.Divider />
									<Dropdown.Item>Logout</Dropdown.Item>
								</Dropdown.Menu>
							</Dropdown>
							<Nav.Item>
								<Link href="/register" passHref>
									<Nav.Link>Register</Nav.Link>
								</Link>
							</Nav.Item>
							<Nav.Item>
								<Link href="/login" passHref>
									<Nav.Link>Login</Nav.Link>
								</Link>
							</Nav.Item>
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
			<header className="mb-4">
				<Carousel>
					<Carousel.Item>
						<img className="d-block w-100" src="https://placehold.it/1900x1080" alt="First slide" />
						<Carousel.Caption>
							<h3>First slide label</h3>
							<p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
						</Carousel.Caption>
					</Carousel.Item>
					<Carousel.Item>
						<img className="d-block w-100" src="https://placehold.it/1900x1080" alt="Third slide" />

						<Carousel.Caption>
							<h3>Second slide label</h3>
							<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
						</Carousel.Caption>
					</Carousel.Item>
					<Carousel.Item>
						<img className="d-block w-100" src="https://placehold.it/1900x1080" alt="Third slide" />

						<Carousel.Caption>
							<h3>Third slide label</h3>
							<p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
						</Carousel.Caption>
					</Carousel.Item>
				</Carousel>
			</header>
			<div className="container">
				<h1 className="mb-4">Trending posts</h1>
				<div className="row">
					{fetchTrendingPost.isLoading ? (
						<div className="col-12 mb-4">
							<div className="spinner-grow text-success mr-5" role="status">
								<span className="sr-only">Loading...</span>
							</div>
							<div className="spinner-grow text-success mr-5" role="status">
								<span className="sr-only">Loading...</span>
							</div>
							<div className="spinner-grow text-success mr-5" role="status">
								<span className="sr-only">Loading...</span>
							</div>
						</div>
					) : (
						<>
							{fetchTrendingPost.isError ? (
								<div className="col-12 mb-4">{fetchTrendingPost.errorMessage}</div>
							) : (
								<>
									{isEmpty(fetchTrendingPost.post) ? (
										<div className="col-12 mb-4">No posts</div>
									) : (
										<>
											{fetchTrendingPost.post.map((node) => (
												<div className="col-4 mb-4" key={node.id}>
													<div className="card">
														<div className="row no-gutters">
															<div className="col-3">
																<img src="https://placehold.it/666x666" className="img-fluid" alt={node.title} />
															</div>
															<div className="col-9">
																<div className="card-block px-2">
																	<h5 className="card-title">{node.title}</h5>
																	<p className="card-text">
																		This is a wider card with supporting text below as a natural lead-in to additional
																		content. This content is a little bit longer.
																	</p>
																</div>
																<div className="px-2">
																	<small className="text-muted">Last updated 3 mins ago</small>
																</div>
															</div>
														</div>
													</div>
												</div>
											))}
										</>
									)}
								</>
							)}
						</>
					)}
				</div>
				<div className="row">
					<div className="col-lg-3 order-lg-2">
						<div className="sticky-top">
							<h3 className="mb-2">Categories</h3>
							<div className="list-group">
								{fetchCategory.category.map((node) => (
									<li className="list-group-item d-flex justify-content-between align-items-center" key={node.id}>
										<Link href={`/categories/${node.id}/${node.slug}`}>
											<a>{node.title}</a>
										</Link>
										<span className="badge badge-default badge-pill">{node.total_post}</span>
									</li>
								))}
							</div>
							<h3 className="my-2">Top tags</h3>
							<a href="#" className="badge badge-light p-2 mb-2 mr-2">
								Programming
							</a>
							<a href="#" className="badge badge-light p-2 mb-2 mr-2">
								Reactjs
							</a>
							<a href="#" className="badge badge-light p-2 mb-2 mr-2">
								Angular
							</a>
							<a href="#" className="badge badge-light p-2 mb-2 mr-2">
								Laravel
							</a>
							<a href="#" className="badge badge-light p-2 mb-2 mr-2">
								Vuejs
							</a>
						</div>
					</div>
					<div className="col-lg-9 order-lg-1">
						<h1 className="mb-4">New posts</h1>
						<div className="row">
							{fetchPost.isLoading ? (
								<div className="col-12 mb-4">
									<div className="spinner-grow text-success mr-5" role="status">
										<span className="sr-only">Loading...</span>
									</div>
									<div className="spinner-grow text-success mr-5" role="status">
										<span className="sr-only">Loading...</span>
									</div>
									<div className="spinner-grow text-success mr-5" role="status">
										<span className="sr-only">Loading...</span>
									</div>
								</div>
							) : (
								<>
									{fetchPost.isError ? (
										<div className="col-12 mb-4">{fetchPost.errorMessage}</div>
									) : (
										<>
											{isEmpty(fetchPost.post) ? (
												<div className="col-12 mb-4">No posts</div>
											) : (
												<>
													{fetchPost.post.map((node) => (
														<div className="col-12 mb-4" key={node.id}>
															<div className="card">
																<div className="row no-gutters">
																	<div className="col-3">
																		<img src="https://placehold.it/666x666" className="img-fluid" alt={node.title} />
																	</div>
																	<div className="col-9">
																		<div className="card-block px-2">
																			<h5 className="card-title">{node.title}</h5>
																			<p className="card-text">
																				This is a wider card with supporting text below as a natural lead-in to
																				additional content. This content is a little bit longer.
																			</p>
																		</div>
																		<div className="px-2">
																			<small className="text-muted">Last updated 3 mins ago</small>
																		</div>
																	</div>
																</div>
															</div>
														</div>
													))}
												</>
											)}
										</>
									)}
								</>
							)}
						</div>
						{fetchPost.isLoadingMore ? (
							<button type="button" className="btn btn-primary btn-block" disabled>
								<span className="spinner-grow spinner-grow-sm mr-2 " role="status" aria-hidden="true" />
								Loading more
							</button>
						) : (
							<button
								type="button"
								className="btn btn-primary btn-block"
								onClick={() => handleClick(fetchPost.pagination.current_page + 1)}
							>
								Loading more
							</button>
						)}
					</div>
				</div>
			</div>
			<footer className="py-5 mt-5 bg-custom">
				<div className="container">
					<div className="row">
						<div className="col-12 col-md">
							<img
								className="rounded-circle mb-2"
								src="https://avatars1.githubusercontent.com/u/57558120?s=460&u=edcf8c9d01f9f5b76c1c6e30d6c775ec147cc434&v=4"
								width={66}
								height={66}
								alt="logo"
							/>
							<small className="d-block mb-3 text-light">Copyright © Your Website 2020</small>
						</div>
						<div className="col-6 col-md">
							<h5 className="text-light">Features</h5>
							<ul className="list-unstyled text-small mb-0">
								<li>
									<a className="text-secondary" href="#!">
										Cool stuff
									</a>
								</li>
								<li>
									<a className="text-secondary" href="#!">
										Random feature
									</a>
								</li>
								<li>
									<a className="text-secondary" href="#!">
										Team feature
									</a>
								</li>
								<li>
									<a className="text-secondary" href="#!">
										Stuff for developers
									</a>
								</li>
								<li>
									<a className="text-secondary" href="#!">
										Another one
									</a>
								</li>
								<li>
									<a className="text-secondary" href="#!">
										Last time
									</a>
								</li>
							</ul>
						</div>
						<div className="col-6 col-md">
							<h5 className="text-light">Resources</h5>
							<ul className="list-unstyled text-small mb-0">
								<li>
									<a className="text-secondary" href="#!">
										Resource
									</a>
								</li>
								<li>
									<a className="text-secondary" href="#!">
										Resource name
									</a>
								</li>
								<li>
									<a className="text-secondary" href="#!">
										Another resource
									</a>
								</li>
								<li>
									<a className="text-secondary" href="#!">
										Final resource
									</a>
								</li>
							</ul>
						</div>
						<div className="col-6 col-md">
							<h5 className="text-light">About</h5>
							<ul className="list-unstyled text-small mb-0">
								<li>
									<a className="text-secondary" href="#!">
										Team
									</a>
								</li>
								<li>
									<a className="text-secondary" href="#!">
										Locations
									</a>
								</li>
								<li>
									<a className="text-secondary" href="#!">
										Privacy
									</a>
								</li>
								<li>
									<a className="text-secondary" href="#!">
										Terms
									</a>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</footer>
		</>
	);
};

export const getServerSideProps = wrapper.getServerSideProps(async ({ store, res }) => {
	await store.dispatch(fetchCategoryThunk());
	await store.dispatch(fetchTrendingPostThunk());
	await store.dispatch(fetchPostThunk());
});

const mapStateToProps = (state) => ({
	fetchPost: state.posts.fetchPost,
	fetchTrendingPost: state.posts.fetchTrendingPost,
	fetchCategory: state.categories.fetchCategory
});

const mapDispatchToProps = {
	fetchPostThunk,
	fetchMorePostThunk,
	fetchPostResetedThunk,
	fetchTrendingPostThunk,
	fetchCategoryThunk
};

export default connect(mapStateToProps, mapDispatchToProps)(Index);
