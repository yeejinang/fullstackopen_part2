import React from 'react';

const PersonForm = (props) => {
	return (
		<div>
			<form>
			<div>name: <input onChange={props.handleNameChange}/></div>
			<div>number: <input onChange={props.handleNumberChange} /></div>
			<div>
			<button type="submit" onClick={props.handleSubmit}>add</button>
			</div>
		</form>
		</div>
	);
};

export default PersonForm;
