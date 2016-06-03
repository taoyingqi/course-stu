/**
 * Created by lonel on 2016/6/1.
 */


function cityPickerInit() {
    var cityPicker1 = new IIInsomniaCityPicker({
        data: data,
        target: 'city-picker',
        valType: 'k-v',
        hideCityInput: {
            name: 'city',
            id: 'city'
        },
        hideProvinceInput: {
            name: 'province',
            id: 'province'
        },
        callback: function () {
        }
    });
    cityPicker1.init();
}

function getStuPage($scope, $http, pageNumber) {
    pageNumber = pageNumber || 1;

    $http.get("/stu/getStuList", {params: {pageNumber: pageNumber}}).then(function (response) {
        $scope.stuList = response.data.data.stuPage.list;
        $scope.pageNumber = response.data.data.stuPage.pageNumber;
        $scope.pageSize = response.data.data.stuPage.pageSize;
        $scope.totalPage = response.data.data.stuPage.totalPage;
        $scope.totalRow = response.data.data.stuPage.totalRow;
    });
}

var stuInfoCtrl = function ($scope, $http, $location) {

    getStuPage($scope, $http);


    $scope.getPage = function (pageNumber) {
        if (pageNumber >= 1 && pageNumber <= $scope.totalPage) {
            getStuPage($scope, $http, pageNumber);
        }
    }


    $scope.remove = function (no, index) {

        if (!confirm("您确定用删除该学生信息？")) {
            return;
        }

        console.log(no + "-" + index)
        $http({
            method: 'post',
            url: '/stu/delete',
            data: {
                no: no
            }
        }).success(function (data, status, headers, config) {
            if (200 == data.code) {
                console.log("success");
                //$window.location.reload();
                $scope.stuList.splice(index, 1);
            }
        }).error(function (data, status, headers, config) {
            //处理错误
            errorDialog.container.content = data.message;
            easyDialog.open(errorDialog);
        });
    }
}

var stuAddCtrl = function ($scope, $http, $location, $stateParams) {

    cityPickerInit();

    $scope.unIsExisted = function(un) {
        $http.get("/stu/unIsExisted", {params: {un: un}}).then(function (response) {
            if (506 == response.data.code) {
                $scope.stu.un = undefined;
            }
        });
    }

    $scope.stuSubmit = function () {
        $scope.stu.city = $('#city-picker').val();
        console.log($scope.stu);
        $http({
            method: 'post',
            url: '/stu/save',
            data: {
                stu: $scope.stu
            }
        }).success(function (data, status, headers, config) {
            if (200 == data.code) {
                dialog.container.content = "成功";
                easyDialog.open(dialog);
                $scope.stu = undefined;
            }
        }).error(function (data, status, headers, config) {
            //处理错误
            errorDialog.container.content = data.message;
            easyDialog.open(errorDialog);
        });
    }

}

var stuModifyCtrl = function ($scope, $http, $location, $stateParams) {

    cityPickerInit();

    if ($stateParams.no != undefined) {
        $http.get("/stu/getStu", {params: {no: $stateParams.no}}).then(function (response) {
            if (200 == response.data.code) {
                $scope.stu = response.data.data.stu;
            }
        });
    }

    $scope.stuSubmit = function () {
        $scope.stu.city = $('#city-picker').val();
        console.log($scope.stu);
        $http({
            method: 'post',
            url: '/stu/modify',
            data: {
                stu: $scope.stu
            }
        }).success(function (data, status, headers, config) {
            if (200 == data.code) {
                dialog.container.content = "成功";
                easyDialog.open(dialog);
                $scope.stu = undefined;
                $location.path("/stu/info");
            }
        }).error(function (data, status, headers, config) {
            //处理错误
            errorDialog.container.content = data.message;
            easyDialog.open(errorDialog);
        });
    }

}

