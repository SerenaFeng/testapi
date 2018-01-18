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
        .controller('ResultController', ResultController);

    ResultController.$inject = [
        '$scope', '$http', '$filter', '$state', '$window', '$uibModal', 'testapiApiUrl','raiseAlert',
        'confirmModal'
    ];

    /**
     * TestAPI ResultController
     * This controller is for the '/result/:_id' page where a user can browse
     * through result declared in TestAPI.
     */
    function ResultController($scope, $http, $filter, $state, $window, $uibModal, testapiApiUrl,
        raiseAlert, confirmModal) {
        var ctrl = this;
        ctrl.url = testapiApiUrl + '/results';
        ctrl._id = $state.params['_id'];
        ctrl.loadDetails = loadDetails
        ctrl.showTrustIndicator = showTrustIndicator
        ctrl.showDetails = showDetails

        /**
         *Contact the testapi and retrevie the result details
         */
        function loadDetails(){
            var resultUrl = ctrl.url + '/' + ctrl._id;
            ctrl.showError = false;
            ctrl.podsRequest =
                $http.get(resultUrl).success(function (data) {
                    ctrl.data = data;
                }).catch(function (error) {
                    ctrl.data = null;
                    ctrl.showError = true;
                    ctrl.error = error.statusText;
                });
        }

        function showTrustIndicator(){
            if(ctrl.trust_indicator){
                ctrl.trust_indicator = false
            }else{
                ctrl.trust_indicator = true
            }
        }

        function showDetails(){
            if(ctrl.details){
                ctrl.details = false
            }else{
                ctrl.details = true
            }
        }
        ctrl.loadDetails();
    }
})();