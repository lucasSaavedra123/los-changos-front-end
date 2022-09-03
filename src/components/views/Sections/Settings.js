import React from 'react';

import { AUTH0_DATABASE_CONNECTION, AUTH0_DOMAIN_URL, AUTH0_CLIENT_ID } from "../../../Constants";
import { useAuth0, User } from "@auth0/auth0-react";


function Settings() {
  var axios = require("axios").default;
  const { user } = useAuth0();

  const save = (e) => {

    var options = {
      method: 'POST',
      url: 'https://'+AUTH0_DOMAIN_URL+'/dbconnections/change_password',
      headers: {'content-type': 'application/json'},
      data: {
        client_id: AUTH0_CLIENT_ID,
        email: user.email,
        connection: 'Username-Password-Authentication'
      }
    };
    
    axios.request(options).then(function (response) {
      console.log(response.data);
    }).catch(function (error) {
      console.error(error);
    });

    e.preventDefault();
    alert("Revisa tu mail!")

  }

  console.log(user)

  return (
    <div className='settings'>
      <h1>Settings</h1>
      <div class="settings-form">
        <form onSubmit={save}>
          <button type="submit">Cambiar Constraseña</button>
        </form>
      </div>
    </div>
  );
}

export default Settings;