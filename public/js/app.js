var myApp = angular.module('he',[]);

myApp.controller('DemoController', MyCtrl);

function MyCtrl($scope) {
    $scope.user = {
        gender: 'M'
    };

    Object.defineProperty($scope.user, 'gender', {
        set: function(value) {
            this._gender = value;
            console.log("The new value is", value);
        },
        get: function() {
            return this._gender;
        }
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