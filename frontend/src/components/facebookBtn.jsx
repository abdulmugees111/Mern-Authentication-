import { useEffect } from 'react';

const CustomFacebookLoginButton = ({ onLoginWithFacebook, facebookAppId }) => {
  useEffect(() => {
    window.fbAsyncInit = function() {
    FB.init({
        appId: 273711085626236, // Use the Facebook App ID passed as a prop
        cookie: true,
        xfbml: true,
        version: 'v12.0' // Use the desired Facebook Graph API version
      });
    };

    (function(d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s); js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  }, [facebookAppId]); // Include facebookAppId as a dependency

  return (
    <button className="mb-2 w-100 btn-facebook" onClick={onLoginWithFacebook}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" id="facebook">
        <path fill="#1976D2" fillRule="evenodd" d="M12 5.5H9v-2a1 1 0 0 1 1-1h1V0H9a3 3 0 0 0-3 3v2.5H4V8h2v8h3V8h2l1-2.5z" clipRule="evenodd"></path>
      </svg>
      Sign In With Facebook
    </button>
  );
};

export default CustomFacebookLoginButton;
