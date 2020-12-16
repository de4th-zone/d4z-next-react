import React, { useEffect } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { connect } from 'react-redux';
import { wrapper } from '../redux/store';
import { fetchPostThunk, fetchMorePostThunk, fetchTrendingPostThunk } from '../redux/thunks/postThunk';
import { fetchCategoryThunk } from '../redux/thunks/categoryThunk';
import isEmpty from '../helpers/isEmpty';
import NavBar from '../components/NavBar';
import Carousel from '../components/Carousel';
import PostCard from '../components/PostCard';
import Loading from '../components/Loading';
import Footer from '../components/Footer';
import ListGroup from '../components/ListGroup';
import Badge from '../components/Badge';

const Index = ({ fetchPost, fetchMorePostThunk, fetchTrendingPost, fetchCategory }) => {
	const handleClick = (page) => {
		fetchMorePostThunk(page);
	};
	return (
		<>
			<Head>
				<title>Home | De4th Zone</title>
				<meta name="description" content="Website programing, software, hacking,..." />
				<meta property="og:site_name" content="De4th Zone" />
				<meta property="og:type" content="website" />
				<meta property="og:title" content="Home | De4th Zone" />
				<meta property="og:description" content="Website programing, software, hacking,..." />
				<meta property="og:url" content="https://de4thzone.com" />
				<meta property="og:image" content="/d4z_1.png" />
				<meta name="twitter:title" content="Home | De4th Zone" />
				<meta name="twitter:description" content="Website programing, software, hacking,..." />
				<meta name="twitter:url" content="https://de4thzone.com" />
				<meta name="twitter:site" content="https://twitter.com/de4th_zone" />
				<meta name="twitter:creator" content="@de4th_zone" />
				<meta name="twitter:card" content="summary_large_image" />
				<meta name="twitter:image" content="/d4z_1.png" />
			</Head>
			<NavBar fetchCategory={fetchCategory} />
			<Carousel />
			<div className="container">
				<h1 className="mb-4">Trending posts</h1>
				<div className="row">
					{fetchTrendingPost.isLoading ? (
						<div className="col-12 mb-4">
							<Loading />
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
												<div className="col-12 col-md-6 col-lg-4 mb-4" key={node.id}>
													<PostCard title={node.title} excerpt={node.excerpt} />
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
							<ListGroup fetchCategory={fetchCategory} />
							<h3 className="my-2">Top tags</h3>
							<Badge as="a" value="Programing" to="/programing" />
							<Badge as="a" value="Software" to="/software" />
						</div>
					</div>
					<div className="col-lg-9 order-lg-1">
						<h1 className="mb-4">New posts</h1>
						<div className="row">
							{fetchPost.isLoading ? (
								<div className="col-12 mb-4">
									<Loading />
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
															<PostCard title={node.title} excerpt={node.excerpt} />
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
			<Footer />
		</>
	);
};

export const getServerSideProps = wrapper.getServerSideProps(async ({ store }) => {
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
	fetchTrendingPostThunk,
	fetchCategoryThunk
};

export default connect(mapStateToProps, mapDispatchToProps)(Index);
