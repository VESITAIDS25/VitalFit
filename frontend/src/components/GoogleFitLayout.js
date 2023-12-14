import React, { useState, useEffect, Children } from 'react';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
// import logoo from './logoo.png';
import { gapi } from 'gapi-script';
import { SetCookie, DeleteCookie, hasCookie } from './Utility/CookieManager';
import 'react-datepicker/dist/react-datepicker.css';

export default function GoogleFitLayout({Children}) {
  const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
  const [user, setUser] = useState({ haslogin: false, accessToken: '' });

  useEffect(() => {
    const cookieObject = hasCookie();
    if (cookieObject.haslogin) {
      setUser({
        ...cookieObject,
      });
    }
  }, []);

  gapi.load('client:auth2', () => {
    gapi.client.init({
      clientId: '689241040717-tf0n34mt2bfeb2e33ai64ffbihv6fpnd.apps.googleusercontent.com',
      plugin_name: 'chat',
      scope: "email",
      scope: 'https://www.googleapis.com/auth/fitness.activity.read',
    });
  });

  function login(response) {
    if (response.accessToken) {
      setUser({
        ...response.profileObj,
        haslogin: true,
        accessToken: response.accessToken,
      });
    }
    SetCookie({
      ...response.profileObj,
      accessToken: response.accessToken,
    });
  }

  function logout(response) {
    setUser({ haslogin: false, accessToken: '' });
    DeleteCookie(['accessToken', 'email', 'givenName', 'familyName', 'imageUrl', 'name', 'googleId']);
  }

  function handleLoginFailure(response) {
    console.log('Failed to login. Please allow 3rd party cookies 👁️‍🗨️ ', { response });
    alert('Failed to log in. Please allow 3rd party cookie👁️‍🗨️.');
  }

  function handleLogoutFailure(response) {
    alert('Failed to log out');
  }

  return (
    <div>
      {user.haslogin ? (
        <>
          <div>
            <GoogleLogout
              clientId={CLIENT_ID}
              buttonText="Logout"
              onLogoutSuccess={logout}
              onFailure={handleLogoutFailure}
            />
          </div>
          {Children}
        </>
      ) : (
        <div style={{ backgroundColor: 'black', width: '100vw', height: '100vh', margin: '-10px' }}>
          <img src="" style={{ width: '170px', marginTop: '100px', marginLeft: '650px' }} alt="logo" />
          <div style={{ color: 'white', marginTop: '10px', marginLeft: '500px', fontWeight: '700', fontSize: '60px' }}>
            HEALTH TRACKER
          </div>
          <div style={{ color: 'white', marginTop: '10px', marginLeft: '650px', fontWeight: '700', fontSize: '60px' }}>
            <GoogleLogin
              clientId={CLIENT_ID}
              buttonText="Sign In With Google"
              onSuccess={login}
              onFailure={handleLoginFailure}
              cookiePolicy="single_host_origin"
              responseType="code,token"
              scope="https://www.googleapis.com/auth/fitness.activity.read"
            />
          </div>
        </div>
      )}
    </div>
  );
}
