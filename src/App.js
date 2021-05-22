import React, { Component } from 'react';
import './App.css';
import firebase from 'firebase'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'

firebase.initializeApp({
    apiKey:'AIzaSyCFz9IGcil57_xnBwRWHDtKgwSyMtQ-olg',
    authDomain:'fir-auth-4c7dc.firebaseapp.com'
})

class App extends Component{
    state = {isSignedIn : false}
    uiConfig = {
        signInFlow: 'popup',
        signInOptions:[
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID
        ],
        callbacks:{
            signInSuccess: () => false
        }
    }
    componentDidMount = ()=>{
        
        firebase.auth().onAuthStateChanged(user=>{
            this.setState({isSignedIn : !!user})
            console.log('user',user)
        })
    }
    render(){
        return(
            <div className='a container'>
                <div className='ui inverted segment'>
                <h1>Join Medium</h1>
                <div >
                    {this.state.isSignedIn ?(
                    <span>
                        <div>Signed In </div>
                        <button onClick={()=> firebase.auth().signOut()}>Sign out</button>
                        <h1>Welcome {firebase.auth().currentUser.displayName}</h1>
                    </span>
                    ) : (
                      
                        <StyledFirebaseAuth
                        uiConfig={this.uiConfig}
                        firebaseAuth = {firebase.auth()}
                        />
                        
                    )
                    }
                    <div className='sign'>
                        <h4>Already have an account? Sign in</h4>
                    </div>
                    <div className='sign1'>
                        <p>Click “Sign Up” to agree to Medium’s Terms of Service 
                         <p>and acknowledge that Medium’s Privacy Policy applies </p>
                            to you.</p>
                    </div>
                </div>
             </div>
        </div>

        )
    }
}
export default App