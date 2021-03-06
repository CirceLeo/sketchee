import {useState, useContext} from 'react';
import {Navigate} from 'react-router-dom'
import {UserContext} from '../../context/user'

function SignUpForm({closeModal}) {

    const navigate = Navigate
    const [errors, setErrors] = useState([]);
    const [showErrors, setShowErrors] = useState(false);

    const [user, setUser] = useContext(UserContext)
    const [newUserData, setNewUserData] = useState({
        email: '',
        username: '',
        password: '',
        // password_confirm: ''
    })

    function handleNewSignup(event){
        event.preventDefault()
        console.log(newUserData)
        fetch(`/users`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify(newUserData)
        })
        .then( res => {
            if(res.ok){
                res.json().then(userData => {
                    setUser(userData)
                    closeModal()
                    navigate('/play') //TODO: change to play??
                })
            } else {
                res.json().then(response => {
                    console.log(response.errors)
                    setErrors(response.errors)
                    setShowErrors(true)
                })
            }
        })
        // .then( data => console.log(data))
        .catch( error => console.log(error.message));
    }

    function handleFormChange(event){
        setNewUserData({
            ...newUserData,
            [event.target.name] : event.target.value
        })
    }

    // function handleNewSignup(e){
    //     e.preventDefault()
    //     console.log(newUserData)
    // }
    
    return (
        <div>
            <button className='close-button' onClick={closeModal}>X</button>
            {showErrors ? 
                <div className='signup-issues'>
                    <p>{errors}</p>
                    <button onClick={()=>setShowErrors(false)} className='close-button'>X</button>
                </div> 
                : null
            }
            <h3>Welcome to Sketchee! </h3>
            <p>enter a username and password to sign up:</p>
            <form onSubmit={handleNewSignup}>
                <label>Email: </label>
                <input onChange={handleFormChange}  name="email" type="email" value={newUserData.email}/> 
                <br />
                <label>Username: </label>
                <input onChange={handleFormChange} name="username" type='username' value={newUserData.username} />
                <br />
                <label>password: </label>
                <input onChange={handleFormChange} name="password" type='password' value={newUserData.password}/>
                <br/>
                {/* <label>confirm password: </label> 
                <input onChange={handleFormChange} name="password" type='password' value={newUserData.password}/>
                 */}
                <button type="submit">Sign up</button>
            </form>
        </div>

    )
}
export default SignUpForm