import React from 'react';

const Filter = (props) => {
	return (
		<div>
			<p>filter shown with <input onChange={props.handleFilter}/></p>
		</div>
	);
};

export default Filter;
