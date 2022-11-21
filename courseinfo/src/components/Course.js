const Header = ({ course }) => <h2>{course}</h2>

// const Total = ({ sum }) => <p>Number of exercises {sum}</p>

const Part = ({ part }) => 
  <p>
    {part.name} {part.exercises}
  </p>

const Content = ({ parts }) => 
<>
    {parts.map(part => <Part key={part.id} part={part} />)}
</>

const Total = ({ parts }) =>
{
	const total = parts.reduce((sum, part) => {
			return (sum + part.exercises);
	}, 0)

	return (	
		<p>Number of exercises: {total} </p>
	)
}

const Course = ({ course }) => {
	return (
	<div>
		<Header course={ course.name } />
		<Content parts={ course.parts } />
		<Total parts={ course.parts } />
	</div>
)}

export default Course;