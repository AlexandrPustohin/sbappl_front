var app = angular.module("UserProfileManager", []);
 
// Controller Part
app.controller("UserProfileManagerController", function($scope, $http) {
 
 
    $scope.userprofiles = [];
    $scope.userprofilesForm = {
		id:0,
        name: "",
		pass: "",
        nickName: "",
        jndiName: "",
        description: "",
        category: "",
        urlStr: "",
        timeOutConnection: 0,
        maxNumberConn: 0,
        minNumberConn: 0
	};
	$scope.userprofilesFilter = {
		name: "",
		nickName: "",
        jndiName: "",
        description: "",
        category: "",
        urlStr: "",
        timeOutConnection: 0,
        maxNumberConn: 0,
        minNumberConn: 0
	};
	
	_refreshUserProfileData();//загружаем данные при открытии
	
	$scope.clearFilterUserProfile= function(userprofilesFilter){
		userprofilesFilter.name = "";
		userprofilesFilter.nickName = "";
        userprofilesFilter.jndiName= "";
		userprofilesFilter.description= "";
        userprofilesFilter.category= ""; 
        userprofilesFilter.urlStr= "";
        userprofilesFilter.timeOutConnection= 0;
        userprofilesFilter.maxNumberConn= 0;
        userprofilesFilter.minNumberConn= 0;
		_refreshUserProfileData();
	};
	
	
	
	$scope.filterUserprofile = function(userprofilesFilter){
		//_creatFilterUserProfile(userprofilesFilter);
		$http({
            method: 'POST',
            url: 'http://localhost:8080/api/filter',
			data: angular.toJson($scope.userprofilesFilter),
            headers: {'Content-Type': 'application/json'}
        }).then(
            function(res) { // success
                $scope.userprofiles = res.data;
				
            },
            function(res) { // error
                console.log("Error: " + res.status + " : " + res.data);
            }
        );
	};
	
    $scope.deleteUserprofile = function(userprofile) {
        _creatFormData(userprofile);
		$http({
            method: 'DELETE',
            url: 'http://localhost:8080/api/user/' + $scope.userprofilesForm.id
        }).then(_successDelete, _error);
    };
     // In case of edit
    $scope.editUserprofile = function(userprofile) {
        method = "PUT";
        url = 'http://localhost:8080/api/user/' + $scope.userprofile.id;
        _creatFormData(userprofile)		
		
        $http({
            method: method,
            url: url,
            data: angular.toJson($scope.userprofilesForm),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(_success, _error);
    };
	//сохранение нового
	$scope.submitUserProfile = function() {
        var method = "";
        var url = "";
        method = "POST";
		
		//здесь необходимо указать нужный URL
        url = 'http://localhost:8080/api/user';
        $http({
            method: method,
            url: url,
            data: angular.toJson($scope.userprofileForm),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(_success, _error);
    };
    function _refreshUserProfileData() {
       
		$http({
            method: 'GET',
            url: 'http://localhost:8080/api/users'
        }).then(
            function(res) { // success
                $scope.userprofiles = res.data;
				
            },
            function(res) { // error
                console.log("Error: " + res.status + " : " + res.data);
            }
        );
    }
	function _successDelete(res) {
        _refreshUserProfileData();
		var data = res.data;
        var status = res.status;
        var header = res.header;
        var config = res.config;
		if ( typeof data.message== "undefined" ) 
			alert("Запись удалена.");
		else{
			alert(data.message);
		}
        
		//_clearFormData();
		
    }
	function _success(res) {
        _refreshUserProfileData();
		var data = res.data;
        var status = res.status;
        var header = res.header;
        var config = res.config;
		if ( typeof data.message== "undefined" ) 
			alert("Запись сохранена.");
		else{
			alert(data.message);
		}
        
		//_clearFormData();
		
    }
 
    function _error(res) {
        var data = res.data;
        var status = res.status;
        var header = res.header;
        var config = res.config;
        alert("Error: " + status + ":" + data.message);
    }
 
    
	
	// Clear the form
    function _creatFormData(userprofile) {
		
        $scope.userprofilesForm.id = userprofile.id;
		$scope.userprofilesForm.name= userprofile.name;
		$scope.userprofilesForm.pass= userprofile.pass;
        $scope.userprofilesForm.nickName = userprofile.nickName;
        $scope.userprofilesForm.jndiName= userprofile.jndiName;
        $scope.userprofilesForm.description= userprofile.description;
        $scope.userprofilesForm.category= userprofile.category; 
        $scope.userprofilesForm.urlStr= userprofile.urlStr;
        $scope.userprofilesForm.timeOutConnection= userprofile.timeOutConnection;
        $scope.userprofilesForm.maxNumberConn= userprofile.maxNumberConn;
        $scope.userprofilesForm.minNumberConn= userprofile.minNumberConn
    };
});