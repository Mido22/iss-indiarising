window.fbAsyncInit = function() {
    // init the FB JS SDK
    Parse.initialize("fTrYXzUcG7ERobkJJmGIMozQLxjBrBmgKS4HuQhM", "lNABzspsFXBu53eST4p0fhHSOLZUnFADdOxl8Ye4");
    Parse.FacebookUtils.init({
      appId      : '330973873748797',                        // App ID from the app dashboard
     // Channel file for x-domain comms
      status     : false,                                 // Check Facebook Login status
      xfbml      : true,                                  // Look for social plugins on the page
      logging    : true
    });

        Parse.FacebookUtils.logIn(null, {
            success: function(user) {
                if (!user.existed()) {
					FB.api('/me', function(response) {
					Parse.user.save({
					name:response.name});
				});
					document.getElementById("logout").style.display = 'none';
                    alert("User signed up and logged in through Facebook!");

                } else {

                    alert("User logged in through Facebook!");

                }
            },
            error: function(user, error) {
                window.location="index.html";
                alert("User cancelled the Facebook login or did not fully authorize.");
            }
        });



  };

  // Load the SDK asynchronously
  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "https://connect.facebook.net/en_US/all.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));