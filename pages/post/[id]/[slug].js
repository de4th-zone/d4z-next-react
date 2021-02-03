import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { wrapper } from '../../../redux/store';
import { fetchTagThunk } from '../../../redux/thunks/tagThunk';
import { singlePostThunk } from '../../../redux/thunks/postThunk';
import { fetchCategoryThunk } from '../../../redux/thunks/categoryThunk';
import MainLayout from '../../../layouts/MainLayout';
import SideBar from '../../../components/SideBar';
import moment from 'moment';
import Authentication from '../../../helpers/Authentication';

const SinglePost = ({ fetchCategory, fetchTag, singlePost }) => {
	const router = useRouter();

	return (
		<>
			<MainLayout>
				<div className="container">
					<ol className="breadcrumb my-4">
						<li className="breadcrumb-item">
							<Link href="/">
								<a>Home</a>
							</Link>
						</li>
						<li className="breadcrumb-item active">{singlePost.post.title}</li>
					</ol>
					<div className="row">
						<div className="col-lg-9">
							<h1 className="mb-3">{singlePost.post.title}</h1>
							<div className="user-post clearfix mb-4">
								<div className="float-left mr-2">
									<Link href="/">
										<a className="text-decoration-none">
											<img src="https://placehold.it/66x66" className="img-fluid rounded-circle" alt />
										</a>
									</Link>
								</div>
								<div className="float-left">
									<div className="card-block">
										<Link href="/">
											<a className="text-decoration-none">
												<h6 className="mb-0">
													{singlePost.post.user.last_name} {singlePost.post.user.first_name}
												</h6>
											</a>
										</Link>
										<div className="user mb-0">
											<small>Position: {singlePost.post.user.role.title}</small>
										</div>
										<div className="time text-muted">
											<small>
												Posted on {moment(singlePost.post.created_at).format('dddd, MMMM Do YYYY, h:mm:ss A')}
											</small>
										</div>
									</div>
								</div>
							</div>
							<div dangerouslySetInnerHTML={{ __html: singlePost.post.content }} />
							<hr />
							<div className="card my-4">
								<h5 className="card-header">Leave a Comment:</h5>
								<div className="card-body">
									<form>
										<div className="form-group">
											<textarea className="form-control" rows={3} defaultValue={''} />
										</div>
										<button type="submit" className="btn btn-primary">
											Submit
										</button>
									</form>
								</div>
							</div>
							{/* Single Comment */}
							<div className="media mb-4">
								<img className="d-flex mr-3 rounded-circle" src="http://placehold.it/50x50" alt />
								<div className="media-body">
									<h5 className="mt-0">Beta test</h5>
									Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. Cras purus
									odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate
									fringilla. Donec lacinia congue felis in faucibus.
								</div>
							</div>
							{/* Comment with nested comments */}
							<div className="media mb-4">
								<img className="d-flex mr-3 rounded-circle" src="http://placehold.it/50x50" alt />
								<div className="media-body">
									<h5 className="mt-0">Beta test</h5>
									Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. Cras purus
									odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate
									fringilla. Donec lacinia congue felis in faucibus.
									<div className="media mt-4">
										<img className="d-flex mr-3 rounded-circle" src="http://placehold.it/50x50" alt />
										<div className="media-body">
											<h5 className="mt-0">Beta test</h5>
											Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. Cras
											purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi
											vulputate fringilla. Donec lacinia congue felis in faucibus.
										</div>
									</div>
									<div className="media mt-4">
										<img className="d-flex mr-3 rounded-circle" src="http://placehold.it/50x50" alt />
										<div className="media-body">
											<h5 className="mt-0">Beta test</h5>
											Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. Cras
											purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi
											vulputate fringilla. Donec lacinia congue felis in faucibus.
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className="col-lg-3">
							<SideBar fetchCategory={fetchCategory} fetchTag={fetchTag} />
						</div>
					</div>
				</div>
			</MainLayout>
		</>
	);
};

SinglePost.getInitialProps = async (ctx) => {
	await ctx.store.dispatch(fetchCategoryThunk());
	await ctx.store.dispatch(fetchTagThunk());
	await ctx.store.dispatch(singlePostThunk(ctx.query.id));
};

const mapStateToProps = (state) => ({
	fetchCategory: state.categories.fetchCategory,
	fetchTag: state.tags.fetchTag,
	singlePost: state.posts.singlePost
});

const mapDispatchToProps = {};

export default Authentication(connect(mapStateToProps, mapDispatchToProps)(SinglePost));
