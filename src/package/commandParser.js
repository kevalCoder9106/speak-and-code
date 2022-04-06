class commandParser{
    // split unfiltered code
    splitUnfilteredCode(p_unfilteredCode){
        const unfilteredCodeGroup = p_unfilteredCode.split("and")

        return unfilteredCodeGroup
    }

    // filter code
    filterCode(p_splitUnfilteredCode){
        const filteredCode = []
        let maxSimilarPrioritiesDetected = false

        p_splitUnfilteredCode.map(code => {
            // removing space from start of code
            const f_code = code.replace(/^\s+|\s+$/g, '').replace(/\s+$/g, '')
            
            // splitting code into groups to identfy its type
            const codeGroup = f_code.split(" ")
            let isAbandoned = false
            const codeObj = {
                type: '',
                priority: '',
                code: ''
            }

            // checking type of code
            if (codeGroup[0] === 'show' || codeGroup[0] === 'print' || codeGroup[0] === 'display'){
                // its a print statement
                codeObj.type = 'print'
                codeObj.priority = 0
            }
            else if (codeGroup[0] === 'loop' && !maxSimilarPrioritiesDetected){
                // its a loop now identifying which loop
                if (codeGroup[1] === 'from'){
                    // for loop
                    codeObj.type = 'for-loop'
                    codeObj.priority = 1
                    maxSimilarPrioritiesDetected = true
                }
                else if (codeGroup[1] === 'until' && !maxSimilarPrioritiesDetected){
                    // while loop
                    codeObj.type = 'while-loop'
                    codeObj.priority = 1
                    maxSimilarPrioritiesDetected = true
                }
                else{
                    isAbandoned = true
                }
            }
            else if (codeGroup[0] === 'if' && !maxSimilarPrioritiesDetected){
                // if statement
                codeObj.type = 'if'
                codeObj.priority = 1
                maxSimilarPrioritiesDetected = true
            }
            else if (codeGroup[0] === 'create' && codeGroup[1] === 'function'){
                // a function
                codeObj.type = 'function'
                codeObj.priority = 2
            }
            else{
                isAbandoned = true
            }

            // if code isnt abandoned which means there is no command error then attach the code and add it to filteredCode
            if (!isAbandoned){
                codeObj.code = f_code
                filteredCode.push(codeObj)
            }
        })

        return filteredCode
    }

    generateSyntax(filteredCode){
        const priorityGroup = []

        // extracting priority of group
        filteredCode.map(c => {
            priorityGroup.push(c.priority)
        })

        // checking levels
        const level_2 = priorityGroup.includes(2)
        const level_1 = priorityGroup.includes(1)
        const level_0 = priorityGroup.includes(0)

        if (level_2){
            let pureCode = ''

            // generating syntax for level 2
            pureCode += this.levelTwoSyntax(filteredCode)

            // generating syntax for level 1 if exist
            pureCode += this.levelOneSyntax(filteredCode)

            // generating syntax for level 0 if exist
            pureCode += this.levelZeroSyntax(filteredCode)

            pureCode += "} \n }"

            return pureCode
        }
        else if(level_1){
            let pureCode = ''

            // generating syntax for level 1
            pureCode += this.levelOneSyntax(filteredCode)

            console.log(pureCode)

            // generating syntax for level 0 if exist
            pureCode += this.levelZeroSyntax(filteredCode,true,false)

            pureCode += '}'

            return pureCode
        }
        else if(level_0){
            // generating syntax for level 0
            const pureCode = this.levelZeroSyntax(filteredCode)

            return pureCode
        }
    }


    // function to generate level zero syntax
    levelZeroSyntax(filterCode){
        const pureCodeGroup = []

        filterCode.map(f_code => {
            let pureCode = ""

            // if filtered code priority is level 0
            if (f_code.priority === 0){
                // according to the type of code
                switch(f_code.type){
                    
                    // **** print **** //

                    case 'print': 
                        let temp = 0 // to skip the first word
                        // splitting code
                        const codeSplitGroup = f_code.code.split(" ")
                        // for c
                        pureCode = pureCode + 'printf("'
                        
                        codeSplitGroup.map(c => {
                            // adding the print text to syntax

                            if (temp > 0){ // skipping first word
                                pureCode = pureCode + c + " "
                            }
                            temp++
                        })

                        pureCode = pureCode + '"); \n '

                        pureCodeGroup.push(pureCode)
                    break
                }
            }
        })

        // adding all code together
        let pureCode = ""
        pureCodeGroup.map(c => {
            pureCode += c
        })

        return pureCode
    }

    levelOneSyntax(filterCode){
        const pureCodeGroup = []

        filterCode.map(f_code => {
            let pureCode = ""

            // if filtered code priority is level 1
            if (f_code.priority === 1){
                let temp = 0 // to skip the words
                // splitting code
                const codeSplitGroup = f_code.code.split(" ")

                // according to the type of code
                switch(f_code.type){

                    // **** for loop **** //
                    case 'for-loop':
                        // extracting from and to 
                        let from = parseInt(codeSplitGroup[2])
                        let to = parseInt(codeSplitGroup[4])

                        if (from <= to){ 
                            pureCode = 'for(int i = ' + from + '; i <= ' + to + '; i++){ \n'
                        }
                        else if (from > to){
                            pureCode = 'for(int i = ' + from + '; i >= ' + to + '; i++){ \n'
                        }

                        pureCodeGroup.push(pureCode)
                        break
                    
                    // **** while loop **** //
                    case 'while-loop':
                        pureCode = 'while('
                        let condition = ''

                        codeSplitGroup.map(c => {
                            if (temp > 1){ // skipping first 2 words
                                condition += (c + ' ')        
                            }
                            temp++
                        })

                        pureCode += (condition + '){ \n')

                        pureCodeGroup.push(pureCode)
                        break
                    
                    // **** if condition **** //
                    case 'if':
                        pureCode = 'if('
                        let condition_2 = ''

                        codeSplitGroup.map(c => {
                            if (temp > 1){ // skipping first 2 words
                                condition_2 += (c + ' ')        
                            }
                            temp++
                        })

                        pureCode += (condition_2 + '){ \n')

                        pureCodeGroup.push(pureCode)
                        break
                }
            }
        })
        
        return pureCodeGroup[0]
    }

    levelTwoSyntax(filterCode){
        const pureCodeGroup = []

        filterCode.map(f_code => {
            let pureCode = ""

            // if filtered code priority is level 1
            if (f_code.priority === 2){
                // splitting code
                const codeSplitGroup = f_code.code.split(" ")

                // according to the type of code
                switch(f_code.type){
                    case 'function':
                        const function_name = codeSplitGroup[2]
                        pureCode = 'void ' + function_name + '(){ \n'
                        pureCodeGroup.push(pureCode)
                        
                        break
                }
            }
        })

        return pureCodeGroup[0]
    }
}

export default commandParser