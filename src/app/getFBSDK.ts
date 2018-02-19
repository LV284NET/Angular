//import secrets  from './secrets';
import { Constants } from './constants'

(<any>window).fbAsyncInit = ()=> {
    FB.init({
      //appId            : secrets.facebookAppId,
      appId            : Constants.FacebookConstants.FacebookAppId,
      //autoLogAppEvents : true,
      xfbml            : false,
      version          : 'v2.12'
    });
    FB.AppEvents.logPageView();
};

(function(d, s, id){
    let js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {return;}
    js = d.createElement(s); js.id = id;
    //js.src = 'https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.12&appId=1982326058704428&autoLogAppEvents=1';
    js.src = Constants.FacebookConstants.Src;
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));