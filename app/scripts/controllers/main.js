
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

    $scope.formationStyle = {
   width:'300px'
};

    $scope.recentGames = {};
	$scope.currentGame = [];
	$scope.gameSelected = null;
	$scope.afterGameSelected = 'blah';
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


    $scope.shotsOnTarget = null;
    $scope.opponentShotsOnTarget = null;
    $scope.goalsFor = null;
    $scope.goalsAgainst = null;
    $scope.possessionFor = null;
    $scope.possessionAgainst = null;
    $scope.passAccuracyFor = null;
    $scope.passAccuracyAgainst = null;
    $scope.tacklesFor = null;
    $scope.tacklesAgainst = null;
    $scope.foulsFor = null;
    $scope.foulsAgainst = null;
    $scope.yellowsFor = null;
    $scope.yellowsAgainst = null;
    $scope.redsFor = null;
    $scope.redsAgainst = null;
    $scope.offsidesFor = null;
    $scope.offsidesAgainst = null;
    $scope.teamUsed = null;
    $scope.teamAgainst = null;

    $scope.myUserName = null;
    $scope.opponentUserName = null;
		
    $scope.addTodo = function () {

	   $scope.todos.push($scope.formations.formation);
	   $scope.todos.push($scope.divs.div);
	   $scope.todos.push($scope.goalsFor);
	  $scope.todo = '';
	  $scope.goalsFor = '';
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

  $scope.selectRestaurant = function(row) {
  
  	/*jshint camelcase: false */
  	console.log($scope.recentGames[row].self.user_info);
   	for (var i=0; i< $scope.recentGames.length; i++)
    {
        if (row === i)
        {
        	console.log($scope.recentGames[i]);
        	$scope.currentGame.push($scope.recentGames[i]);
        }
    }
    $scope.recentGames = $scope.currentGame;
  

    $scope.gameSelected = 'ell';
  
  	$scope.shotsOnTarget = $scope.recentGames[0].self.stats.shot_on_target;
    $scope.opponentShotsOnTarget = $scope.recentGames[0].opponent.stats.shot_on_target;
    $scope.goalsFor = $scope.recentGames[0].self.stats.score;
    $scope.goalsAgainst = $scope.recentGames[0].opponent.stats.score;
    $scope.possessionFor = $scope.recentGames[0].self.stats.possession;
    $scope.possessionAgainst = $scope.recentGames[0].opponent.stats.possession;
    $scope.passAccuracyFor = $scope.recentGames[0].self.stats.pass_made / $scope.recentGames[0].self.stats.pass_attempts * 100;
    $scope.passAccuracyAgainst = $scope.recentGames[0].opponent.stats.pass_made / $scope.recentGames[0].opponent.stats.pass_attempts * 100;
    $scope.tacklesFor = $scope.recentGames[0].self.stats.tackles;
    $scope.tacklesAgainst = $scope.recentGames[0].opponent.stats.tackles;
    $scope.foulsFor = $scope.recentGames[0].self.stats.fouls;
    $scope.foulsAgainst = $scope.recentGames[0].opponent.stats.fouls;
    $scope.yellowsFor = $scope.recentGames[0].self.stats.yellow_cards;
    $scope.yellowsAgainst = $scope.recentGames[0].opponent.stats.yellow_cards;
    $scope.redsFor = $scope.recentGames[0].self.stats.red_cards;
    $scope.redsAgainst = $scope.recentGames[0].opponent.stats.red_cards;
    $scope.offsidesFor = $scope.recentGames[0].self.stats.offsides;
    $scope.offsidesAgainst = $scope.recentGames[0].opponent.stats.offsides;
    $scope.teamUsed = $scope.recentGames[0].self.stats.team;
    $scope.teamAgainst = $scope.recentGames[0].opponent.stats.team;

    $scope.myUserName = $scope.recentGames[0].self.user_info;
    $scope.opponentUserName = $scope.recentGames[0].opponent.user_info;
  //angular.element($0).scope() 
	};
 


  });


