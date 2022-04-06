import './Home.css'

// ** Components **
import CodeSlot from './component/CodeSlot'
import { keyboard } from '@testing-library/user-event/dist/keyboard'

const Home = (props) => {
    return(
        <div className='home-container'>
            <header>
                <h1 className='font-raleway-light'>Speak and Code</h1>
            </header>

            <div className='editor-container'>
                <div className='code-container'>
                    {
                        props.code.map(c => {
                            return <CodeSlot code={c}/>
                        })
                    }
                </div>
                <textarea placeholder='console' className='output-container'>
                    
                </textarea>
            </div>
        </div>
    )
}

export default Home