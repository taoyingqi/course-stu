/**
 * Created by lonel on 2016/5/30.
 */

var myApp = angular.module("myApp", ['ui.router']);

myApp.config(function ($stateProvider, $urlRouterProvider) {

    /**
     * 方式一：
     * ui-sref="FregTab"
     */

    /*$urlRouterProvider
        .when("", "/Tab")
        .when("PageTab", "/PageTab")
        .when("FregTab", "/FregTab");

    $stateProvider
        .state("PageTab", {
            url: "/PageTab",
            templateUrl: "PageTab.html"
        })
        .state("PageTab.Page1", {
            url: "/Page1",
            templateUrl: "Page/Page1.html"
        })
        .state("PageTab.Page2", {
            url: "/Page2",
            templateUrl: "Page/Page2.html"
        })
        .state("PageTab.Page3", {
            url: "/Page3",
            templateUrl: "Page/Page3.html"
        });

    $stateProvider
        .state("FregTab", {
            url: "/FregTab",
            templateUrl: "FregTab.html"
        })
        .state("FregTab.Freg1", {
            url: "/Page1",
            templateUrl: "Freg/Freg1.html"
        })
        .state("FregTab.Freg2", {
            url: "/Page2",
            templateUrl: "Freg/Freg2.html"
        })
        .state("FregTab.Freg3", {
            url: "/Page3",
            templateUrl: "Freg/Freg3.html"
        });*/

    /**
     * 方式二：
     * ui-sref=".FregTab"
     */
    $urlRouterProvider
        .when("", "/Tab");
    $stateProvider
        .state("Tab", {
            url: "/Tab",
            templateUrl: "Tab.html"
        })
        .state("Tab.PageTab", {
            url: "/PageTab",
            templateUrl: "PageTab.html"
        })
        .state("Tab.PageTab.Page1", {
            url: "/Page1",
            templateUrl: "Page/Page1.html"
        })
        .state("Tab.PageTab.Page2", {
            url: "/Page2",
            templateUrl: "Page/Page2.html"
        })
        .state("Tab.PageTab.Page3", {
            url: "/Page3",
            templateUrl: "Page/Page3.html"
        })
        .state("Tab.FregTab", {
            url: "/FregTab",
            templateUrl: "FregTab.html"
        })
        .state("Tab.FregTab.Freg1", {
            url: "/Page1",
            templateUrl: "Freg/Freg1.html"
        })
        .state("Tab.FregTab.Freg2", {
            url: "/Page2",
            templateUrl: "Freg/Freg2.html"
        })
        .state("Tab.FregTab.Freg3", {
            url: "/Page3",
            templateUrl: "Freg/Freg3.html"
        });


});