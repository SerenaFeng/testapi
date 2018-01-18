'use strict';

var mock = require('protractor-http-mock');
var baseURL = "http://localhost:8000/"

describe('testing the scenarios page for anonymous user', function () {
    beforeEach(function(){
        mock([
            {
                request: {
                    path: '/api/v1/scenarios',
                    method: 'GET'
                },
                response: {
                    data: {
                        "scenarios": [
                            {
                            "installers": [
                               {
                                  "installer": "fuel",
                                  "versions": [
                                     {
                                        "owner": "testUser",
                                        "version": "colorado",
                                        "projects": [
                                           {
                                              "project": "yardstick",
                                              "customs": [
                                                 "dvs"
                                              ],
                                              "scores": [
                                                 {
                                                    "date": "2016-12-11 01:45",
                                                    "score": "14/24"
                                                 },
                                                 {
                                                    "date": "2016-12-15 05:28",
                                                    "score": "17/24"
                                                 },
                                                 {
                                                    "date": "2016-12-17 03:41",
                                                    "score": "16/24"
                                                 },
                                                 {
                                                    "date": "2018-01-22T18:30:00.000Z",
                                                    "score": "10/13"
                                                 }
                                              ],
                                              "trust_indicators": [
                                                 {
                                                    "date": "2016-12-09 11:38",
                                                    "status": "silver"
                                                 },
                                                 {
                                                    "date": "2016-12-25 08:22",
                                                    "status": "gold"
                                                 },
                                                 {
                                                    "date": "2018-01-22T18:30:00.000Z",
                                                    "status": "sf"
                                                 },
                                                 {
                                                    "date": "2018-01-17T18:30:00.000Z",
                                                    "status": "df"
                                                 }
                                              ]
                                           },
                                           {
                                              "project": "functest",
                                              "customs": [
                                                 "vping_ssh",
                                                 "vping_userdata",
                                              ],
                                              "scores": [
                                                 {
                                                    "date": "2016-12-09 11:28",
                                                    "score": "6/8"
                                                 },
                                                 {
                                                    "date": "2016-12-14 15:34",
                                                    "score": "8/8"
                                                 },
                                                 {
                                                    "date": "2016-12-19 13:22",
                                                    "score": "8/8"
                                                 },
                                                 {
                                                    "date": "2016-12-22 18:17",
                                                    "score": "8/8"
                                                 },
                                                 {
                                                    "date": "2016-12-25 08:22",
                                                    "score": "8/8"
                                                 }
                                              ],
                                              "trust_indicators": [
                                                 {
                                                    "date": "2016-12-09 11:38",
                                                    "status": "silver"
                                                 }
                                              ]
                                           },
                                           {
                                              "project": "sla",
                                              "customs": [],
                                              "scores": [
                                                 {
                                                    "date": "2018-01-16T18:30:00.000Z",
                                                    "score": "sdS"
                                                 }
                                              ],
                                              "trust_indicators": []
                                           },
                                           {
                                              "project": "dvsd",
                                              "customs": [],
                                              "scores": [],
                                              "trust_indicators": []
                                           }
                                        ]
                                     },
                                     {
                                        "owner": "dfgvds",
                                        "version": "df",
                                        "projects": []
                                     }
                                  ]
                               },
                               {
                                  "installer": "fuel2",
                                  "versions": [
                                     {
                                        "owner": "testUser",
                                        "version": "colorado",
                                        "projects": [
                                           {
                                              "project": "yardstick",
                                              "customs": [
                                                 "tc002",
                                                 "tc005",
                                                 "tc010",
                                                 "tc011"
                                              ],
                                              "scores": [
                                                 {
                                                    "date": "2016-12-11 01:45",
                                                    "score": "14/24"
                                                 },
                                                 {
                                                    "date": "2016-12-15 05:28",
                                                    "score": "17/24"
                                                 },
                                                 {
                                                    "date": "2016-12-17 03:41",
                                                    "score": "16/24"
                                                 }
                                              ],
                                              "trust_indicators": [
                                                 {
                                                    "date": "2016-12-09 11:38",
                                                    "status": "silver"
                                                 },
                                                 {
                                                    "date": "2016-12-25 08:22",
                                                    "status": "gold"
                                                 }
                                              ]
                                           },
                                           {
                                              "project": "functest",
                                              "customs": [
                                                 "vping_ssh",
                                                 "vping_userdata"
                                              ],
                                              "scores": [
                                                 {
                                                    "date": "2016-12-09 11:28",
                                                    "score": "6/8"
                                                 },
                                                 {
                                                    "date": "2016-12-14 15:34",
                                                    "score": "8/8"
                                                 }
                                              ],
                                              "trust_indicators": [
                                                 {
                                                    "date": "2016-12-09 11:38",
                                                    "status": "silver"
                                                 }
                                              ]
                                           }
                                        ]
                                     }
                                  ]
                               }
                            ],
                            "_id": "5a50fcacsdgdsgdasgfvb861c",
                            "name": "test-scenario",
                            "creation_date": "2018-01-06 22:13:24.160407"
                            }
                        ]
                    }
                }
            }
        ]);
    });

    afterEach(function(){
        mock.teardown();
    });

    it( 'should show the scenarios page for anonymous user', function() {
        browser.get(baseURL+"#/scenarios");
        var EC = browser.ExpectedConditions;
        browser.wait(EC.urlContains(baseURL+ '#/scenarios'), 10000);
    });

    it( 'navigate anonymous user to scenarios page', function() {
        browser.get(baseURL);
        var resultLink = element(by.linkText('Scenarios')).click();
        var EC = browser.ExpectedConditions;
        browser.wait(EC.urlContains(baseURL+ '#/scenarios'), 10000);
    });

    it('Should show the scenarios in scenarios page for anonymous user ', function () {
        browser.get(baseURL+"#/scenarios");
        var row = element.all(by.repeater('(index, scenario) in ctrl.data.scenarios')).first();
        var cells = row.all(by.tagName('td'));
        expect(cells.get(1).getText()).toContain("test-scenario");
    });

    it('create button is not visible for anonymous user ', function () {
        browser.get(baseURL+'#/scenarios');
        var buttonCreate = element(by.buttonText('Create'));
        expect(buttonCreate.isDisplayed()).toBeFalsy();
    });
    it('delete button is not visible for anonymous user ', function () {
        browser.get(baseURL+'#/scenarios');
        var buttonCreate = element(by.buttonText('Delete'));
        expect(buttonCreate.isDisplayed()).toBeFalsy();
    });

});

