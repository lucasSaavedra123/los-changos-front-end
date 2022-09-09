import { LEMMA } from "../../CONSTANTS";
import { useAuth0 } from "@auth0/auth0-react";
import { useState } from "react";
import { Spinner } from "reactstrap"
import "bootstrap/dist/css/bootstrap.min.css"
import "../../assets/scss/constants.scss"
import { Navigator } from "../Navigator"
import { LandingPageFront } from "../LandingPageFront"
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
            <>
                <div class="landing-page">
                    <Navigator />
                    <LandingPageFront />
                </div>
            </>
        );
    }


}

export default LandingPage
