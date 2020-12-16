import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Link from 'next/link';

const Other = (props) => {
	useEffect(() => {
		return () => {};
	}, []);

	return (
		<div>
			<Link href='/'>
				<a>Home</a>
			</Link>
		</div>
	);
};

export default connect(null, null)(Other);
