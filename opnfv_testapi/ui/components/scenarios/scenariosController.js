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
        .controller('ScenariosController', ScenariosController);

        ScenariosController.$inject = [
        '$scope', '$http', '$filter', '$state', '$window', '$uibModal', 'testapiApiUrl',
        'raiseAlert', 'confirmModal'
    ];

    /**
     * TestAPI Project Controller
     * This controller is for the '/projects' page where a user can browse
     * through projects declared in TestAPI.
     */
    function ScenariosController($scope, $http, $filter, $state, $window, $uibModal, testapiApiUrl,
        raiseAlert, confirmModal) {
        var ctrl = this;
        ctrl.url = testapiApiUrl + '/scenarios';

        ctrl.createScenario = createScenario;
        ctrl.listScenarios = listScenarios;
        ctrl.openScenarioModal = openScenarioModal;
        ctrl.viewScenario = viewScenario;
        ctrl.openUpdateModal = openUpdateModal;
        ctrl.updateScenarioName = updateScenarioName;
        ctrl.openDeleteModal = openDeleteModal;
        ctrl.deleteScenario = deleteScenario;
        ctrl.openBatchDeleteModal = openBatchDeleteModal;
        ctrl.deleteBatchScenario = deleteBatchScenario

        ctrl.checkBox = [];

        function openUpdateModal(name){
            $uibModal.open({
                templateUrl: 'testapi-ui/components/scenarios/modals/scenarioNameUpdate.html',
                controller: 'ScenarioNameUpdateCtrl as ScenarioNameUpdateCtrl',
                size: 'md',
                resolve: {
                    data: function () {
                        return {
                            text: "Name Change: Scenario",
                            successHandler: ctrl.updateScenarioName,
                            name: name
                        };
                    }
                }
            });
        }

        function openDeleteModal(name){
            confirmModal("Delete",ctrl.deleteScenario,name);
        }

        function deleteScenario(name){
            var scenarioURL = ctrl.url+"/"+name;
            ctrl.scenarioRequest =
                $http.delete(scenarioURL).success(function (data){
                    ctrl.showCreateSuccess = true;
                    ctrl.success = "Scenario is successfully deleted.";
                    ctrl.listScenarios();
                }).catch(function (data) {
                    ctrl.showError = true;
                    ctrl.error = data.statusText;
                });
        }

        function openBatchDeleteModal(){
            confirmModal("Delete",ctrl.deleteBatchScenario);
        }

        function deleteBatchScenario(){
            var index;
            var checkedBox = [];
            ctrl.checkBox.forEach(function(project, index){
                if(!ctrl.showError){
                    if(project){
                        deleteScenario(ctrl.data.scenarios[index].name);
                    }
                }
              });
            ctrl.checkBox = []
        }

        function updateScenarioName(newName, name){
            var scenarioURL = ctrl.url+"/"+name
            var body = {
                "name": newName
            }
            ctrl.scenarioRequest =
                $http.put(scenarioURL, body).success(function (data){
                    ctrl.showCreateSuccess = true;
                    ctrl.success = "Scenario is successfully Updated."
                    ctrl.listScenarios()
                }).catch(function (data) {
                    ctrl.showError = true;
                    ctrl.error = data.statusText;
                });
        }

        function viewScenario(name){
            $state.go('scenario', {'name':name}, {reload: true});
        }

        function createScenario(scenario) {
            console.log(scenario)
            ctrl.scenarioRequest =
                $http.post(ctrl.url, scenario).success(function (data){
                    ctrl.showCreateSuccess = true;
                    ctrl.success = "Scenario is successfully created."
                }).catch(function (data) {
                    ctrl.showError = true;
                    ctrl.error = data.statusText;
                });
        }

       function listScenarios() {
           ctrl.showError = false;
           ctrl.resultsRequest =
               $http.get(ctrl.url).success(function (data) {
                   ctrl.data = data;
               }).catch(function (data)  {
                   ctrl.data = null;
                   ctrl.showError = true;
                   ctrl.error = data.statusText;
               });
       }

    function openScenarioModal(){
        $uibModal.open({
            templateUrl: 'testapi-ui/components/scenarios/modals/scenarioModal.html',
            controller: 'scenarioModalController as scenarioModalController',
            size: 'md',
            resolve: {
                data: function () {
                    return {
                        text: "Scenario",
                        successHandler: ctrl.createScenario,
                    };
                }
            }
        });
    }

       listScenarios();
    }


    /**
     * TestAPI Project  Modal Controller
     * This controller is for the create modal where a user can create
     * the project information and for the edit modal where user can
     * edit the project's details
     */
    angular.module('testapiApp').controller('scenarioModalController', scenarioModalController);
    scenarioModalController.$inject = ['$scope', '$uibModal', '$uibModalInstance', 'data'];
    function scenarioModalController($scope, $uibModal, $uibModalInstance, data) {
        var ctrl = this;
        ctrl.confirm = confirm;
        ctrl.cancel = cancel;
        ctrl.data = angular.copy(data);
        ctrl.handleModalData = handleModalData;
        ctrl.openInstallerModal = openInstallerModal;
        ctrl.scenario = {
            "installers": [],
        }


        /**
         * Initiate confirmation and call the success handler with the
         * inputs.
         */
        function confirm() {
            ctrl.data.successHandler(ctrl.scenario);
            $uibModalInstance.dismiss('cancel');

        }

        /**
         * Close the confirm modal without initiating changes.
         */
        function cancel() {
            $uibModalInstance.dismiss('cancel');
        }

        function handleModalData(installer){
           ctrl.scenario.installers.push(installer)
        }

        function openInstallerModal(){
            $uibModal.open({
                templateUrl: 'testapi-ui/components/scenarios/modals/installerModal.html',
                controller: 'installerModalCtrl as installerModalCtrl',
                size: 'md',
                resolve: {
                    data: function () {
                        return {
                            text: "Installer",
                            successHandler: ctrl.handleModalData,
                        };
                    }
                }
            });
        }
    }

    /**
     * TestAPI Project  Modal Controller
     * This controller is for the create modal where a user can create
     * the project information and for the edit modal where user can
     * edit the project's details
     */
    angular.module('testapiApp').controller('installerModalCtrl', installerModalCtrl);
    installerModalCtrl.$inject = ['$scope', '$uibModal', '$uibModalInstance', 'data'];
    function installerModalCtrl($scope, $uibModal, $uibModalInstance, data) {
        var ctrl = this;
        ctrl.confirm = confirm;
        ctrl.cancel = cancel;
        ctrl.data = angular.copy(data);
        ctrl.openVersionModal = openVersionModal;
        ctrl.handleModalData = handleModalData;
        ctrl.installer = {
            "versions":[]
        }


        /**
         * Initiate confirmation and call the success handler with the
         * inputs.
         */
        function confirm() {
            ctrl.data.successHandler(ctrl.installer);
            $uibModalInstance.dismiss('cancel');

        }

        /**
         * Close the confirm modal without initiating changes.
         */
        function cancel() {
            $uibModalInstance.dismiss('cancel');
        }

        function handleModalData(version){
            ctrl.installer.versions.push(version);
        }

        function openVersionModal(){
            console.log("Hello");
            $uibModal.open({
                templateUrl: 'testapi-ui/components/scenarios/modals/versionModal.html',
                controller: 'versionModalCtrl as versionModalCtrl',
                size: 'md',
                resolve: {
                    data: function () {
                        return {
                            text: "Version",
                            successHandler: ctrl.handleModalData,
                        };
                    }
                }
            });
        }
    }

    /**
     * TestAPI Project  Modal Controller
     * This controller is for the create modal where a user can create
     * the project information and for the edit modal where user can
     * edit the project's details
    */
    angular.module('testapiApp').controller('versionModalCtrl', versionModalCtrl);
    versionModalCtrl.$inject = ['$scope', '$uibModal','$uibModalInstance', 'data'];
    function versionModalCtrl($scope, $uibModal, $uibModalInstance, data) {
        var ctrl = this;
        ctrl.confirm = confirm;
        ctrl.cancel = cancel;
        ctrl.data = angular.copy(data);
        ctrl.openProjectModal = openProjectModal;
        ctrl.handleModalData = handleModalData;
        ctrl.version = {
            "projects": []
        }

        /**
         * Initiate confirmation and call the success handler with the
         * inputs.
         */
        function confirm() {
            ctrl.data.successHandler(ctrl.version);
            $uibModalInstance.dismiss('cancel');

        }

        /**
         * Close the confirm modal without initiating changes.
         */
        function cancel() {
            $uibModalInstance.dismiss('cancel');
        }

        function handleModalData(project){
            ctrl.version.projects.push(project)
        }
        function openProjectModal(){
            $uibModal.open({
                templateUrl: 'testapi-ui/components/scenarios/modals/projectModal.html',
                controller: 'projectModalCtrl as projectModalCtrl',
                size: 'md',
                resolve: {
                    data: function () {
                        return {
                            text: "Project",
                            successHandler: ctrl.handleModalData,
                        };
                    }
                }
            });
        }
    }

    /**
     * TestAPI Project  Modal Controller
     * This controller is for the create modal where a user can create
     * the project information and for the edit modal where user can
     * edit the project's details
    */
    angular.module('testapiApp').controller('projectModalCtrl', projectModalCtrl);
    projectModalCtrl.$inject = ['$scope', '$uibModal', '$uibModalInstance', 'data'];
    function projectModalCtrl($scope, $uibModal, $uibModalInstance, data) {
        var ctrl = this;
        ctrl.confirm = confirm;
        ctrl.cancel = cancel;
        ctrl.data = angular.copy(data);
        ctrl.openCustomModal = openCustomModal;
        ctrl.handleModalCustom = handleModalCustom;
        ctrl.project = {
            "scores": [],
            "trust_indicators": [],
            "customs": []
        }


        /**
         * Initiate confirmation and call the success handler with the
         * inputs.
         */
        function confirm() {

            ctrl.data.successHandler(ctrl.project);
            $uibModalInstance.dismiss('cancel');

        }

        /**
         * Close the confirm modal without initiating changes.
         */
        function cancel() {
            $uibModalInstance.dismiss('cancel');
        }

        function handleModalCustom(custom){
            ctrl.project.customs.push(custom);
        }

        function openCustomModal(){
            $uibModal.open({
                templateUrl: 'testapi-ui/components/scenarios/modals/customModal.html',
                controller: 'customModalCtrl as customModalCtrl',
                size: 'md',
                resolve: {
                    data: function () {
                        return {
                            text: "Custom",
                            successHandler: ctrl.handleModalCustom
                        };
                    }
                }
            });
        }
    }

    /**
     * TestAPI Project  Modal Controller
     * This controller is for the create modal where a user can create
     * the project information and for the edit modal where user can
     * edit the project's details
     */
    angular.module('testapiApp').controller('customModalCtrl', customModalCtrl);
    customModalCtrl.$inject = ['$scope', '$uibModalInstance', 'data'];
    function customModalCtrl($scope, $uibModalInstance, data) {
        var ctrl = this;
        ctrl.confirm = confirm;
        ctrl.cancel = cancel;
        ctrl.data = angular.copy(data);
        ctrl.open = open;


        /**
         * Initiate confirmation and call the success handler with the
         * inputs.
         */
        function confirm() {
            ctrl.data.successHandler(ctrl.custom);
            $uibModalInstance.dismiss('cancel');

        }

        /**
         * Close the confirm modal without initiating changes.
         */
        function cancel() {
            $uibModalInstance.dismiss('cancel');
        }
    }

    /**
     * TestAPI Project  Modal Controller
     * This controller is for the create modal where a user can create
     * the project information and for the edit modal where user can
     * edit the project's details
     */
    angular.module('testapiApp').controller('ScenarioNameUpdateCtrl', ScenarioNameUpdateCtrl);
    ScenarioNameUpdateCtrl.$inject = ['$scope', '$uibModalInstance', 'data'];
    function ScenarioNameUpdateCtrl($scope, $uibModalInstance, data) {
        var ctrl = this;
        ctrl.confirm = confirm;
        ctrl.cancel = cancel;
        ctrl.data = angular.copy(data);
        ctrl.open = open;
        ctrl.name = ctrl.data.name;


        /**
         * Initiate confirmation and call the success handler with the
         * inputs.
         */
        function confirm() {
            ctrl.data.successHandler(ctrl.name,ctrl.data.name);
            $uibModalInstance.dismiss('cancel');

        }

        /**
         * Close the confirm modal without initiating changes.
         */
        function cancel() {
            $uibModalInstance.dismiss('cancel');
        }
    }
})();
