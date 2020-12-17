import React from 'react';
import { connect } from 'react-redux';
import Link from 'next/link';
import { wrapper } from '../../../redux/store';
import { fetchCategoryThunk } from '../../../redux/thunks/categoryThunk';
import { fetchTagThunk } from '../../../redux/thunks/tagThunk';
import { singlePostThunk } from '../../../redux/thunks/postThunk';
import NavBar from '../../../components/NavBar';
import Footer from '../../../components/Footer';
import SideBar from '../../../components/SideBar';
import moment from 'moment';

const SinglePost = ({ fetchCategory, fetchTag, singlePost }) => {
	return (
		<>
			<NavBar fetchCategory={fetchCategory} />
			<div className="container">
				<ol className="breadcrumb mt-4">
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
						<div className="clearfix mb-4">
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
											<h6>
												{singlePost.post.user.last_name} {singlePost.post.user.first_name}
											</h6>
										</a>
									</Link>
									<div className="mb-0">Position: {singlePost.post.user.role.title}</div>
									<div className="text-muted">
										<small>
											Posted on {moment(singlePost.post.created_at).format('dddd, MMMM Do YYYY, h:mm:ss A')}
										</small>
									</div>
								</div>
							</div>
						</div>
						<p className="lead">
							Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ducimus, vero, obcaecati, aut, error quam
							sapiente nemo saepe quibusdam sit excepturi nam quia corporis eligendi eos magni recusandae laborum minus
							inventore?
						</p>
						<p>
							Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut, tenetur natus doloremque laborum quos iste
							ipsum rerum obcaecati impedit odit illo dolorum ab tempora nihil dicta earum fugiat. Temporibus,
							voluptatibus.
						</p>
						<p>
							Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos, doloribus, dolorem iusto blanditiis unde
							eius illum consequuntur neque dicta incidunt ullam ea hic porro optio ratione repellat perspiciatis. Enim,
							iure!
						</p>
						<blockquote className="blockquote">
							<p className="mb-0">
								Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.
							</p>
							<footer className="blockquote-footer">
								Someone famous in
								<cite title="Source Title">Source Title</cite>
							</footer>
						</blockquote>
						<p>
							Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error, nostrum, aliquid, animi, ut quas placeat
							totam sunt tempora commodi nihil ullam alias modi dicta saepe minima ab quo voluptatem obcaecati?
						</p>
						<p>
							Lorem ipsum dolor sit amet, consectetur adipisicing elit. Harum, dolor quis. Sunt, ut, explicabo, aliquam
							tenetur ratione tempore quidem voluptates cupiditate voluptas illo saepe quaerat numquam recusandae? Qui,
							necessitatibus, est!
						</p>
						<hr />
						{/* Comments Form */}
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
								<h5 className="mt-0">Commenter Name</h5>
								Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. Cras purus
								odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate
								fringilla. Donec lacinia congue felis in faucibus.
							</div>
						</div>
						{/* Comment with nested comments */}
						<div className="media mb-4">
							<img className="d-flex mr-3 rounded-circle" src="http://placehold.it/50x50" alt />
							<div className="media-body">
								<h5 className="mt-0">Commenter Name</h5>
								Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. Cras purus
								odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate
								fringilla. Donec lacinia congue felis in faucibus.
								<div className="media mt-4">
									<img className="d-flex mr-3 rounded-circle" src="http://placehold.it/50x50" alt />
									<div className="media-body">
										<h5 className="mt-0">Commenter Name</h5>
										Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. Cras
										purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi
										vulputate fringilla. Donec lacinia congue felis in faucibus.
									</div>
								</div>
								<div className="media mt-4">
									<img className="d-flex mr-3 rounded-circle" src="http://placehold.it/50x50" alt />
									<div className="media-body">
										<h5 className="mt-0">Commenter Name</h5>
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

			<Footer />
		</>
	);
};

export const getServerSideProps = wrapper.getServerSideProps(async ({ store, params }) => {
	await store.dispatch(fetchCategoryThunk());
	await store.dispatch(fetchTagThunk());
	await store.dispatch(singlePostThunk(params.id));
});

const mapStateToProps = (state) => ({
	fetchCategory: state.categories.fetchCategory,
	fetchTag: state.tags.fetchTag,
	singlePost: state.posts.singlePost
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(SinglePost);
