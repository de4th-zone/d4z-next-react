import React from 'react';
import Link from 'next/link';

const Badge = ({ as, value, to }) => {
	if (as === 'a') {
		return (
			<Link href={to}>
				<a className="badge badge-light p-2 mb-2 mr-2">{value}</a>
			</Link>
		);
	} else if (as === 'span') {
		return <span className="badge badge-default badge-pill">{value}</span>;
	}
};

export default Badge;
