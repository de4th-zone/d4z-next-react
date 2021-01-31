import React from 'react';
import Head from 'next/head';
import { connect } from 'react-redux';
import isEmpty from '../helpers/isEmpty';
import { wrapper } from '../redux/store';
import { fetchTagThunk } from '../redux/thunks/tagThunk';
import { fetchTrendingPostThunk, fetchPostThunk, fetchMorePostThunk } from '../redux/thunks/postThunk';
import { setUserThunk } from '../redux/thunks/authThunk';
import NavBar from '../components/NavBar';
import Carousel from '../components/Carousel';
import PostCard from '../components/PostCard';
import Loading from '../components/Loading';
import Footer from '../components/Footer';
import SideBar from '../components/SideBar';

const Index = ({ login, fetchTag, fetchCategory, fetchTrendingPost, fetchPost, fetchMorePostThunk }) => {
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
				<meta property="og:image" content="https://de4thzone.com/d4z_1.jpg" />
				<meta name="twitter:title" content="Home | De4th Zone" />
				<meta name="twitter:description" content="Website programing, software, hacking,..." />
				<meta name="twitter:url" content="https://de4thzone.com" />
				<meta name="twitter:site" content="https://twitter.com/de4th_zone" />
				<meta name="twitter:creator" content="@de4th_zone" />
				<meta name="twitter:card" content="summary_large_image" />
				<meta name="twitter:image" content="https://de4thzone.com/d4z_1.jpg" />
			</Head>
			<NavBar fetchCategory={fetchCategory} login={login} />
			<Carousel />
			<div className="container">
				<h1 className="my-4">Trending posts</h1>
				<div className="row">
					{isEmpty(fetchTrendingPost.post) ? (
						<div className="col-12 mb-4">No posts</div>
					) : (
						<>
							{fetchTrendingPost.post.map((node) => (
								<div className="col-12 col-md-6 col-lg-4 mb-4" key={node.id}>
									<PostCard
										title={node.title}
										excerpt={node.excerpt}
										created_at={node.created_at}
										to="/post/[id]/[slug]"
										as={`/post/${node.id}/${node.slug}`}
									/>
								</div>
							))}
						</>
					)}
				</div>
				<div className="row">
					<div className="col-lg-3 order-lg-2">
						<SideBar fetchCategory={fetchCategory} fetchTag={fetchTag} />
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
															<PostCard
																title={node.title}
																excerpt={node.excerpt}
																created_at={node.created_at}
																to={`/post/${node.id}/${node.slug}`}
															/>
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

export const getServerSideProps = wrapper.getServerSideProps(async (ctx) => {
	await setUserThunk(ctx);
	await ctx.store.dispatch(fetchTagThunk());
	await ctx.store.dispatch(fetchTrendingPostThunk());
	await ctx.store.dispatch(fetchPostThunk());
});

const mapStateToProps = (state) => ({
	login: state.auth.login,
	fetchCategory: state.categories.fetchCategory,
	fetchTag: state.tags.fetchTag,
	fetchTrendingPost: state.posts.fetchTrendingPost,
	fetchPost: state.posts.fetchPost
});

const mapDispatchToProps = {
	fetchMorePostThunk
};

export default connect(mapStateToProps, mapDispatchToProps)(Index);
