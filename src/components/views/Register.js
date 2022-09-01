import { useState } from "react";
import { Link } from "react-router-dom";
import { AUTH0_DATABASE_CONNECTION, AUTH0_DOMAIN_URL, AUTH0_CLIENT_ID } from "../../CONSTANTS";
import auth0 from "auth0-js"
import Form from '../../utilities/Forms'


const Register = () => {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [validate, setValidate] = useState({});
    const [showPassword, setShowPassword] = useState(false);

    const validateRegister = () => {
        let isValid = true;

        let validator = Form.validator({
            firstName: {
                value: firstName,
                isRequired: true,
                minLength: 2
            },
            lastName: {
                value: lastName,
                isRequired: true,
                minLength: 2
            },
            name: {
                value: name,
                isRequired: true,
            },
            email: {
                value: email,
                isRequired: true,
                isEmail: true
            },
            password: {
                value: password,
                isRequired: true,
                minLength: 6
            }
        });

        if (validator !== null) {
            setValidate({
                validate: validator.errors
            })

            isValid = false
        }
        return isValid;
    }

    const register = (e) => {

        var webAuth = new auth0.WebAuth({
            domain: AUTH0_DOMAIN_URL,
            clientID: AUTH0_CLIENT_ID
        });

        e.preventDefault();

        const validate = validateRegister();

        if (validate) {
            setValidate({});

            e.preventDefault();

            webAuth.signup({
                connection: AUTH0_DATABASE_CONNECTION,
                email: email,
                password: password,
                user_metadata: { first_name: firstName, last_name: lastName }
            }, function (err) {
                if (err) return alert('Something went wrong: ' + err.message);
                return alert('success signup without login!')
            });

        }
    }

    const togglePassword = (e) => {
        if (showPassword) {
            setShowPassword(false);
        } else {
            setShowPassword(true)
        }
    }

    return (
        <div className="row g-0 auth-wrapper">
            <div className="col-12 col-md-5 col-lg-6 h-100 auth-background-col">
                <div className="auth-background-holder"></div>
                <div className="auth-background-mask"></div>
            </div>

            <div className="col-12 col-md-7 col-lg-6 auth-main-col text-center">
                <div className="d-flex flex-column align-content-end">
                    <div className="auth-body mx-auto">
                        <p>Create your Account</p>
                        <div className="auth-form-container text-start">
                            <form className="auth-form" method="POST" onSubmit={register} autoComplete={'off'}>

                                <div className="firstName mb-3">
                                    <input type="text"
                                        className={`form-control ${validate.validate && validate.validate.firstName ? 'is-invalid ' : ''}`}
                                        id="firstName"
                                        name="firstName"
                                        value={firstName}
                                        placeholder="First Name"
                                        onChange={(e) => setFirstName(e.target.value)}
                                    />

                                    <div className={`invalid-feedback text-start ${(validate.validate && validate.validate.firstName) ? 'd-block' : 'd-none'}`} >
                                        {(validate.validate && validate.validate.firstName) ? validate.validate.firstName[0] : ''}
                                    </div>
                                </div>

                                <div className="lastName mb-3">
                                    <input type="text"
                                        className={`form-control ${validate.validate && validate.validate.lastName ? 'is-invalid ' : ''}`}
                                        id="lastName"
                                        name="lastName"
                                        value={lastName}
                                        placeholder="Last Name"
                                        onChange={(e) => setLastName(e.target.value)}
                                    />

                                    <div className={`invalid-feedback text-start ${(validate.validate && validate.validate.lastName) ? 'd-block' : 'd-none'}`} >
                                        {(validate.validate && validate.validate.lastName) ? validate.validate.lastName[0] : ''}
                                    </div>
                                </div>

                                <div className="name mb-3">
                                    <input type="text"
                                        className={`form-control ${validate.validate && validate.validate.name ? 'is-invalid ' : ''}`}
                                        id="name"
                                        name="name"
                                        value={name}
                                        placeholder="Name"
                                        onChange={(e) => setName(e.target.value)}
                                    />

                                    <div className={`invalid-feedback text-start ${(validate.validate && validate.validate.name) ? 'd-block' : 'd-none'}`} >
                                        {(validate.validate && validate.validate.name) ? validate.validate.name[0] : ''}
                                    </div>
                                </div>

                                <div className="email mb-3">
                                    <input type="email"
                                        className={`form-control ${validate.validate && validate.validate.email ? 'is-invalid ' : ''}`}
                                        id="email"
                                        name="email"
                                        value={email}
                                        placeholder="Email"
                                        onChange={(e) => setEmail(e.target.value)}
                                    />

                                    <div className={`invalid-feedback text-start ${(validate.validate && validate.validate.email) ? 'd-block' : 'd-none'}`} >
                                        {(validate.validate && validate.validate.email) ? validate.validate.email[0] : ''}
                                    </div>
                                </div>

                                <div className="password mb-3">
                                    <div className="input-group">
                                        <input type={showPassword ? 'text' : 'password'}
                                            className={`form-control ${validate.validate && validate.validate.password ? 'is-invalid ' : ''}`}
                                            name="password"
                                            id="password"
                                            value={password}
                                            placeholder="Password"
                                            onChange={(e) => setPassword(e.target.value)}
                                        />

                                        <button type="button" className="btn btn-outline-primary btn-sm" onClick={(e) => togglePassword(e)} ><i className={showPassword ? 'far fa-eye' : 'far fa-eye-slash'} ></i> </button>

                                        <div className={`invalid-feedback text-start ${(validate.validate && validate.validate.password) ? 'd-block' : 'd-none'}`} >
                                            {(validate.validate && validate.validate.password) ? validate.validate.password[0] : ''}
                                        </div>
                                    </div>

                                </div>

                                <div className="text-center">
                                    <button type="submit" className="btn btn-primary w-100 theme-btn mx-auto">Sign Up</button>
                                </div>
                            </form>

                            <hr />
                            <div className="auth-option text-center pt-2">Have an account? <Link className="text-link" to="/login" >Sign in</Link></div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Register;