import './TeamMember.css'

const TeamMember = (props) => {
    const tm_details = [
        { name: "Keval", field: "IT", sem: "4"},
        { name: "Hiren", field: "CS", sem: "4"},
        { name: "Sakshi", field: "IT", sem: "4"},
        { name: "Ayushi", field: "IT", sem: "4"}
    ]

    return(
        <div className='tm-container'>
            <h1>Team members</h1>
            {
                tm_details.map(tm => {
                    return(
                        <div className='slot'>
                            <h2>Name: {tm.name}</h2>
                            <h2>Field: {tm.field}</h2>
                            <h2>Semester: {tm.sem}</h2>
                        </div>
                    )
                })
            }
            <button onClick={() => props.updateRoute('home')}>Next</button>
        </div>
    )
}

export default TeamMember