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
        .controller('ProjectController', ProjectController);

        ProjectController.$inject = [
        '$scope', '$http', '$filter', '$state', '$window', '$uibModal', 'testapiApiUrl','raiseAlert',
        'confirmModal'
    ];

    /**
     * TestAPI Project Controller
     * This controller is for the '/projects' page where a user can browse
     * through projects declared in TestAPI.
     */
    function ProjectController($scope, $http, $filter, $state, $window, $uibModal, testapiApiUrl,
        raiseAlert, confirmModal) {
        var ctrl = this;
        ctrl.name = $state.params['name'];
        ctrl.url = testapiApiUrl + '/projects/' + ctrl.name;

        ctrl.loadDetails = loadDetails;

        /**
         * This will contact the TestAPI to get a listing of declared projects.
         */
        function loadDetails() {
            ctrl.showError = false;
            ctrl.projectsRequest =
                $http.get(ctrl.url).success(function (data) {
                    ctrl.data = data;
                }).catch(function (error) {
                    ctrl.data = null;
                    ctrl.showError = true;
                    ctrl.error = error.statusText
                });
        }
        ctrl.loadDetails();
    }
})();
