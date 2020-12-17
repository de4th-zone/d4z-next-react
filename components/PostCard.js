import React from 'react';
import Link from 'next/link';
import timeAgo from '../helpers/timeAgo';

const PostCard = ({ title, excerpt, created_at, to, as }) => {
	return (
		<div className="card">
			<div className="row no-gutters">
				<div className="col-3">
					<Link href={to} as={as}>
						<a className="text-decoration-none">
							<img src="https://placehold.it/666x666" className="img-fluid rounded" alt={title} />
						</a>
					</Link>
				</div>
				<div className="col-9">
					<div className="card-block px-2">
						<Link href={to} as={as}>
							<a className="text-decoration-none">
								<h5 className="card-title">{title}</h5>
							</a>
						</Link>
						<p className="card-text">{excerpt}</p>
					</div>
					<div className="px-2">
						<small className="text-muted">{timeAgo(created_at)}</small>
					</div>
				</div>
			</div>
		</div>
	);
};

export default PostCard;
