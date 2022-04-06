import './App.css';

// Hooks
import { useState, useEffect } from 'react';

// Pages
import Welcome from './page/WelcomePage/Welcome';
import Home from './page/HomePage/Home';

// Packages
import commandParser from './package/commandParser';

const App = () => {
    // ** Data **
    const [route,updateRoute] = useState('welcome') // routes: welcome page, home
    const [language,updateLanguage] = useState('c') // C, Java, Python 
    const [code,addCode] = useState([]) // array of code (proper syntax)

    // command parser package
    const cmdParser = new commandParser()

    // adding code 
    const addCodeHandler = (p_unfilteredCode) => {
        // spliting code
        const unfilteredCodeGroup = cmdParser.splitUnfilteredCode(p_unfilteredCode)

        // filtering code
        const filteredCodeGroup = cmdParser.filterCode(unfilteredCodeGroup)
        console.log(filteredCodeGroup)
        // generate syntax
        const pureCode = cmdParser.generateSyntax(filteredCodeGroup)

        addCode(prevCode => {
            return [...prevCode,pureCode]
        })
    }

    //#region temp
    const temp_code = "show hello world and show creative things and loop until 2 is bigger than 5 and create function loopingThrough"
    const temp_code_2 = "show no shit taken and loop from 5 to 2 and create function loopingThroughAgain"

    const [temp_b,temp_b_handler] = useState(false)

    useEffect(() => {
        if (!temp_b){
            addCodeHandler(temp_code)
            addCodeHandler(temp_code_2)
            
            temp_b_handler(true)
        }
    })
    //#endregion


    return(
        <div className='App'>
            {
                route === 'welcome'
                ?
                    <Welcome updateRoute={updateRoute} updateLanguage={updateLanguage}/>
                :
                route === 'home'
                ?
                    <Home code={code} addCodeHandler={addCodeHandler}/>
                :
                    alert("Route error, reload the page!")
            }
        </div>
    )
}

export default App;
