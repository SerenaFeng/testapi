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
        .controller('PodController', PodController);

    PodController.$inject = [
        '$scope', '$http', '$filter', '$state', '$window', '$uibModal', 'testapiApiUrl','raiseAlert',
        'confirmModal'
    ];

    /**
     * TestAPI Pod Controller
     * This controller is for the '/pod' page where a user can browse
     * through pod declared in TestAPI.
     */
    function PodController($scope, $http, $filter, $state, $window, $uibModal, testapiApiUrl,
        raiseAlert, confirmModal) {
        var ctrl = this;
        ctrl.url = testapiApiUrl + '/pods';
        ctrl.name = $state.params['name'];
        ctrl.loadDetails = loadDetails

        /**
         *Contact the testapi and retrevie the pod details
         */
        function loadDetails(){
            var podUrl = ctrl.url + '/' + ctrl.name;
            ctrl.showError = false;
            ctrl.podsRequest =
                $http.get(podUrl).success(function (data) {
                    ctrl.data = data;
                }).catch(function (error) {
                    ctrl.data = null;
                    ctrl.showError = true;
                    ctrl.error = error.statusText;
                });
        }
        ctrl.loadDetails();
    }
})();