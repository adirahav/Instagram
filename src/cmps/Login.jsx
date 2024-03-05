import { useEffect, useState, useRef } from "react"
import { userService } from "../services/user.service"
import { LoadingIcon } from "../assets/icons"
import { login } from "../store/actions/user.actions"
import { NavLink, useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"

export function Login() {
    const [passwordButton, setPasswordButton] = useState({display: false, text: 'Show', inputType: 'password'})
    const [loginButton, setLoginButton] = useState({ disable: true, loading: false })
    const loggedinUser = useSelector(storeState => storeState.userModule.loggedinUser)
    const usernameRef = useRef()
    const passwordRef = useRef()
    const navigator = useNavigate()

    useEffect(() => {
        if (loggedinUser && window.location.hash !== "#/") {
            navigator("/")
        }
    }, [loggedinUser])

    const handleInputChanged = (event) => {
        setLoginButton(
            (prevLoginButton) => {
                if (usernameRef.current.value === "adirahav" && passwordRef.current.value === "123456") {
                    return { ...prevLoginButton, disable: false }
                }
                else {
                    return { ...prevLoginButton, disable: true, loading: false }
                }
            }
        )

        setPasswordButton(
            (prevPasswordButton) => {
                return { ...prevPasswordButton, display: passwordRef.current.value !== '' }
            }
        )
    }

    const handleDisplayPasswordChanged = (event) => {
        setPasswordButton(
            (prevPasswordButton) => {
                if (prevPasswordButton.display) {
                    if (prevPasswordButton.text === "Show") {
                        return { ...prevPasswordButton, text: "Hide", inputType: 'text' }
                    }
                    else {
                        return { ...prevPasswordButton, text: "Show", inputType: 'password' }
                    }
                }
                return prevPasswordButton
            }
        )
    }

    const handelOnSubmit = async (event) => {
        if (loginButton.disable || loginButton.loading) {
            return;
        }
        
        setLoginButton({ ...loginButton, loading: true })

        await login({fullname: usernameRef.current.value, password: passwordRef.current.value})
    }

    const passwordButtonStyle = passwordButton.display ? 'inline' : 'none'
    
    return (
        <>
            <section className="signin">
                <article>
                    <i className="logo" />
                    <div className="input">
                        <label>
                            <input ref={usernameRef} onChange={handleInputChanged} required autoCapitalize="off" autoCorrect="off" maxLength="75" type="text" name="username"></input>
                            <span>Phone number, username, or email</span>
                        </label>
                    </div>
                    
                    <div className="input">
                        <label>
                            <input ref={passwordRef} onChange={handleInputChanged} required autoCapitalize="off" autoCorrect="off" type={passwordButton.inputType} name="password"></input>
                            <span>Password</span>
                            <button type="button" onClick={handleDisplayPasswordChanged} style={{display:passwordButtonStyle}}>{passwordButton.text}</button>
                        </label>
                    </div>

                    <div className="buttons">
                        <button type="submit" disabled={loginButton.disable} onClick={handelOnSubmit}>
                            {!loginButton.loading && <span>Log in</span>}
                            {loginButton.loading && <LoadingIcon.button />}
                        </button>
                    </div>
                </article>
                <article>
                    <div>Don't have an account? <NavLink to="/accounts/emailsignup/">Sign up</NavLink></div>
                </article>
            </section>
        </>
        
    )
}
