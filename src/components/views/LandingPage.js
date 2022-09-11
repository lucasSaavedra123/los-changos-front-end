import { useAuth0 } from "@auth0/auth0-react";
import "bootstrap/dist/css/bootstrap.min.css"
import "../../assets/scss/constants.scss"
import "../../assets/scss/landingPage.scss"
import { Navigator } from "../Navigator"
import { LandingPageFront } from "../LandingPageFront"
import Profile from "./Profile";
/*import mainLogo from "../../../public/logo192.png";*/

const LandingPage = () => {

    const { isAuthenticated } = useAuth0();

    if (isAuthenticated) {
        return (
            <Profile>
                
            </Profile>
        )
    } else {
        return (
            <>
                <div class="landing-page" >
                    <Navigator />
                    <LandingPageFront />
                </div>
            </>
        );
    }


}

export default LandingPage
