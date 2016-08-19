angular.module('Awwward', [])
  .controller('awardsController', AwardsController);

AwardsController.$inject = ["$scope"];
function AwardsController($scope){
  $scope.message = "Old Message";
  $scope.updateMessage = updateMessage;
  this.newWinner = {};
  this.winners = [
    {name: "Justhe Besse", reason: "sick styling"},
    {name: "Sophie Close", reason: "resolving merge conflicts"},
    {name: "Barry Wheldon", reason: "unit tests"},
    {name: "Noah Ward", reason: "announcing snacks" }
  ];
  this.createNewWinner = createNewWinner;

  function createNewWinner(){
    this.winners.push(this.newWinner);
    this.newWinner = {};
  }

  function updateMessage(){
    $scope.message = "New Message";
  }
}