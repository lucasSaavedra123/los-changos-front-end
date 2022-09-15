import { useAuth0 } from "@auth0/auth0-react";
import "../../assets/scss/constants.scss"
import "../../assets/scss/landingPage.scss"
import "bootstrap/dist/css/bootstrap.min.css"
import { Navigator } from "../Navigator"
import { NavigatorLoading } from "../NavigatorLoading"
import { LandingPageFront } from "../LandingPageFront"
import { withAuthenticationRequired } from "@auth0/auth0-react";

import { SpinnerDiamond } from 'spinners-react';
import { Redirect } from 'react-router-dom';


const LandingPage = () => {

    const { isAuthenticated } = useAuth0();
    const isLoading = useAuth0().isLoading;


    const conditionalView = isAuthenticated ?
        <Redirect to="/profile/home" />
        :
        <>
            <div className="landing-page" >
                <Navigator />
                <LandingPageFront />
            </div>
        </>

    if(isLoading){
        return(
            <>
            <NavigatorLoading />
            <div className="center">
            <SpinnerDiamond size={80} enabled={true} secondaryColor="#FFFFFF" color="#A6FF00"/>
            </div>
            </>
        )
    }else{
        return(conditionalView)
    }

}

export default LandingPage
