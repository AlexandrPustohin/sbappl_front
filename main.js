var app = angular.module("CreateUserProfileAppl", []);
 
// Controller Part
app.controller("CreateUserProfileController", function($scope, $http) {
 
 
    $scope.userprofile = [];
    $scope.userprofileForm = {
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
 
    //$scope.createMortgage = function() {
    //    _clearFormData();
    //}
	function _success(res) {
        //_refreshEmployeeData();
		var data = res.data;
        var status = res.status;
        var header = res.header;
        var config = res.config;
		if ( typeof data.message== "undefined" ) 
			alert("Запись сохранена.");
			window.history.back();
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
 
    
});