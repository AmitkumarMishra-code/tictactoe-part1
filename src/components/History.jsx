export default function History(props){
    return(
        <button onClick = {() => props.method(props.index)}>Move - {props.index}</button>
    )
}