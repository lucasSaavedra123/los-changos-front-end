import { useAuth0 } from "@auth0/auth0-react";
import "bootstrap/dist/css/bootstrap.min.css"
import "../../assets/scss/constants.scss"
import "../../assets/scss/landingPage.scss"
import { Navigator } from "../Navigator"
import { LandingPageFront } from "../LandingPageFront"
import {Profile} from "./Profile";

import { SpinnerDiamond } from 'spinners-react';


const LandingPage = () => {

    const { isAuthenticated } = useAuth0();
    const isLoading = useAuth0().isLoading;

    const conditionalView = isAuthenticated ?
        <Profile/>
        :
        <>
            <div class="landing-page" >
                <Navigator />
                <LandingPageFront />
            </div>
        </>

    if(isLoading){
        return(
            <div className="center">
            <SpinnerDiamond size={80} enabled={true} secondaryColor="#FFFFFF" color="#A6FF00"/>
            </div>
        )
    }else{
        return(conditionalView)
    }

}

export default LandingPage
