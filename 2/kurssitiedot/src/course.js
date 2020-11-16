const Part = (props) => {
  return (
    <div>
      <p>
        {props.part.name} {props.part.exercises}
      </p>
  </div>
  )
}

const Header = (props) => {
  return (
    <div>
      <h1>{props.course}</h1>
    </div>
  )
}

const Content = ({parts}) => {
  return (
    <div>
      {parts.map((part, i) => <Part key={part.id} part={part} /> )}
    </div>
  )
}

const sumExercises = (parts) => {
  const tot = parts.reduce((acc, currentValue) => ({ exercises: acc.exercises + currentValue.exercises }));
  return tot.exercises;
}

const Total = ({ parts }) => {
  return (
    <div>
      <p>
        <b>total of {sumExercises(parts)} exercises</b>
      </p>
    </div>
  )
}

const Course = ({ course }) => {
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts}/>
      <Total parts={course.parts}/>
    </div>
  )
}

const Courses = ({ courses }) => {
  return (
    <div>
      {courses.map((course) => <Course key={course.id} course={course} />)}
    </div>
  )
}

export default Courses