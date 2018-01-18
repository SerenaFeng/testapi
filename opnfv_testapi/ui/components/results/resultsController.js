/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

(function () {
    'use strict';

    angular
        .module('testapiApp')
        .controller('ResultsController', ResultsController);

    angular
        .module('testapiApp')
        .directive('fileModel', ['$parse', function ($parse) {
            return {
               restrict: 'A',
               link: function(scope, element, attrs) {
                  var model = $parse(attrs.fileModel);
                  var modelSetter = model.assign;

                  element.bind('change', function(){
                     scope.$apply(function(){
                        modelSetter(scope, element[0].files[0]);
                     });
                  });
               }
            };
         }]);

    ResultsController.$inject = [
        '$scope', '$http', '$filter', '$state', 'testapiApiUrl','raiseAlert'
    ];

    /**
     * TestAPI Results Controller
     * This controller is for the '/results' page where a user can browse
     * a listing of community uploaded results.
     */
    function ResultsController($scope, $http, $filter, $state, testapiApiUrl,
        raiseAlert) {
        var ctrl = this;

        ctrl.open = open;
        ctrl.clearFilters = clearFilters;
        ctrl.deleteTag = deleteTag;
        ctrl.filterList= filterList;
        ctrl.testFilter = testFilter
        ctrl.viewResult = viewResult;

        ctrl.tagArray = {}

        /** Mappings of Interop WG components to marketing program names. */
        ctrl.targetMappings = {
            'platform': 'Openstack Powered Platform',
            'compute': 'OpenStack Powered Compute',
            'object': 'OpenStack Powered Object Storage'
        };

        /** Initial page to be on. */
        ctrl.currentPage = 1;

        /**
         * How many results should display on each page. Since pagination
         * is server-side implemented, this value should match the
         * 'results_per_page' configuration of the TestAPI server which
         * defaults to 20.
         */
        ctrl.itemsPerPage = 20;

        /**
         * How many page buttons should be displayed at max before adding
         * the '...' button.
         */
        ctrl.maxSize = 5;

        /** The upload date lower limit to be used in filtering results. */
        ctrl.startDate = '';

        /** The upload date upper limit to be used in filtering results. */
        ctrl.endDate = '';

        /** The date format for the date picker. */
        ctrl.format = 'yyyy-MM-dd';

        /** Check to see if this page should display user-specific results. */
        // ctrl.isUserResults = $state.current.name === 'userResults';
        // need auth to browse
        // ctrl.isUserResults = $state.current.name === 'userResults';

        // // Should only be on user-results-page if authenticated.
        // if (ctrl.isUserResults && !$scope.auth.isAuthenticated) {
        //     $state.go('home');
        // }

        ctrl.pageHeader = "Test Results"

        ctrl.pageParagraph = ctrl.isUserResults ?
            'Your most recently uploaded test results are listed here.' :
            'The most recently uploaded community test results are listed ' +
            'here.';

        // ctrl.uploadState = '';

        ctrl.isPublic = false;

        // if (ctrl.isUserResults) {
        //     ctrl.authRequest = $scope.auth.doSignCheck()
        //         .then(ctrl.filterList);
        //     // ctrl.getUserProducts();
        // } else {
        //     ctrl.filterList();
        // }

        function viewResult(_id){
            $state.go('result', {'_id':_id}, {reload: true});
        }

        function deleteTag(index){
            delete  ctrl.tagArray[index];
            ctrl.filterList();
        }

        function testFilter(text){
            for (var filter in ctrl.tagArray){
                if(text==filter){
                    return true;
                }
            }
            return false;
        }

        /**
         * This will contact the TestAPI API to get a listing of test run
         * results.
         */
        function filterList(){
            if(ctrl.filter && ctrl.filterText!=""){
                ctrl.tagArray[ctrl.filter] =  ctrl.filterText;
            }
            ctrl.showError = false;
            var content_url = testapiApiUrl + '/results' +
                '?page=' + ctrl.currentPage;
            for(var key in ctrl.tagArray){
                if(key=="start_date"){
                    var start = $filter('date')(ctrl.tagArray[key], 'yyyy-MM-dd');
                    if (start) {
                        content_url =
                            content_url + '&from=' + start + ' 00:00:00';
                    }
                }
                else if(key=="end_date"){
                    var end = $filter('date')(ctrl.tagArray[key], 'yyyy-MM-dd');
                    if (end) {
                        content_url = content_url + '&to=' + end + ' 23:59:59';
                    }
                }
                else{
                    content_url = content_url + "&" + key + "=" + ctrl.tagArray[key]
                }
                if (ctrl.isUserResults) {
                    content_url = content_url + '&signed';
                }
            }
            ctrl.resultsRequest =
                    $http.get(content_url).success(function (data) {
                        ctrl.data = data;
                        ctrl.totalItems = ctrl.data.pagination.total_pages * ctrl.itemsPerPage;
                        ctrl.currentPage = ctrl.data.pagination.current_page;
                    }).error(function (error) {
                        ctrl.data = null;
                        ctrl.totalItems = 0;
                        ctrl.showError = true;
                        ctrl.error =
                            'Error retrieving results listing from server: ' +
                            angular.toJson(error);
                    });
            ctrl.filterText = ''
        }
        ctrl.filterList();

        /**
         * This is called when the date filter calendar is opened. It
         * does some event handling, and sets a scope variable so the UI
         * knows which calendar was opened.
         * @param {Object} $event - The Event object
         * @param {String} openVar - Tells which calendar was opened
         */
        function open($event, openVar) {
            $event.preventDefault();
            $event.stopPropagation();
            ctrl[openVar] = true;
        }

        /**
         * This function will clear all filters and update the results
         * listing.
         */
        function clearFilters() {
            ctrl.tagArray = {}
            ctrl.filter = undefined
            ctrl.filterList();
        }
    }
})();
