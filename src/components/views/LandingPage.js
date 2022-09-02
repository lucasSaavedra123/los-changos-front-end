import { LEMMA } from "../../Constants";
import { useAuth0 } from "@auth0/auth0-react";
/*import mainLogo from "../../../public/logo192.png";*/

const LandingPage = () => {

    const { loginWithRedirect } = useAuth0();
    const { isAuthenticated } = useAuth0();

    if (isAuthenticated) {
        window.location.href = "./profile"
    }

    return (
        <div className="row g-0 auth-wrapper">
            <div className="col-12 col-md-5 col-lg-6 h-100 auth-background-col">
                <div className="auth-background-holder"></div>
                <div className="auth-background-mask"><p className="auth-lemma">{LEMMA}</p></div>
            </div>

            <div className="col-12 col-md-7 col-lg-6 auth-main-col text-center">
                <div className="d-flex flex-column align-content-end">
                    <div className="auth-body mx-auto">
                        <img src="../../../logo192.png" alt="logo"/>
                        <p>Login to your account or Sign Up</p>
                        <div className="auth-form-container text-start">
                            <div className="text-center">
                                <button type="submit" className="btn btn-primary w-100 theme-btn mx-auto" onClick={() => loginWithRedirect()}>Log In</button>
                                <button type="submit" className="btn btn-primary w-100 theme-btn mx-auto" onClick={() => window.location.href = "./register"}>Sign Up</button>
                        </div>
                        <hr />
                    </div>
                </div>
            </div>
        </div>
        </div >
    );
}

export default LandingPage
