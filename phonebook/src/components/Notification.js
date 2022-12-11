const msg = ((error) => ({
	color: error ? 'red' : 'green',
	background: 'lightgrey',
	fontSize: '20px',
	borderStyle: 'solid',
	borderRadius: '5px',
	padding: '10px',
	marginBottom: '10px',
}))

const Notification = ({ message, error }) => {
	if (message === null) {
	  return null
	}
 
	return (
	  <div style={msg(error)}>
		{message}
	  </div>
	)
  }

  export default Notification;