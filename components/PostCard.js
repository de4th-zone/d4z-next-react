import React from 'react';
import Link from 'next/link';

const PostCard = ({ id, title, excerpt, slug }) => {
	return (
		<div className="card">
			<div className="row no-gutters">
				<div className="col-3">
					<Link href={`/post/${id}/${slug}`}>
						<a className="text-decoration-none">
							<img src="https://placehold.it/666x666" className="img-fluid" alt={title} />
						</a>
					</Link>
				</div>
				<div className="col-9">
					<div className="card-block px-2">
						<Link href={`/post/${id}/${slug}`}>
							<a className="text-decoration-none">
								<h5 className="card-title">{title}</h5>
							</a>
						</Link>
						<p className="card-text">{excerpt}</p>
					</div>
					<div className="px-2">
						<small className="text-muted">Last updated 6 mins ago</small>
					</div>
				</div>
			</div>
		</div>
	);
};

export default PostCard;
