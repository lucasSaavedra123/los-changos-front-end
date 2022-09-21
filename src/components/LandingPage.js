import "../assets/scss/constants.scss"
import "../assets/scss/landingPage.scss"
import "bootstrap/dist/css/bootstrap.min.css"
import { Navigator } from "./Navigator"
import { LandingPageFront } from "./LandingPageFront"


const LandingPage = () => {

    return (
        <>
            <div className="landing-page" >
                <Navigator />
                <LandingPageFront />
            </div>
        </>
    );

}

export default LandingPage
