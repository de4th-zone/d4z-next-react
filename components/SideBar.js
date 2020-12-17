import React from 'react';
import ListGroup from './ListGroup';
import Badge from './Badge';

const SideBar = ({ fetchCategory, fetchTag }) => {
	return (
		<div className="sticky-top">
			<h3 className="mb-2">Categories{process.env.API_URL}</h3>
			<ListGroup fetchCategory={fetchCategory} />
			<h3 className="my-2">Top tags</h3>
			{fetchTag.tag.map((node) => (
				<Badge as="a" value={node.title} to={`/tag/${node.id}/${node.slug}`} key={node.id} />
			))}
		</div>
	);
};

export default SideBar;
