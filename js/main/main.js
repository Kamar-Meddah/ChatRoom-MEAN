let app = angular.module('chatRoom', ['ngRoute', 'ez.alert', 'yaru22.angular-timeago','btford.socket-io']);

app.config(($routeProvider) => {
    $routeProvider

        .when('/', {
            templateUrl: 'view/user.html',
            controller: 'chatCtrl'
        })
        .when('/chat', {
            templateUrl: 'view/chat.html',
            controller: 'chatCtrl'
        })
       
        .otherwise({
            redirectTo: '/'
        });
})

//socket factory
app.factory('socket', function (socketFactory) {
    const myIoSocket = io.connect('http://localhost');
      mySocket = socketFactory({
        ioSocket: myIoSocket
      });
    return mySocket;
  });