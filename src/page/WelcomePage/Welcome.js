import './Welcome.css'
import res_1 from '../../res/welcome_page/welcome_res_1.png'

const Welcome = (props) => {
    
    // on press of next button
    const submitHandler = () => {
        const langList = document.getElementById('lang')
        const selectedLang = langList.value

        // call updateLanguage function from App.js
        props.updateLanguage(selectedLang)

        // call updateRoute function from App.js
        props.updateRoute('home')
    }

    return(
        <div className='welcome-page-container'>
            <div className='content'>
                <h1 className='font-raleway-light'>Select a language</h1>

                <select name='language' id='lang' className='font-raleway-medium'>
                    <option value='c'>C</option>
                    <option value='java'>Java</option>
                    <option value='python'>Python</option>
                </select>

                <button onClick={submitHandler} className='font-raleway-medium'>Next</button>
            </div>

            <div className='content-2'>
                <img src={res_1} alt={'res-1'}></img>
            </div>
        </div>
    )
}

export default Welcome