describe('testing the scenarios page for user', function () {
    beforeEach(function(){
        mock([
            {
                request: {
                    path: '/api/v1/scenarios',
                    method: 'GET'
                },
                response: {
                    data: {
                        "scenarios": [
                            {
                            "installers": [
                               {
                                  "installer": "fuel",
                                  "versions": [
                                     {
                                        "owner": "testUser",
                                        "version": "colorado",
                                        "projects": [
                                           {
                                              "project": "yardstick",
                                              "customs": [
                                                 "dvs"
                                              ],
                                              "scores": [
                                                 {
                                                    "date": "2016-12-11 01:45",
                                                    "score": "14/24"
                                                 },
                                                 {
                                                    "date": "2016-12-15 05:28",
                                                    "score": "17/24"
                                                 },
                                                 {
                                                    "date": "2016-12-17 03:41",
                                                    "score": "16/24"
                                                 },
                                                 {
                                                    "date": "2018-01-22T18:30:00.000Z",
                                                    "score": "10/13"
                                                 }
                                              ],
                                              "trust_indicators": [
                                                 {
                                                    "date": "2016-12-09 11:38",
                                                    "status": "silver"
                                                 },
                                                 {
                                                    "date": "2016-12-25 08:22",
                                                    "status": "gold"
                                                 },
                                                 {
                                                    "date": "2018-01-22T18:30:00.000Z",
                                                    "status": "sf"
                                                 },
                                                 {
                                                    "date": "2018-01-17T18:30:00.000Z",
                                                    "status": "df"
                                                 }
                                              ]
                                           },
                                           {
                                              "project": "functest",
                                              "customs": [
                                                 "vping_ssh",
                                                 "vping_userdata",
                                              ],
                                              "scores": [
                                                 {
                                                    "date": "2016-12-09 11:28",
                                                    "score": "6/8"
                                                 },
                                                 {
                                                    "date": "2016-12-14 15:34",
                                                    "score": "8/8"
                                                 },
                                                 {
                                                    "date": "2016-12-19 13:22",
                                                    "score": "8/8"
                                                 },
                                                 {
                                                    "date": "2016-12-22 18:17",
                                                    "score": "8/8"
                                                 },
                                                 {
                                                    "date": "2016-12-25 08:22",
                                                    "score": "8/8"
                                                 }
                                              ],
                                              "trust_indicators": [
                                                 {
                                                    "date": "2016-12-09 11:38",
                                                    "status": "silver"
                                                 }
                                              ]
                                           },
                                           {
                                              "project": "sla",
                                              "customs": [],
                                              "scores": [
                                                 {
                                                    "date": "2018-01-16T18:30:00.000Z",
                                                    "score": "sdS"
                                                 }
                                              ],
                                              "trust_indicators": []
                                           },
                                           {
                                              "project": "dvsd",
                                              "customs": [],
                                              "scores": [],
                                              "trust_indicators": []
                                           }
                                        ]
                                     },
                                     {
                                        "owner": "dfgvds",
                                        "version": "df",
                                        "projects": []
                                     }
                                  ]
                               },
                               {
                                  "installer": "fuel2",
                                  "versions": [
                                     {
                                        "owner": "testUser",
                                        "version": "colorado",
                                        "projects": [
                                           {
                                              "project": "yardstick",
                                              "customs": [
                                                 "tc002",
                                                 "tc005",
                                                 "tc010",
                                                 "tc011"
                                              ],
                                              "scores": [
                                                 {
                                                    "date": "2016-12-11 01:45",
                                                    "score": "14/24"
                                                 },
                                                 {
                                                    "date": "2016-12-15 05:28",
                                                    "score": "17/24"
                                                 },
                                                 {
                                                    "date": "2016-12-17 03:41",
                                                    "score": "16/24"
                                                 }
                                              ],
                                              "trust_indicators": [
                                                 {
                                                    "date": "2016-12-09 11:38",
                                                    "status": "silver"
                                                 },
                                                 {
                                                    "date": "2016-12-25 08:22",
                                                    "status": "gold"
                                                 }
                                              ]
                                           },
                                           {
                                              "project": "functest",
                                              "customs": [
                                                 "vping_ssh",
                                                 "vping_userdata"
                                              ],
                                              "scores": [
                                                 {
                                                    "date": "2016-12-09 11:28",
                                                    "score": "6/8"
                                                 },
                                                 {
                                                    "date": "2016-12-14 15:34",
                                                    "score": "8/8"
                                                 }
                                              ],
                                              "trust_indicators": [
                                                 {
                                                    "date": "2016-12-09 11:38",
                                                    "status": "silver"
                                                 }
                                              ]
                                           }
                                        ]
                                     }
                                  ]
                               }
                            ],
                            "_id": "5a50fcacsdgdsgdasgfvb861c",
                            "name": "test-scenario",
                            "creation_date": "2018-01-06 22:13:24.160407"
                            }
                        ]
                    }
                }
            },
            {
                request: {
                path: '/api/v1/profile',
                method: 'GET'
                },
                response: {
                    data: {
                        "fullname": "Test User", "_id": "79f82eey9a00c84bfhc7aed",
                        "user": "testUser", "groups": ["opnfv-testapi-users"],
                        "email": "testuser@test.com"
                    }
                }
            },
            {
                request: {
                    path: '/api/v1/scenarios',
                    method: 'POST'
                },
                response: {
                    data: {
                        href: baseURL+"/api/v1/scenarios/testScenario"
                    }
                }
            },
            {
                request: {
                    path: '/api/v1/scenarios/test-scenario',
                    method: 'DELETE'
                },
                response: {
                    data: {
                        href: baseURL+"/api/v1/scenarios/testScenario"
                    }
                }
            },
            {
                request: {
                    path: '/api/v1/scenarios/test-scenario',
                    method: 'PUT'
                },
                response: {
                    data: {
                        href: baseURL+"/api/v1/scenarios/testScenario"
                    }
                }
            }
        ]);
    });

    afterEach(function(){
        mock.teardown();
    });

    it( 'should show the scenarios page for user', function() {
        browser.get(baseURL+"#/scenarios");
        var EC = browser.ExpectedConditions;
        browser.wait(EC.urlContains(baseURL+ '#/scenarios'), 10000);
    });

    it( 'navigate  user to scenarios page', function() {
        browser.get(baseURL);
        var resultLink = element(by.linkText('Scenarios')).click();
        var EC = browser.ExpectedConditions;
        browser.wait(EC.urlContains(baseURL+ '#/scenarios'), 10000);
    });

    it('Should show the scenarios in scenarios page for user ', function () {
        browser.get(baseURL+"#/scenarios");
        var row = element.all(by.repeater('(index, scenario) in ctrl.data.scenarios')).first();
        var cells = row.all(by.tagName('td'));
        expect(cells.get(1).getText()).toContain("test-scenario");
    });

    it('create button is not visible for user ', function () {
        browser.get(baseURL+'#/scenarios');
        var buttonCreate = element(by.buttonText('Create'));
        expect(buttonCreate.isDisplayed()).toBe(true);
    });

    it('delete button is not visible for user ', function () {
        browser.get(baseURL+'#/scenarios');
        var buttonDelete = element(by.buttonText('Delete'));
        expect(buttonDelete.isDisplayed()).toBe(true);
    });

    it('craete scenarrio by user without installers ', function () {
        browser.get(baseURL+'#/scenarios');
        var buttonCreate = element(by.buttonText('Create')).click();
        var name = element(by.model('scenarioModalController.scenario.name'));
        var EC = browser.ExpectedConditions;
        browser.wait(EC.visibilityOf(name), 5000);
        name.sendKeys('test');
        var buttonOK = element(by.buttonText('Ok'));
        buttonOK.click();
        expect(element(by.cssContainingText(".alert","Scenario is successfully created."))
        .isDisplayed()).toBe(true);
    });

    it('create scenarrio by user with installers ', function () {
        browser.get(baseURL+'#/scenarios');
        var buttonCreate = element(by.buttonText('Create')).click();
        var name = element(by.model('scenarioModalController.scenario.name'));
        var EC = browser.ExpectedConditions;
        browser.wait(EC.visibilityOf(name), 5000);
        name.sendKeys('test');
        var buttonInstaller = element(by.xpath('//*[@id="ng-app"]/body/div[3]/div/div/div/div[1]/div[1]/fieldset/div/div/div[2]/div[2]/button'))
        buttonInstaller.click();
        var installer = element(by.model('installerModalCtrl.installer.installer'));
        browser.wait(EC.visibilityOf(installer), 5000);
        installer.sendKeys('testI');
        var buttonOK = element(by.xpath('//*[@id="ng-app"]/body/div[4]/div/div/div/div[2]/button[1]'));
        buttonOK.click();
        var buttonOK = element(by.buttonText('Ok'));
        buttonOK.click();
        expect(element(by.cssContainingText(".alert","Scenario is successfully created."))
        .isDisplayed()).toBe(true);
    });

    it('create scenarrio by user with installers with versions ', function () {
        browser.get(baseURL+'#/scenarios');
        var buttonCreate = element(by.buttonText('Create')).click();
        var name = element(by.model('scenarioModalController.scenario.name'));
        var EC = browser.ExpectedConditions;
        browser.wait(EC.visibilityOf(name), 5000);
        name.sendKeys('test');
        var buttonInstaller = element(by.xpath('//*[@id="ng-app"]/body/div[3]/div/div/div/div[1]/div[1]/fieldset/div/div/div[2]/div[2]/button'))
        buttonInstaller.click();
        var installer = element(by.model('installerModalCtrl.installer.installer'));
        browser.wait(EC.visibilityOf(installer), 5000);
        installer.sendKeys('testI');
        var buttonVersion = element(by.xpath('//*[@id="ng-app"]/body/div[4]/div/div/div/div[1]/div[1]/fieldset/div/div/div[2]/div[2]/button'))
        buttonVersion.click();
        var version = element(by.model('versionModalCtrl.version.version'));
        browser.wait(EC.visibilityOf(version), 5000);
        version.sendKeys('testV');
        var owner = element(by.model('versionModalCtrl.version.owner'));
        owner.sendKeys('testOwner');
        var buttonOK = element(by.xpath('//*[@id="ng-app"]/body/div[5]/div/div/div/div[2]/button[1]'));
        buttonOK.click();
        var buttonOK = element(by.xpath('//*[@id="ng-app"]/body/div[4]/div/div/div/div[2]/button[1]'));
        buttonOK.click();
        var buttonOK = element(by.buttonText('Ok'));
        buttonOK.click();
        expect(element(by.cssContainingText(".alert","Scenario is successfully created."))
        .isDisplayed()).toBe(true);
    });

    it('create scenarrio by user with installers with versions with project', function () {
        browser.get(baseURL+'#/scenarios');
        var buttonCreate = element(by.buttonText('Create')).click();
        var name = element(by.model('scenarioModalController.scenario.name'));
        var EC = browser.ExpectedConditions;
        browser.wait(EC.visibilityOf(name), 5000);
        name.sendKeys('test');
        var buttonInstaller = element(by.xpath('//*[@id="ng-app"]/body/div[3]/div/div/div/div[1]/div[1]/fieldset/div/div/div[2]/div[2]/button'))
        buttonInstaller.click();
        var installer = element(by.model('installerModalCtrl.installer.installer'));
        browser.wait(EC.visibilityOf(installer), 5000);
        installer.sendKeys('testI');
        var buttonVersion = element(by.xpath('//*[@id="ng-app"]/body/div[4]/div/div/div/div[1]/div[1]/fieldset/div/div/div[2]/div[2]/button'))
        buttonVersion.click();
        var version = element(by.model('versionModalCtrl.version.version'));
        browser.wait(EC.visibilityOf(version), 5000);
        version.sendKeys('testV');
        var owner = element(by.model('versionModalCtrl.version.owner'));
        owner.sendKeys('testOwner');
        var buttonProject = element(by.xpath('//*[@id="ng-app"]/body/div[5]/div/div/div/div[1]/div[1]/fieldset/div/div/div[3]/div[2]/button'))
        buttonProject.click();
        var project = element(by.model('projectModalCtrl.project.project'));
        browser.wait(EC.visibilityOf(project), 5000);
        project.sendKeys('testP');
        var buttonOK = element(by.xpath('//*[@id="ng-app"]/body/div[6]/div/div/div/div[2]/button[1]'));
        buttonOK.click();
        var buttonOK = element(by.xpath('//*[@id="ng-app"]/body/div[5]/div/div/div/div[2]/button[1]'));
        buttonOK.click();
        var buttonOK = element(by.xpath('//*[@id="ng-app"]/body/div[4]/div/div/div/div[2]/button[1]'));
        buttonOK.click();
        var buttonOK = element(by.buttonText('Ok'));
        buttonOK.click();
        expect(element(by.cssContainingText(".alert","Scenario is successfully created."))
        .isDisplayed()).toBe(true);
    });

    it('create scenarrio by user with installers with versions with project with custom', function () {
        browser.get(baseURL+'#/scenarios');
        var buttonCreate = element(by.buttonText('Create')).click();
        var name = element(by.model('scenarioModalController.scenario.name'));
        var EC = browser.ExpectedConditions;
        browser.wait(EC.visibilityOf(name), 5000);
        name.sendKeys('test');
        var buttonInstaller = element(by.xpath('//*[@id="ng-app"]/body/div[3]/div/div/div/div[1]/div[1]/fieldset/div/div/div[2]/div[2]/button'))
        buttonInstaller.click();
        var installer = element(by.model('installerModalCtrl.installer.installer'));
        browser.wait(EC.visibilityOf(installer), 5000);
        installer.sendKeys('testI');
        var buttonVersion = element(by.xpath('//*[@id="ng-app"]/body/div[4]/div/div/div/div[1]/div[1]/fieldset/div/div/div[2]/div[2]/button'))
        buttonVersion.click();
        var version = element(by.model('versionModalCtrl.version.version'));
        browser.wait(EC.visibilityOf(version), 5000);
        version.sendKeys('testV');
        var owner = element(by.model('versionModalCtrl.version.owner'));
        owner.sendKeys('testOwner');
        var buttonProject = element(by.xpath('//*[@id="ng-app"]/body/div[5]/div/div/div/div[1]/div[1]/fieldset/div/div/div[3]/div[2]/button'))
        buttonProject.click();
        var project = element(by.model('projectModalCtrl.project.project'));
        browser.wait(EC.visibilityOf(project), 5000);
        project.sendKeys('testP');
        var buttonCustom = element(by.xpath('//*[@id="ng-app"]/body/div[6]/div/div/div/div[1]/div[1]/fieldset/div/div/div[2]/div[2]/button'))
        buttonCustom.click();
        var custom = element(by.model('customModalCtrl.custom'));
        browser.wait(EC.visibilityOf(custom), 5000);
        custom.sendKeys('testC');
        var buttonOK = element(by.xpath('//*[@id="ng-app"]/body/div[7]/div/div/div/div[2]/button[1]'));
        buttonOK.click();
        var buttonOK = element(by.xpath('//*[@id="ng-app"]/body/div[6]/div/div/div/div[2]/button[1]'));
        buttonOK.click();
        var buttonOK = element(by.xpath('//*[@id="ng-app"]/body/div[5]/div/div/div/div[2]/button[1]'));
        buttonOK.click();
        var buttonOK = element(by.xpath('//*[@id="ng-app"]/body/div[4]/div/div/div/div[2]/button[1]'));
        buttonOK.click();
        var buttonOK = element(by.buttonText('Ok'));
        buttonOK.click();
        expect(element(by.cssContainingText(".alert","Scenario is successfully created."))
        .isDisplayed()).toBe(true);
    });

    it('view scenarrio by user ', function () {
        browser.get(baseURL+'#/scenarios');
        var scenarioLink = element(by.linkText('test-scenario')).click();
        var EC = browser.ExpectedConditions;
        browser.wait(EC.urlContains(baseURL+ '#/scenarios/test-scenario'), 10000);
    });

    it('delete Operation is visible for  user ', function () {
        browser.get(baseURL+'#/scenarios');
        var deleteOperation = element(by.css('a[title=Delete]'));
        expect(deleteOperation.isDisplayed()).toBe(true);
    });

    it('edit Operation is visible for  user ', function () {
        browser.get(baseURL+'#/scenarios');
        var deleteOperation = element(by.css('a[title=Edit]'));
        expect(deleteOperation.isDisplayed()).toBe(true);
    });

    it('Delete the Scenario ', function () {
        browser.get(baseURL+'#/scenarios');
        var deleteOperation = element(by.css('a[title=Delete]'));
        deleteOperation.click();
        var buttonOK = element(by.buttonText('Ok'));
        buttonOK.click();
        expect(element(by.cssContainingText(".alert","Scenario is successfully deleted."))
        .isDisplayed()).toBe(true);
    });

    it('Batch Delete the scenarios ', function () {
        browser.get(baseURL+'#/scenarios');
        var checkBox = element(by.model('ctrl.checkBox[index]'));
        checkBox.click();
        var buttonDelete = element(by.buttonText('Delete'));;
        buttonDelete.click();
        var buttonOK = element(by.buttonText('Ok'));
		buttonOK.click();
        expect(element(by.cssContainingText(".alert","Scenario is successfully deleted."))
        .isDisplayed()).toBe(true);
    });

    it('Edit the scenarios ', function () {
        browser.get(baseURL+'#/scenarios');
        var editOperation = element(by.css('a[title=Edit]'));
        editOperation.click();
        var name = element(by.model('ScenarioNameUpdateCtrl.name'));
        var EC = browser.ExpectedConditions;
        browser.wait(EC.visibilityOf(name), 5000);
        name.sendKeys('test2');
        var buttonOK = element(by.buttonText('Ok'));
        buttonOK.click()
        expect(element(by.cssContainingText(".alert","Scenario is successfully Updated."))
        .isDisplayed()).toBe(true);
    });

});