/**
 * Created by lonel on 2016/5/20.
 */

var dialog = {
    container: {
        header: '<strong style="color: red;">提示</strong>',
        content: ''
    },
    autoClose: 1800
};

var errorDialog = {
    container: {
        header: '<strong style="color: red;">错误</strong>',
        content: ''
    },
    autoClose: 8000
};

var keeperApp = angular.module('keeperApp', ['ui.router'], function ($httpProvider) {
    // Use x-www-form-urlencoded Content-Type
    $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
    $httpProvider.defaults.headers.post['Accept'] = 'application/json, text/javascript, */*; q=0.01';
    $httpProvider.defaults.headers.post['X-Requested-With'] = 'XMLHttpRequest';
    /**
     * The workhorse; converts an object to x-www-form-urlencoded serialization.
     * @param {Object} obj
     * @return {String}
     */
    var param = function (obj) {
        var query = '', name, value, fullSubName, subName, subValue, innerObj, i;

        for (name in obj) {
            value = obj[name];

            if (value instanceof Array) {
                for (i = 0; i < value.length; ++i) {
                    subValue = value[i];
                    fullSubName = name + '[' + i + ']';
                    innerObj = {};
                    innerObj[fullSubName] = subValue;
                    query += param(innerObj) + '&';
                }
            }
            else if (value instanceof Object) {
                for (subName in value) {
                    subValue = value[subName];
                    fullSubName = name + '.' + subName;
                    innerObj = {};
                    innerObj[fullSubName] = subValue;
                    query += param(innerObj) + '&';
                }
            }
            else if (value !== undefined && value !== null)
                query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
        }

        return query.length ? query.substr(0, query.length - 1) : query;
    };

    // Override $http service's default transformRequest
    $httpProvider.defaults.transformRequest = [function (data) {
        return angular.isObject(data) && String(data) !== '[object File]' ? param(data) : data;
    }];
});

/* 注入$stateProvider，$urlRouterProvider */
keeperApp.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

    /* 使用when来对一些不合法的路由进行重定向 */
    $urlRouterProvider
        .when('', 'root')
        .otherwise('root');

    /* 通过$stateProvider的state()函数来进行路由定义 */
    $stateProvider
        .state('root', {
            url: '/root',
            template: '<div style="text-align: center; margin: 0px;"><img src="http://my.sit.edu.cn/login/images/longinbg.jpg" alt="上海应用技术大学"/></div>'
            //templateUrl: 'keeper/index.html'
        }).state('stu/info', {
            url: '/stu/info',
            templateUrl: 'keeper/tpl/stu/info.html',
            controller: 'stuInfoCtrl'
        }).state('stu/add', {
            url: '/stu/add',
            templateUrl: 'keeper/tpl/stu/add.html',
            controller: 'stuAddCtrl'
        }).state('stu/modify', {
            url: '/stu/modify/:no',
            templateUrl: 'keeper/tpl/stu/modify.html',
            controller: 'stuModifyCtrl'
        }).state('404', {
            url: '/404',
            templateUrl: '404.html'
        })
}]);


keeperApp.controller('stuInfoCtrl', stuInfoCtrl);
keeperApp.controller('stuAddCtrl', stuAddCtrl);
keeperApp.controller('stuModifyCtrl', stuModifyCtrl);


keeperApp.factory('globalExceptionInterceptor', ['$q', '$injector', function ($q, $injector) {
    var responseInterceptor = {
        response: function (response) {
            if (response.data.code > 299) {
                if (response.data.message != "") {
                    errorDialog.container.content = response.data.message;
                } else {
                    errorDialog.container.content = response.status;
                }
                easyDialog.open(errorDialog);
            }
            return response;
        },
        responseError: function (response) {
            // Session has expired
            if (response.status > 299) {
                if (response.message != "") {
                    errorDialog.container.content = response.message;
                } else {
                    errorDialog.container.content = response.status;
                }
                easyDialog.open(errorDialog);
                /*var SessionService = $injector.get('SessionService');
                 var $http = $injector.get('$http');
                 var deferred = $q.defer();

                 // Create a new session (recover the session)
                 // We use login method that logs the user in using the current credentials and
                 // returns a promise
                 SessionService.login().then(deferred.resolve, deferred.reject);

                 // When the session recovered, make the same backend call again and chain the request
                 return deferred.promise.then(function () {
                 return $http(response.config);
                 });*/
            }
            return $q.reject(response);
        }
    };

    return responseInterceptor;
}]);

keeperApp.config(['$httpProvider', function ($httpProvider) {
    $httpProvider.interceptors.push('globalExceptionInterceptor');
}]);





