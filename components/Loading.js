import React from 'react';

const Loading = (props) => {
	return (
		<>
			<div className="spinner-grow text-success mr-5" role="status">
				<span className="sr-only">Loading...</span>
			</div>
			<div className="spinner-grow text-success mr-5" role="status">
				<span className="sr-only">Loading...</span>
			</div>
			<div className="spinner-grow text-success mr-5" role="status">
				<span className="sr-only">Loading...</span>
			</div>
		</>
	);
};

export default Loading;
