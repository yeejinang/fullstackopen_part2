import React from 'react';

const Filter = (props) => {
	return (
		<div>
			<p>filter shown with <input onChange={e => props.setFilter(e.target.value)}/></p>
		</div>
	);
};

export default Filter;
