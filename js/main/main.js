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