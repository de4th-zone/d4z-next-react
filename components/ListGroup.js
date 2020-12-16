import React from 'react';
import Link from 'next/link';
import Badge from './Badge';

const ListGroup = ({ fetchCategory }) => {
	return (
		<div className="list-group">
			{fetchCategory.category.map((node) => (
				<li className="list-group-item d-flex justify-content-between align-items-center" key={node.id}>
					<Link href={`/categories/${node.id}/${node.slug}`}>
						<a className="text-decoration-none">{node.title}</a>
					</Link>
					<Badge as="span" value={node.total_post} />
				</li>
			))}
		</div>
	);
};

export default ListGroup;
