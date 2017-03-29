myApp.controller('AdminController', ['FactoryFactory', '$firebaseAuth', '$location', function(FactoryFactory, $firebaseAuth, $location) {

  console.log('AdminController running');

  var self = this;

  self.message = "Admin View Works";
//all blanks object from factory
  self.adminBlankFactoryObject = FactoryFactory.adminBlankFactoryObject;
//button cick function to get all blanks
  self.buttonClick = FactoryFactory.getAdminBlanks;

//redirect after authentication
  function adminView() {
    $location.path('/admin_view');
  }//adminpView()

//google authenticate bellow
  var auth = $firebaseAuth();

  self.authUser = function(){
    // console.log("auth clicked");
    auth.$signInWithPopup("google").then(function(firebaseUser) {
      adminView();
        swal("You Are Logged In!", "", "success");
        console.log("Firebase Authenticated as: ", firebaseUser.user.displayName);
        self.email = firebaseUser.user.email;
        self.photo = firebaseUser.user.photoURL;
        console.log(firebaseUser.user)
              //console.log("Firebase Authenticated as: ", firebaseUser.user.email);
    }).catch(function(error) {
        console.log("Authentication failed: ", error);
    });
  };//end of self.authUser()

//google de-authedicate
  self.deAuthUser = function(){
    // console.log("de-auth clicked");
    auth.$signOut().then(function() {
        swal("You've Logged Out!", "", "success");
        console.log('Logging the user out!');
     });
  };//end of self.deAuthUser()

// update button click function
  self.updateAdmin = function(blankId){
    console.log("updating ID number: ", blankId);
    FactoryFactory.update;
  }

// delete button click function
  self.deleteAdmin = function(blankId){
    console.log("deleting ID number: ", blankId);
    FactoryFactory.delete;
  }


}]);//end of myApp.controller()