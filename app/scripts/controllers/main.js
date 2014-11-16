
'use strict';

/**
 * @ngdoc function
 * @name fifametricsApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the fifametricsApp
 */
angular.module('fifastatsApp')
  .controller('MainCtrl', function ($scope, $http) {
    $scope.todos = [
      'henry',
      'bergkamp',
      'pires',
      'fred'
    ];

    $scope.recentGames = {};


    $scope.results = {};
    $scope.results.result = 'result';

    $scope.results.options = [ 'W', 'L'];

 	$scope.formations = {};
    $scope.formations.formation  ='formation';
    $scope.formations.theirformation = 'theirformation';
     $scope.formations.options = [
               '3-5-2',
               '4-1-2-1-2',
            '4-3-3', 
             '5-4-1'
             ];

     $scope.divs = {};
     $scope.divs.div = 'division';
    $scope.divs.options = ['10','9','8','7','6','5','4','3','2','1'];

		
    $scope.addTodo = function () {

	   $scope.todos.push($scope.formations.formation);
	   $scope.todos.push($scope.divs.div);
	   $scope.todos.push($scope.goalsfor);
	  $scope.todo = '';
	  $scope.goalsfor = '';
	  $scope.divs.div = '';
	  $scope.formations.formation = '';
	};
	$scope.removeTodo = function (index) {
	  $scope.todos.splice(index, 1);
	};


	$scope.fetch = function(){
		var url = 'http://www.easports.com/fifa/api/fifa15-xboxone/match-history/fifaSeasons/scoorey';


		$http.jsonp('http://query.yahooapis.com/v1/public/yql', {
		    params: {
		        q: 'select * from json where url=' + '\'' + url + '\'' + ';',
		        format: 'json',
		        callback: 'JSON_CALLBACK'
		    }
		}).then(function (result) {
		    // result.data contains the 
		    //console.log('hello');
		    console.log(result.data.query.results.json.data);

		    $scope.recentGames = result.data.query.results.json.data;


		});



	};

	$scope.getHomeCrest = function(teamID){
		
		var src = 'http://fifa15.content.easports.com/1630db19-29b0-4904-a574-f52f7c09e166/fifaweb_assets/crests/128x128/l' + teamID + '.png';
		//console.log(src);
		return src;
	};


  });


