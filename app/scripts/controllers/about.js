'use strict';
/*global $:false */
/*global Chart:false */
/**
 * @ngdoc function
 * @name fifastatsApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the fifastatsApp
 */
angular.module('fifastatsApp')
  .controller('AboutCtrl', function ($scope, $http) {
   
  

   $scope.initRadio = function() {
   		$(function() {
		    $( '#radio' ).buttonset();
		
		  });
   };   
   $scope.initRadio();

   $('ul.nav.nav-pills li a').click(function() {           
    $(this).parent().addClass('active').siblings().removeClass('active');           
});

$scope.consoles ={};
    $scope.consoles.options = [
      'Xbox One',
      'PS4',
      'PC'
    ];

    $scope.gtpsn = null;
   	$scope.rows = [];
   	$scope.opponentAndConsoleSelected = null;
   	$scope.opponentAndConsoleNotSelected = null;
    $scope.cons = '';
    $scope.consoles.console = '';
    $scope.grade = 'C';
    $scope.bestDivision = null;
    $scope.bestPoints = null;
    $scope.gamesPlayed = null;
    $scope.averagePossession = null;
    $scope.gamesPlayed = null;
    $scope.goalsAgainst = null;
    $scope.goalsScored = null;
    $scope.passSuccess = null;
    $scope.promotions = null;
  //record
    $scope.losses = null;
    $scope.ties = null;
    $scope.wins = null;

    $scope.relegations = null;
    $scope.seasonsPlayed = null;
    $scope.titlesWon = null;


    	$scope.quickTactic = null;
				$scope.mentality = null;
				$scope.formationTip = null;

    $scope.attackingFormations = ['3-4-2-1', '3-4-1-2','3-4-3', '3-5-2', '4-3-3(4)'];
    $scope.defensiveFormations = ['4-2-3-1', '5-2-1-2','5-2-2-1', '4-3-3(3)', '5-3-2'];
    $scope.counterAttackFormations = ['5-2-1-2', '5-2-2-1','4-3-3(2)', '4-4-2(2)', '4-2-3-1(2)'];
    $scope.possessionFormations = ['4-5-1', '4-5-1(2)','4-1-2-1-2(2)', '4-2-2-2', '4-3-3(5)'];
    

    $scope.totalGames = null;

			$scope.winpercent = null;
			$scope.drawpercent = null;
			$scope.losspercent = null;

			$scope.possessionTip  = '';
			$scope.passTip  = '';
			$scope.goalTip = '';


	$scope.fetch = function(){
		console.log($scope.gtpsn);
		$scope.cons = 'xboxone'; // comment this out when server fixed
		var bareurl = 'http://www.easports.com/fifa/api/fifa15-';
		var withconsole = bareurl + $scope.cons + '/stats/fut/';

		if ($scope.cons && $scope.gtpsn)
		{
			 
			$scope.opponentAndConsoleNotSelected = null;
			var url = withconsole + encodeURIComponent($scope.gtpsn.trim());


			$http.jsonp('http://query.yahooapis.com/v1/public/yql', {
			    params: {
			        q: 'select * from json where url=' + '\'' + url + '\'' + ';',
			        format: 'json',
			        callback: 'JSON_CALLBACK'
			    }
			}).then(function (result) {
			    // result.data contains the 
			  	

			  	if (result.data.query.results.data)
			  	{
			  			$scope.opponentAndConsoleSelected = 'yess';	
			  	}	
			  	else
			  	{
			  			$scope.opponentAndConsoleSelected = null;	
			  		$scope.opponentAndConsoleNotSelected = 'blah';
			  		return;
			  	}
			    console.log(result.data.query.results.data);

			    //$scope.recentGames = result.data.query.results.json.data;
			    $scope.stats = result.data.query.results.data;

			    $scope.bestDivision = $scope.stats.bestDivision;
			    $scope.bestPoints = parseInt($scope.stats.bestPoints);
			    $scope.gamesPlayed = parseInt($scope.stats.gamesPlayed);
			    $scope.averagePossession = parseInt($scope.stats.averagePossession);
			    
			    $scope.goalsAgainst = parseInt($scope.stats.goalsAgainst);
			    $scope.goalsScored = parseInt($scope.stats.goalsScored);
			    $scope.passSuccess = parseInt($scope.stats.passSuccess);
			    $scope.promotions = parseInt($scope.stats.promotions);
			  //record
			    $scope.losses = parseInt($scope.stats.record.losses);
			    $scope.ties = parseInt($scope.stats.record.ties);
			    $scope.wins = parseInt($scope.stats.record.wins);

			    $scope.relegations = parseInt($scope.stats.relegations);
			    $scope.seasonsPlayed = parseInt($scope.stats.seasonsPlayed);
			    $scope.titlesWon = parseInt($scope.stats.titlesWon);


			    //$scope.OverallGrade 
			    switch ($scope.bestDivision) {
				    case '1':
				        $scope.grade = 'A+';
				        break;
				    case '2':
				        $scope.grade  = 'A';
				        break;
				    case '3':
				        $scope.grade  = 'B+';
				        break;
				    case '4':
				        $scope.grade  = 'B';
				        break;
				    case '5':
				        $scope.grade  = 'C+';
				        break;
				    case '6':
				        $scope.grade  = 'C';
				        break;
				    case '7':
				        $scope.grade  = 'D';
				        break;
				    case '8':
				        $scope.grade  = 'E';
				        break;
				    case '9':
				        $scope.grade  = 'E';
				        break;
				    case '10':
				        $scope.grade  = 'F';
				        break;
				}

				$scope.totalGames = $scope.wins + $scope.ties + $scope.losses;

				$scope.winpercent = parseInt($scope.wins / $scope.totalGames * 100);
				$scope.drawpercent = parseInt($scope.ties / $scope.totalGames * 100);
				$scope.losspercent = parseInt($scope.losses / $scope.totalGames * 100);
				
				if ($scope.averagePossession < 30)
				{
					$scope.possessionTip = 'This player doesn\'t like to play with the ball at all. Most likely a terrible player who doesn\'t know the buttons.';
				}
				else if ($scope.averagePossession >= 30 && $scope.averagePossession < 40)
				{
					$scope.possessionTip = 'This player has real problems keeping the ball. You\'re going to find yourself in their half with the ball a lot.';
				}
				else if ($scope.averagePossession >= 40 && $scope.averagePossession < 45)
				{
					$scope.possessionTip = 'This player will happily give you a lot of possession. You must be careful of the long ball, they may be drawing you into their half so that they can hit you on the counter.';
				}
				else if ($scope.averagePossession >= 45 && $scope.averagePossession < 48)
				{
					$scope.possessionTip = 'You will probably have more possession than this player. Try to impose your will on the game with lots of short sharp passes.';
				}
				else if ($scope.averagePossession >= 48 && $scope.averagePossession < 52)
				{
					$scope.possessionTip = 'This player normally has around 50% possession in their games. Expect a strong midfield tussle.';
				}
				else if ($scope.averagePossession >= 52 && $scope.averagePossession < 55)
				{
					$scope.possessionTip = 'This player dominates possession in a lot of their games. Don\'t turn the ball over cheaply or they will get on top.';
				}
				else if ($scope.averagePossession >= 55 && $scope.averagePossession < 60)
				{
					$scope.possessionTip = 'This player loves to hold the ball. It is going to be a very frustrating game if you let it get to you. Try to counter quickly with long balls to fight back.';
		
				}
				else if ($scope.averagePossession > 60)
				{
					$scope.possessionTip = 'This player is a possession whore. I wouldn\'t play them unless you are one too.';
		
				}



				$scope.goalDifference = $scope.goalsScored - $scope.goalsAgainst;

				if ($scope.goalDifference < -100)
				{
					$scope.goalTip = 'F';
				}
				if ($scope.goalDifference < -50 && $scope.goalDifference >= -100)
				{
					$scope.goalTip = 'E';
				}
				if ($scope.goalDifference < 0 && $scope.goalDifference >= -50)
				{
					$scope.goalTip = 'D';
				}
				if ($scope.goalDifference < 50 && $scope.goalDifference >= 0)
				{
					$scope.goalTip = 'C';
				}
				if ($scope.goalDifference < 100 && $scope.goalDifference >= 50)
				{
					$scope.goalTip = 'B-';
				}
				if ($scope.goalDifference < 150 && $scope.goalDifference >= 100)
				{
					$scope.goalTip = 'B';
				}
				if ($scope.goalDifference < 200 && $scope.goalDifference >= 150)
				{
					$scope.goalTip = 'B+';
				}
				if ($scope.goalDifference < 250 && $scope.goalDifference >= 200)
				{
					$scope.goalTip = 'A-';
				}
				if ($scope.goalDifference < 300 && $scope.goalDifference >= 250)
				{
					$scope.goalTip = 'A';
				}
				if ($scope.goalDifference > 300)
				{
					$scope.goalTip = 'A+';
				}
			


				if ($scope.passSuccess < 60)
				{
					$scope.passTip = 'This player can\'t pass at all, they probably don\t even know where the pass button is';
				}
				else if ($scope.passSuccess >= 60  && $scope.passSuccess < 70) 
				{
					$scope.passTip = 'This player is not very good at passing the ball. They take a lot of high risk passes. Try to intercept and hit them fast on the counter.';
				}
				else if ($scope.passSuccess >= 70  && $scope.passSuccess < 75) 
				{
					$scope.passTip = 'This player is pretty good at passing the ball. Try to predict where they are going to pass and get to the spot early by switching players with the right analog stick.';
				}
				else if ($scope.passSuccess >= 75) 
				{
					$scope.passTip = 'You\'re dealing with an elite passer here. Be careful with your intercept attempts, they will pick you apart if you make a mistake. Don\'t give the ball away cheaply';
				}
				
				if ($scope.averagePossession < 52 && $scope.passSuccess < 74)
				{
					$scope.quickTactic = 'High Pressure';
					$scope.mentality = 'Ultra Attacking';
					$scope.formationTip = $scope.attackingFormations;
				}

				if ($scope.averagePossession >= 52 && $scope.passSuccess < 74)
				{
					$scope.quickTactic = 'Counter Attack';
					$scope.mentality = 'Balanced';
					$scope.formationTip = $scope.counterAttackFormations;
				}
				if ($scope.averagePossession < 52 && $scope.passSuccess > 74)
				{
					$scope.quickTactic = 'Possession';
					$scope.mentality = 'Attacking';
					$scope.formationTip = $scope.possessionFormations;
				}

				if ($scope.averagePossession >= 52 && $scope.passSuccess > 74)
				{
					$scope.quickTactic = 'Counter Attack';
					$scope.mentality = 'Defensive';
					$scope.formationTip = $scope.defensiveFormations;
				}


				  var x = 0;
				  var maxRows = 3;
				  var maxCols = 2;
				  for( var i =0 ; i < maxRows;i++){
				      $scope.rows.push([]);
				      for( var j =0 ; j < maxCols;j++){
				      	  if($scope.formationTip[x] !== null)
				      	  {
				      	  	$scope.rows[i][j] = $scope.formationTip[x];
				      	  }
				          x++;
				      }
				  }
	  

				var namespace = {};

				namespace.chart = {};
				var donut = {};
				var donutCtx = {};
				delete namespace.chart;

				 	donut = document.getElementById('donut');

				 	donutCtx = donut.getContext('2d');

				 	donutCtx.canvas.width = 100;
				 	donutCtx.canvas.height = 100;
					namespace.chart = new Chart(donutCtx).Doughnut([{ value: $scope.wins, color: '#7eb348' }, { value: $scope.losses, color: '#ff0000' }, { value: $scope.ties, color: '#1fc8f8' }], { percentageInnerCutout: 50, animateScale: true, segmentShowStroke: false, animateRotate: false });



			});
		}
		else
		{
			 $scope.opponentAndConsoleNotSelected = 'ffs';
		}
		

	};


});
