app.controller('chatCtrl',['$scope','$http','$location','socket', '$window','EzAlert', function($scope,$http,$location,socket,$window,EzAlert) {
    $scope.p=0;
$scope.connect=()=>{
    $http.post('/',{'name':$scope.username}).then(data=>{
        $location.path('/chat')
    })
}

$http.post('/ch',{}).then((data)=>{
    $scope.user=data.data.user===undefined?'unknown':data.data.user;
})

$scope.chat=()=>{
    $scope.p=1;
    $http.post('/chat',{'name':$scope.user,'contenu':$scope.contenu}).then(p=>{
        EzAlert.success('message successfully sent');  
    })    
    $scope.contenu=' ';
}

$http.get('/chat').then(data=>{
    $scope.msg=data.data
})

socket.on('nvmsg', function (d) {
    $scope.$apply(function () {
    $scope.msg.splice($scope.msg.length,0,{'name':d.name,'contenu':d.contenu,'date':Date.now()})

   })
   if( $scope.p===0){
   EzAlert.warning('new incoming msg', true);
}
$scope.p=0
})

}]);