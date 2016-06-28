var myApp = angular.module('he',[]);

myApp.controller('DemoController', MyCtrl);

function MyCtrl($scope) {
    $scope.user = {
        gender: 'M'
    };

    $scope.$watch('user.gender', function(newVal, oldVal) {
        console.log(newVal, oldVal)
    });
}

myApp.directive('radioSet', [
    function() {

        return {
            restrict: 'E',
            replace: true,
            transclude: true,
            scope: {
                title: '@title',
                model: '=model'
            },
            controller: ['$scope', function(scope) {
                
                this.changeVal = function(value) {

                    scope.model = value;
                };

                this.title = scope.title;
            }],
            controllerAs: 'vm',
            templateUrl: 'partials/radio-group.html',
        };
    }
]);

myApp.directive('radio', [
    function() {
        
        return {
            restrict: 'EA',
            replace: true,
            transclude: true,
            require:'^radioSet',
            scope: {
                value: '@value'
            },
            link:function(scope, iElement, iAttrs, parentCtrl){

                scope.model = "M";
                scope.changeVal = parentCtrl.changeVal;
            },
            templateUrl: 'partials/radio.html'
        };
    }
]);