var app = angular.module("wikiApp",[]);

app.controller("wikiCtrl", function($scope, $http){
  
  //function to open a random wikipedia page
  $scope.random = function() {
    window.open("https://en.wikipedia.org/wiki/Special:Random");
  };
  
  //user's query entered in the search bar
  $scope.query = "";
  $scope.results = [];
  
  $scope.search = function(query) {
    
    //generate url to call the API
    var url = "https://en.wikipedia.org/w/api.php?action=query&format=json&list=search&utf8=1&srsearch=";
    query = query.replace(/\s/g,"%20");
    url += query;
    url += "&origin=*&callback=?";
    
    //make an HTTP GET request to the server    
    $http.get(url).then(function(data){
      var jsonString = data.data.substring(5, data.data.length-1);
      var jsonData = angular.fromJson(jsonString);
      $scope.results = jsonData.query.search;
    });
  }
  
});

//filter for snippet text
app.filter("snippet", function() {
  return function(snippet) {
    var patt = /(<span class="searchmatch">|<\/span>)/g;
    snippet = snippet.replace(patt,"");
    snippet = snippet.replace(/&quot;/g,"\"");
    snippet += "...";
    return snippet;
  };
});