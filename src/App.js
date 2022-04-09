import './App.css';
//import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

// Hooks
import { useState, useEffect } from 'react';

// Pages
import Welcome from './page/WelcomePage/Welcome';
import Home from './page/HomePage/Home';
import TeamMember from './page/TeamMembersPage/TeamMember';

// Packages
import commandParser from './package/commandParser';

const App = () => {
    // ** Data **
    const [route,updateRoute] = useState('welcome') // routes: welcome page, home
    const [language,updateLanguage] = useState('c') // C, Java, Python 
    const [code,addCode] = useState([]) // array of code (proper syntax)
    const [output,updateOutput] = useState("") // will store output

    // command parser package
    const cmdParser = new commandParser()

    // adding code 
    const addCodeHandler = (p_unfilteredCode) => {
        // spliting code
        const unfilteredCodeGroup = cmdParser.splitUnfilteredCode(p_unfilteredCode)
        console.log("Unfiltered code: " + unfilteredCodeGroup)
        
        // filtering code
        const filteredCodeGroup = cmdParser.filterCode(unfilteredCodeGroup)
        console.log("Filtered code: " + filteredCodeGroup)

        // generate syntax
        const pureCode = cmdParser.generateSyntax(filteredCodeGroup)

        addCode(prevCode => {
            return [...prevCode,pureCode]
        })
    }

    // getting output
    const outputHandler = () => {
        var f_code = "#include<stdio.h> \nvoid main() { \n"

        code.map(c => {
            f_code += c + "\n"
        })

        f_code += " }"

        fetch('http://localhost:2000/get_output',{
            method: 'post',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({ code:f_code })
        })
        .then(res => res.json())
        .then(result => updateOutput(result.output))
    }

    //#region temp
    const temp_code = "show hello world and show creative things and loop from 5 to 10"

    const [temp_b,temp_b_handler] = useState(false)

    useEffect(() => {
        if (!temp_b){
            addCodeHandler(temp_code)
            
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
                route === 'tm'
                ?
                    <TeamMember updateRoute={updateRoute}/>
                :
                route === 'home'
                ?
                    <Home code={code} addCodeHandler={addCodeHandler} outputHandler={outputHandler} output={output}/>
                :
                    alert("Route error, reload the page!")
                    
            }
        </div>
    )
}

export default App;
