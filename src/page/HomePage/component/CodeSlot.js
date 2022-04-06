import './CodeSlot.css'

const CodeSlot = (props) => {
    return(
        <div className='code-slot'>
            <h3 className='font-roboto new-line'>{props.code}</h3>
        </div>
    )
}

export default CodeSlot