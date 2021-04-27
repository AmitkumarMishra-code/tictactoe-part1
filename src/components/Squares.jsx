
export default function Squares(props){
    return (
        <button className = 'button' onClick ={() => props.method(props.index)}>{props.value}</button>
    )
}