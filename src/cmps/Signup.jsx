import { useEffect, useState, useRef } from "react"
import { userService } from "../services/user.service"
import { LoadingIcon } from "../assets/icons"
import { NavLink, useNavigate } from "react-router-dom"
import { utilService } from "../services/util.service"
import { Avatar } from "./Avatar"
import { imageUploadService } from "../services/image-upload.service"
import { useSelector } from "react-redux"
import { signup } from "../store/actions/user.actions"

export function Signup() {
    const [passwordButton, setPasswordButton] = useState({display: false, text: 'Show', inputType: 'password'})
    const [signupButton, setSignupButton] = useState({ disable: true, loading: false })
    const [fieldValidation, setFieldValidation] = useState({ 
        contact: {display: false, type: null}, 
        username: {display: false, type: null}, 
        fullname: {display: false, type: null}, 
        password: {display: false, type: null} 
    })
    const [userProfile, setUserProfile] = useState(userService.getDefaultUser())
    const [isUploadingProfilePicture, setIsUploadingProfilePicture] = useState(false)

    const loggedinUser = useSelector(storeState => storeState.userModule.loggedinUser)

    const contactRef = useRef()
    const usernameRef = useRef()
    const fullnameRef = useRef()
    const passwordRef = useRef()
    const fileInputRef = useRef()

    const navigate = useNavigate()

    const STEP_FORM = 1
    const STEP_PROFILE_PICTURE = 2
    const [step, setStep] = useState(STEP_FORM)
    
    const handleInputFocus = (event) => {
        const { name } = event.target
        
        setFieldValidation(
            (prevFieldValidation) => {
                switch (name) {
                    case "contact":                        
                        return { ...prevFieldValidation, contact: { ...prevFieldValidation.contact, display: false } }
                    case "username":                        
                        return { ...prevFieldValidation, username: { ...prevFieldValidation.username, display: false } }
                    case "fullname":                        
                        return { ...prevFieldValidation, fullname: { ...prevFieldValidation.fullname, display: false } }
                    case "password":                        
                        return { ...prevFieldValidation, password: { ...prevFieldValidation.password, display: false } }
                    default:
                        return prevFieldValidation
                }
                
            }
        )
    }

    const handleInputBlur = (event) => {
        const { name, value } = event.target
        
        setFieldValidation(
            (prevFieldValidation) => {
                switch (name) {
                    case "contact":  {
                        const display = value !== ""
                        const type = display 
                                        ? utilService.isValidEmail(value) || utilService.isValidPhoneNumber(value) ? "valid" : "invalid"  
                                        : ""                   
                        return { ...prevFieldValidation, contact: { ...prevFieldValidation.contact, display: display, type: type } }
                    }
                    case "fullname":  {
                        const display = value !== ""
                        const type = display 
                                        ? value.length > 0 ? "valid" : "invalid"  
                                        : ""                   
                        return { ...prevFieldValidation, fullname: { ...prevFieldValidation.fullname, display: display, type: type } }
                    }
                    case "username":  {
                        const display = value !== ""
                        const type = display 
                                        ? utilService.isValidUsername(value) ? "valid" : "invalid"  
                                        : ""                   
                        return { ...prevFieldValidation, username: { ...prevFieldValidation.username, display: display, type: type } }
                    }
                    case "password":  {
                        const display = value !== ""
                        const type = display 
                                        ? utilService.isValidPassword(value) ? "valid" : "invalid"  
                                        : ""                   
                        return { ...prevFieldValidation, password: { ...prevFieldValidation.password, display: display, type: type } }
                    }
                    default:
                        return prevFieldValidation
                }
            }
        )
    }

    useEffect(() => {
        setSignupButton(
            (prevSignupButton) => {
                if (step === STEP_FORM) {
                    const allFieldsValid = Object.values(fieldValidation).every(field => {
                        return field.display === true && field.type === 'valid'
                    })
                    
                    return { ...prevSignupButton, disable: !allFieldsValid, loading: false }
                }
                
                return prevSignupButton
            }
        )
    }, [fieldValidation])

    const handleInputChanged = (event) => {
        const { name, value } = event.target
        
        setUserProfile(
            (prevUserProfile) => {
                return { ...prevUserProfile, contact: contactRef.current.value, fullname: fullnameRef.current.value, username: usernameRef.current.value, password: passwordRef.current.value }
            }
        )

                   
        /*setPasswordButton(
            (prevPasswordButton) => {
                return { ...prevPasswordButton, display: passwordRef.current.value !== '' }
            }
        )*/
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

    const handelOnNext = async (event) => {
        if (signupButton.disable || signupButton.loading) {
            return
        }
        
        if (step == STEP_FORM) {
            setUserProfile(
                (prevUserProfile) => {
                    return { ...prevUserProfile, contact: contactRef.current.value, fullname: fullnameRef.current.value, username: usernameRef.current.value, password: passwordRef.current.value }
                }
            )

            await signup({ contact: contactRef.current.value, fullname: fullnameRef.current.value, username: usernameRef.current.value, password: passwordRef.current.value })
            setStep(STEP_PROFILE_PICTURE)
        }

        if (step == STEP_PROFILE_PICTURE) {

        }
        
                
        /*const userToLogin = { username: usernameRef.current.value }
        const loggedinUser = await userService.login(userToLogin)

        if (loggedinUser) {
            setSignupButton(
                (prevSignupButton) => {
                    return { prevSignupButton, loading: false }
                }
            )
        }*/

        
    }

    const handelOnSkip  = async (event) => {
        navigate("/")
    }
    
    const onAvatarPress = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    }

    async function uploadProfilePicture(ev) {
        setIsUploadingProfilePicture(true)
        const { secure_url, height, width } = await imageUploadService.uploadImg(ev)
        setUserProfile(
            (prevUserProfile) => {
                return { ...prevUserProfile, profilePicture: secure_url }
            }
        )
        setIsUploadingProfilePicture(false)

        setTimeout(() => {
            navigate("/")
        }, 3000)
    }

    const passwordButtonStyle = passwordButton.display ? 'inline' : 'none'
    
    return (
        <>
            <section className="signin">
                {step === STEP_FORM && <article>
                    <i className="logo has-summary" />
                    <div className="summary">
                        Sign up to see photos and videos from your friends.
                    </div>
                    <div className="input">
                        <label>
                            <input value={userProfile.contact} ref={contactRef} onFocus={handleInputFocus} onBlur={handleInputBlur} onChange={handleInputChanged} required autoCapitalize="off" autoCorrect="off" type="text" name="contact"></input>
                            <span>Mobile Number or Email</span>
                            {fieldValidation.contact.display && <span className={`icon ${fieldValidation.contact.type}`} />}
                        </label>
                    </div>
                    <div className="input">
                        <label>
                            <input value={userProfile.fullname} ref={fullnameRef} onFocus={handleInputFocus} onBlur={handleInputBlur} onChange={handleInputChanged} required autoCapitalize="off" autoCorrect="off" type="text" name="fullname"></input>
                            <span>Full Name</span>
                            {fieldValidation.fullname.display && <span className={`icon ${fieldValidation.fullname.type}`} />}
                        </label>
                    </div>
                    <div className="input">
                        <label>
                            <input value={userProfile.username} ref={usernameRef} onFocus={handleInputFocus} onBlur={handleInputBlur} onChange={handleInputChanged} required autoCapitalize="off" autoCorrect="off" maxLength="30" type="text" name="username"></input>
                            <span>Username</span>
                            {fieldValidation.username.display && <span className={`icon ${fieldValidation.username.type}`} />}
                        </label>
                    </div>
                    
                    <div className="input">
                        <label>
                            <input value={userProfile.password} ref={passwordRef} onFocus={handleInputFocus} onBlur={handleInputBlur} onChange={handleInputChanged} aria-label="Password" required autoCapitalize="off" autoCorrect="off" type={passwordButton.inputType} name="password"></input>
                            <span>Password</span>
                            <button type="button" onClick={handleDisplayPasswordChanged} style={{display:passwordButtonStyle}}>{passwordButton.text}</button>
                            {fieldValidation.password.display && <span className={`icon ${fieldValidation.password.type}`} />}
                        </label>
                    </div>

                    <div className="buttons">
                        <button type="submit" disabled={signupButton.disable} onClick={handelOnNext}>
                            {!signupButton.loading && <span>Sign up</span>}
                            {signupButton.loading && <LoadingIcon.button />}
                        </button>
                    </div>
                </article>}
                {step === STEP_PROFILE_PICTURE && <article>
                    <i className="logo" />
                    
                    <main className="upload">
                        <label htmlFor="uploadProfilePicture" className="file-upload">
                            <Avatar disabled={isUploadingProfilePicture} size="huge" hasBorder={false} user={{username: "", imgURL: userProfile.profilePicture}} onPress={onAvatarPress} />
                            <input disabled={isUploadingProfilePicture} type="file" onChange={uploadProfilePicture} accept="image/*,video/*" id="imgUpload" ref={fileInputRef} />
                        </label>
                    </main>
                    
                    <div className="buttons">
                        <button type="submit" disabled={signupButton.disable} onClick={onAvatarPress}>
                            {!signupButton.loading && <span>Upload your profile photo</span>}
                            {signupButton.loading && <LoadingIcon.button />}
                        </button>
                        <button onClick={handelOnSkip}>Skip</button>
                    </div>
                </article>}
                <article>
                    <div>Have an account? <NavLink to="/accounts/login/">Log in</NavLink></div>
                </article>
            </section>
        </>
        
    )
}
