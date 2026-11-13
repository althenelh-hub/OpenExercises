const Header = (headerText) => {
    return (
        <h1>{headerText.name}</h1>
    )
}
const Part = (partInfo) => {
    return (
        <p>{partInfo.name} {partInfo.count}</p>
    )
}
const Course = ({ name, parts }) => {
    return (
        <>
            <Header name={name} />
            {parts.map(part => <Part name={part.name} count={part.exercises} key={part.id} />)}
            <h4>total of {parts.reduce((sum, part) => sum += part.exercises, 0)} exercises</h4>
        </>
    )
}
export default Course