import { LEMMA } from "../../Constants";
import { useAuth0 } from "@auth0/auth0-react";
import { useState } from "react";
import { Spinner } from "reactstrap"
import "bootstrap/dist/css/bootstrap.min.css"
import "../../assets/scss/constants.scss"
import Profile from "./Profile";
/*import mainLogo from "../../../public/logo192.png";*/

const LandingPage = () => {

    const { loginWithRedirect } = useAuth0();
    const { isAuthenticated } = useAuth0();
    const { signUpWithRedirect } = useAuth0();
    const { isLoading, setLoading } = useState(true);

    if (isAuthenticated) {
        return (
            <Profile></Profile>
        )
    } else {
        return (
            <div className="row g-0 auth-wrapper">
                <div className="col-12 col-md-5 col-lg-6 h-100 auth-background-col">
                    <div className="auth-background-holder"></div>
                    <div className="auth-background-mask"><p className="auth-lemma custom-font">{LEMMA}</p></div>
                </div>

                <div className="col-12 col-md-7 col-lg-6 auth-main-col text-center">
                    <div className="d-flex flex-column align-content-end">
                        <div className="auth-body mx-auto">
                            <img src="../../../logo192.png" alt="logo" />
                            <p className="custom-font-light">¡Empeza ahora!</p>
                            <div className="auth-form-container text-start">
                                <div className="text-center">
                                    <button type="submit" className="btn btn-primary w-100 theme-btn mx-auto custom-font-light" onClick={() => loginWithRedirect()}>Iniciar Sesion</button>
                                    {/* <button type="submit" className="btn btn-primary w-100 theme-btn mx-auto" onClick={() => window.location.href = "./register"}>Sign Up</button> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        );
    }




}

export default LandingPage
