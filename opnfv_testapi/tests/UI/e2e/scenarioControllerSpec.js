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
        var row = element.all(by.repeater('(index, scenario) in ctrl.data.scenarios')).first();
        var cells = row.all(by.tagName('td'));
        expect(cells.get(1).getText()).toContain("test-scenario");
        var scenarioLink = element(by.linkText('test-scenario')).click();
        browser.wait(EC.urlContains(baseURL+ '#/scenarios/test-scenario'), 10000);
    });

    it( 'should not show the add installer option for anonymous user', function() {
        browser.get(baseURL+"#/scenarios/test-scenario");
        var EC = browser.ExpectedConditions;
        browser.wait(EC.urlContains(baseURL+ '#/scenarios/test-scenario'), 10000);
        var buttonAdd = element(by.xpath('//*[@id="ng-app"]/body/div/div[1]/div/table/tbody/tr[4]/td[2]/div[2]/button'))
        expect(buttonAdd.isDisplayed()).toBe(false);
    });

    it( 'Expand installers by anonymous user', function() {
        browser.get(baseURL+"#/scenarios/test-scenario");
        var EC = browser.ExpectedConditions;
        browser.wait(EC.urlContains(baseURL+ '#/scenarios/test-scenario'), 10000);
        var installerShow = element(by.xpath('//*[@id="ng-app"]/body/div/div[1]/div/table/tbody/tr[4]/td[2]/div[1]/a/p'))
        installerShow.click();
        var row = element.all(by.repeater('(indexI, installer) in ctrl.data.scenarios[0].installers')).first();
        var cells = row.all(by.tagName('td'));
        expect(cells.get(1).getText()).toContain("fuel");
    });

    it( 'should not show the delete installer option for anonymous user', function() {
        browser.get(baseURL+"#/scenarios/test-scenario");
        var EC = browser.ExpectedConditions;
        browser.wait(EC.urlContains(baseURL+ '#/scenarios/test-scenario'), 10000);
        var installersShow = element(by.xpath('//*[@id="ng-app"]/body/div/div[1]/div/table/tbody/tr[4]/td[2]/div[1]/a/p'))
        installersShow.click();
        var installerDelete = element(by.xpath('//*[@id="ng-app"]/body/div/div[1]/div/table/tbody/tr[4]/td[2]/div[3]/div/table/tbody/tr[1]/td[3]/button'))
        expect(installerDelete.isDisplayed()).toBe(false);
    });

    it( 'Expand installer by anonymous user', function() {
        browser.get(baseURL+"#/scenarios/test-scenario");
        var EC = browser.ExpectedConditions;
        browser.wait(EC.urlContains(baseURL+ '#/scenarios/test-scenario'), 10000);
        var installersShow = element(by.xpath('//*[@id="ng-app"]/body/div/div[1]/div/table/tbody/tr[4]/td[2]/div[1]/a/p'))
        installersShow.click();
        var installerShow = element(by.xpath('//*[@id="ng-app"]/body/div/div[1]/div/table/tbody/tr[4]/td[2]/div[3]/div/table/tbody/tr[1]/td[2]/a'))
        installerShow.click();
        var versionsShow = element(by.xpath('//*[@id="ng-app"]/body/div/div[1]/div/table/tbody/tr[4]/td[2]/div[3]/div/table/tbody/tr[2]/td[2]/div[1]/a/p'))
        expect(versionsShow.isDisplayed()).toBe(true)
    });

    it( 'Expand versions by anonymous user', function() {
        browser.get(baseURL+"#/scenarios/test-scenario");
        var EC = browser.ExpectedConditions;
        browser.wait(EC.urlContains(baseURL+ '#/scenarios/test-scenario'), 10000);
        var installersShow = element(by.xpath('//*[@id="ng-app"]/body/div/div[1]/div/table/tbody/tr[4]/td[2]/div[1]/a/p'))
        installersShow.click();
        var installerShow = element(by.xpath('//*[@id="ng-app"]/body/div/div[1]/div/table/tbody/tr[4]/td[2]/div[3]/div/table/tbody/tr[1]/td[2]/a'))
        installerShow.click();
        var versionsShow = element(by.xpath('//*[@id="ng-app"]/body/div/div[1]/div/table/tbody/tr[4]/td[2]/div[3]/div/table/tbody/tr[2]/td[2]/div[1]/a/p'))
        versionsShow.click();
        var versionShow = element(by.xpath('//*[@id="ng-app"]/body/div/div[1]/div/table/tbody/tr[4]/td[2]/div[3]/div/table/tbody/tr[2]/td[2]/div[3]/div/table/tbody/tr[1]/td[2]/a'))
        expect(versionShow.isDisplayed()).toBe(true);
    });

    it( 'Expand version by anonymous user', function() {
        browser.get(baseURL+"#/scenarios/test-scenario");
        var EC = browser.ExpectedConditions;
        browser.wait(EC.urlContains(baseURL+ '#/scenarios/test-scenario'), 10000);
        var installersShow = element(by.xpath('//*[@id="ng-app"]/body/div/div[1]/div/table/tbody/tr[4]/td[2]/div[1]/a/p'))
        installersShow.click();
        var installerShow = element(by.xpath('//*[@id="ng-app"]/body/div/div[1]/div/table/tbody/tr[4]/td[2]/div[3]/div/table/tbody/tr[1]/td[2]/a'))
        installerShow.click();
        var versionsShow = element(by.xpath('//*[@id="ng-app"]/body/div/div[1]/div/table/tbody/tr[4]/td[2]/div[3]/div/table/tbody/tr[2]/td[2]/div[1]/a/p'))
        versionsShow.click();
        var versionShow = element(by.xpath('//*[@id="ng-app"]/body/div/div[1]/div/table/tbody/tr[4]/td[2]/div[3]/div/table/tbody/tr[2]/td[2]/div[3]/div/table/tbody/tr[1]/td[2]/a'))
        versionShow.click()
        var projectsShow = element(by.xpath('//*[@id="ng-app"]/body/div/div[1]/div/table/tbody/tr[4]/td[2]/div[3]/div/table/tbody/tr[2]/td[2]/div[3]/div/table/tbody/tr[3]/td[2]/div[1]/a'))
        expect(projectsShow.isDisplayed()).toBe(true);
    });

    it( 'Expand projects by anonymous user', function() {
        browser.get(baseURL+"#/scenarios/test-scenario");
        var EC = browser.ExpectedConditions;
        browser.wait(EC.urlContains(baseURL+ '#/scenarios/test-scenario'), 10000);
        var installersShow = element(by.xpath('//*[@id="ng-app"]/body/div/div[1]/div/table/tbody/tr[4]/td[2]/div[1]/a/p'))
        installersShow.click();
        var installerShow = element(by.xpath('//*[@id="ng-app"]/body/div/div[1]/div/table/tbody/tr[4]/td[2]/div[3]/div/table/tbody/tr[1]/td[2]/a'))
        installerShow.click();
        var versionsShow = element(by.xpath('//*[@id="ng-app"]/body/div/div[1]/div/table/tbody/tr[4]/td[2]/div[3]/div/table/tbody/tr[2]/td[2]/div[1]/a/p'))
        versionsShow.click();
        var versionShow = element(by.xpath('//*[@id="ng-app"]/body/div/div[1]/div/table/tbody/tr[4]/td[2]/div[3]/div/table/tbody/tr[2]/td[2]/div[3]/div/table/tbody/tr[1]/td[2]/a'))
        versionShow.click()
        var projectsShow = element(by.xpath('//*[@id="ng-app"]/body/div/div[1]/div/table/tbody/tr[4]/td[2]/div[3]/div/table/tbody/tr[2]/td[2]/div[3]/div/table/tbody/tr[3]/td[2]/div[1]/a'))
        projectsShow.click();
        var projectShow = element(by.xpath('//*[@id="ng-app"]/body/div/div[1]/div/table/tbody/tr[4]/td[2]/div[3]/div/table/tbody/tr[2]/td[2]/div[3]/div/table/tbody/tr[3]/td[2]/div[3]/div/table/tbody/tr[1]/td[2]/a'))
        expect(projectShow.isDisplayed()).toBe(true)
    });

    it( 'Expand project by anonymous user', function() {
        browser.get(baseURL+"#/scenarios/test-scenario");
        var EC = browser.ExpectedConditions;
        browser.wait(EC.urlContains(baseURL+ '#/scenarios/test-scenario'), 10000);
        var installersShow = element(by.xpath('//*[@id="ng-app"]/body/div/div[1]/div/table/tbody/tr[4]/td[2]/div[1]/a/p'))
        installersShow.click();
        var installerShow = element(by.xpath('//*[@id="ng-app"]/body/div/div[1]/div/table/tbody/tr[4]/td[2]/div[3]/div/table/tbody/tr[1]/td[2]/a'))
        installerShow.click();
        var versionsShow = element(by.xpath('//*[@id="ng-app"]/body/div/div[1]/div/table/tbody/tr[4]/td[2]/div[3]/div/table/tbody/tr[2]/td[2]/div[1]/a/p'))
        versionsShow.click();
        var versionShow = element(by.xpath('//*[@id="ng-app"]/body/div/div[1]/div/table/tbody/tr[4]/td[2]/div[3]/div/table/tbody/tr[2]/td[2]/div[3]/div/table/tbody/tr[1]/td[2]/a'))
        versionShow.click()
        var projectsShow = element(by.xpath('//*[@id="ng-app"]/body/div/div[1]/div/table/tbody/tr[4]/td[2]/div[3]/div/table/tbody/tr[2]/td[2]/div[3]/div/table/tbody/tr[3]/td[2]/div[1]/a'))
        projectsShow.click();
        var projectShow = element(by.xpath('//*[@id="ng-app"]/body/div/div[1]/div/table/tbody/tr[4]/td[2]/div[3]/div/table/tbody/tr[2]/td[2]/div[3]/div/table/tbody/tr[3]/td[2]/div[3]/div/table/tbody/tr[1]/td[2]/a'))
        projectShow.click();
        var customsShow = element(by.xpath('//*[@id="ng-app"]/body/div/div[1]/div/table/tbody/tr[4]/td[2]/div[3]/div/table/tbody/tr[2]/td[2]/div[3]/div/table/tbody/tr[3]/td[2]/div[3]/div/table/tbody/tr[4]/td[2]/a/p'))
        expect(customsShow.isDisplayed()).toBe(true)
        var trustIndicatorsShow = element(by.xpath('//*[@id="ng-app"]/body/div/div[1]/div/table/tbody/tr[4]/td[2]/div[3]/div/table/tbody/tr[2]/td[2]/div[3]/div/table/tbody/tr[3]/td[2]/div[3]/div/table/tbody/tr[2]/td[2]/a/p'))
        expect(trustIndicatorsShow.isDisplayed()).toBe(true)
        var scoresShow = element(by.xpath('//*[@id="ng-app"]/body/div/div[1]/div/table/tbody/tr[4]/td[2]/div[3]/div/table/tbody/tr[2]/td[2]/div[3]/div/table/tbody/tr[3]/td[2]/div[3]/div/table/tbody/tr[3]/td[2]/a/p'))
        expect(scoresShow.isDisplayed()).toBe(true)
    });

});


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
                    path: '/api/v1/scenarios/test-scenario/installers',
                    method: 'POST'
                },
                response: {
                    status : 200
                }
            },
            {
                request: {
                    path: '/api/v1/scenarios/test-scenario/installers',
                    method: 'DELETE'
                },
                response: {
                    status : 200
                }
            },
            {
                request: {
                    path: '/api/v1/scenarios/test-scenario/versions',
                    method: 'POST',
                    queryString: {
                        installer: 'fuel'
                    }
                },
                response: {
                    status : 200
                }
            },
            {
                request: {
                    path: '/api/v1/scenarios/test-scenario/versions',
                    method: 'DELETE',
                    queryString: {
                        installer: 'fuel'
                    }
                },
                response: {
                    status : 200
                }
            },
            {
                request: {
                    path: '/api/v1/scenarios/test-scenario/projects',
                    method: 'POST',
                    queryString: {
                        installer: 'fuel',
                        version: 'colorado'
                    }
                },
                response: {
                    status : 200
                }
            },
            {
                request: {
                    path: '/api/v1/scenarios/test-scenario/projects',
                    method: 'DELETE',
                    queryString: {
                        installer: 'fuel',
                        version: 'colorado'
                    }
                },
                response: {
                    status : 200
                }
            },
            {
                request: {
                    path: '/api/v1/scenarios/test-scenario/customs',
                    method: 'POST',
                    queryString: {
                        installer: 'fuel',
                        version: 'colorado',
                        project: 'yardstick'
                    }
                },
                response: {
                    status : 200
                }
            },
            {
                request: {
                    path: '/api/v1/scenarios/test-scenario/customs',
                    method: 'DELETE',
                    queryString: {
                        installer: 'fuel',
                        version: 'colorado',
                        project: 'yardstick'
                    }
                },
                response: {
                    status : 200
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
        var row = element.all(by.repeater('(index, scenario) in ctrl.data.scenarios')).first();
        var cells = row.all(by.tagName('td'));
        expect(cells.get(1).getText()).toContain("test-scenario");
        var scenarioLink = element(by.linkText('test-scenario')).click();
        browser.wait(EC.urlContains(baseURL+ '#/scenarios/test-scenario'), 10000);
    });

    it( 'should not show the add installer option for user', function() {
        browser.get(baseURL+"#/scenarios/test-scenario");
        var EC = browser.ExpectedConditions;
        browser.wait(EC.urlContains(baseURL+ '#/scenarios/test-scenario'), 10000);
        var buttonAdd = element(by.xpath('//*[@id="ng-app"]/body/div/div[1]/div/table/tbody/tr[4]/td[2]/div[2]/button'))
        expect(buttonAdd.isDisplayed()).toBe(true);
    });

    it('add installer', function(){
        browser.get(baseURL+"#/scenarios/test-scenario");
        var EC = browser.ExpectedConditions;
        browser.wait(EC.urlContains(baseURL+ '#/scenarios/test-scenario'), 10000);
        var buttonAdd = element(by.xpath('//*[@id="ng-app"]/body/div/div[1]/div/table/tbody/tr[4]/td[2]/div[2]/button'))
        buttonAdd.click();
        var name = element(by.model('installerModalCtrl.installer.installer'));
        var EC = browser.ExpectedConditions;
        browser.wait(EC.visibilityOf(name), 5000);
        name.sendKeys('test');
        var buttonOk = element(by.xpath('//*[@id="ng-app"]/body/div[3]/div/div/div/div[2]/button[1]'))
        buttonOk.click()
        expect(element(by.cssContainingText(".alert","Installers are successfully updated."))
        .isDisplayed()).toBe(true);

    });

    it( 'Expand installers by  user', function() {
        browser.get(baseURL+"#/scenarios/test-scenario");
        var EC = browser.ExpectedConditions;
        browser.wait(EC.urlContains(baseURL+ '#/scenarios/test-scenario'), 10000);
        var installerShow = element(by.xpath('//*[@id="ng-app"]/body/div/div[1]/div/table/tbody/tr[4]/td[2]/div[1]/a/p'))
        installerShow.click();
        var row = element.all(by.repeater('(indexI, installer) in ctrl.data.scenarios[0].installers')).first();
        var cells = row.all(by.tagName('td'));
        expect(cells.get(1).getText()).toContain("fuel");
    });

    it( 'should show the delete installer option for  user', function() {
        browser.get(baseURL+"#/scenarios/test-scenario");
        var EC = browser.ExpectedConditions;
        browser.wait(EC.urlContains(baseURL+ '#/scenarios/test-scenario'), 10000);
        var installersShow = element(by.xpath('//*[@id="ng-app"]/body/div/div[1]/div/table/tbody/tr[4]/td[2]/div[1]/a/p'))
        installersShow.click();
        var installerDelete = element(by.xpath('//*[@id="ng-app"]/body/div/div[1]/div/table/tbody/tr[4]/td[2]/div[3]/div/table/tbody/tr[1]/td[3]/button'))
        expect(installerDelete.isDisplayed()).toBe(true);
    });

    it( 'delete installer', function() {
        browser.get(baseURL+"#/scenarios/test-scenario");
        var EC = browser.ExpectedConditions;
        browser.wait(EC.urlContains(baseURL+ '#/scenarios/test-scenario'), 10000);
        var installersShow = element(by.xpath('//*[@id="ng-app"]/body/div/div[1]/div/table/tbody/tr[4]/td[2]/div[1]/a/p'))
        installersShow.click();
        var installerDelete = element(by.xpath('//*[@id="ng-app"]/body/div/div[1]/div/table/tbody/tr[4]/td[2]/div[3]/div/table/tbody/tr[1]/td[3]/button'))
        installerDelete.click()
        var buttonOK = element(by.buttonText('Ok'));
        buttonOK.click();
        expect(element(by.cssContainingText(".alert","Installer is successfully deleted."))
        .isDisplayed()).toBe(true);
    });

    it( 'Expand installer by  user', function() {
        browser.get(baseURL+"#/scenarios/test-scenario");
        var EC = browser.ExpectedConditions;
        browser.wait(EC.urlContains(baseURL+ '#/scenarios/test-scenario'), 10000);
        var installersShow = element(by.xpath('//*[@id="ng-app"]/body/div/div[1]/div/table/tbody/tr[4]/td[2]/div[1]/a/p'))
        installersShow.click();
        var installerShow = element(by.xpath('//*[@id="ng-app"]/body/div/div[1]/div/table/tbody/tr[4]/td[2]/div[3]/div/table/tbody/tr[1]/td[2]/a'))
        installerShow.click();
        var versionsShow = element(by.xpath('//*[@id="ng-app"]/body/div/div[1]/div/table/tbody/tr[4]/td[2]/div[3]/div/table/tbody/tr[2]/td[2]/div[1]/a/p'))
        expect(versionsShow.isDisplayed()).toBe(true)
    });

    it( 'add version for an installer', function() {
        browser.get(baseURL+"#/scenarios/test-scenario");
        var EC = browser.ExpectedConditions;
        browser.wait(EC.urlContains(baseURL+ '#/scenarios/test-scenario'), 10000);
        var installersShow = element(by.xpath('//*[@id="ng-app"]/body/div/div[1]/div/table/tbody/tr[4]/td[2]/div[1]/a/p'))
        installersShow.click();
        var installerShow = element(by.xpath('//*[@id="ng-app"]/body/div/div[1]/div/table/tbody/tr[4]/td[2]/div[3]/div/table/tbody/tr[1]/td[2]/a'))
        installerShow.click();
        var versionAdd = element(by.xpath('//*[@id="ng-app"]/body/div/div[1]/div/table/tbody/tr[4]/td[2]/div[3]/div/table/tbody/tr[2]/td[2]/div[2]/button'))
        versionAdd.click()
        var version = element(by.model('versionModalCtrl.version.version'));
        browser.wait(EC.visibilityOf(version), 5000);
        version.sendKeys('testV');
        var owner = element(by.model('versionModalCtrl.version.owner'));
        owner.sendKeys('testOwner');
        var buttonOk = element(by.xpath('//*[@id="ng-app"]/body/div[3]/div/div/div/div[2]/button[1]'))
        buttonOk.click()
        expect(element(by.cssContainingText(".alert","Versions are successfully updated."))
        .isDisplayed()).toBe(true);
    });

    it( 'Expand versions by  user', function() {
        browser.get(baseURL+"#/scenarios/test-scenario");
        var EC = browser.ExpectedConditions;
        browser.wait(EC.urlContains(baseURL+ '#/scenarios/test-scenario'), 10000);
        var installersShow = element(by.xpath('//*[@id="ng-app"]/body/div/div[1]/div/table/tbody/tr[4]/td[2]/div[1]/a/p'))
        installersShow.click();
        var installerShow = element(by.xpath('//*[@id="ng-app"]/body/div/div[1]/div/table/tbody/tr[4]/td[2]/div[3]/div/table/tbody/tr[1]/td[2]/a'))
        installerShow.click();
        var versionsShow = element(by.xpath('//*[@id="ng-app"]/body/div/div[1]/div/table/tbody/tr[4]/td[2]/div[3]/div/table/tbody/tr[2]/td[2]/div[1]/a/p'))
        versionsShow.click();
        var versionShow = element(by.xpath('//*[@id="ng-app"]/body/div/div[1]/div/table/tbody/tr[4]/td[2]/div[3]/div/table/tbody/tr[2]/td[2]/div[3]/div/table/tbody/tr[1]/td[2]/a'))
        expect(versionShow.isDisplayed()).toBe(true);
        var installerAdd = element(by.xpath('//*[@id="ng-app"]/body/div/div[1]/div/table/tbody/tr[4]/td[2]/div[2]/button'))
        var installerDelete = element(by.xpath('//*[@id="ng-app"]/body/div/div[1]/div/table/tbody/tr[4]/td[2]/div[3]/div/table/tbody/tr[1]/td[3]/button'))
        expect(installerAdd.isDisplayed()).toBe(false);
        expect(installerDelete.isDisplayed()).toBe(false)
    });

    it( 'delete version', function() {
        browser.get(baseURL+"#/scenarios/test-scenario");
        var EC = browser.ExpectedConditions;
        browser.wait(EC.urlContains(baseURL+ '#/scenarios/test-scenario'), 10000);
        var installersShow = element(by.xpath('//*[@id="ng-app"]/body/div/div[1]/div/table/tbody/tr[4]/td[2]/div[1]/a/p'))
        installersShow.click();
        var installerShow = element(by.xpath('//*[@id="ng-app"]/body/div/div[1]/div/table/tbody/tr[4]/td[2]/div[3]/div/table/tbody/tr[1]/td[2]/a'))
        installerShow.click();
        var versionsShow = element(by.xpath('//*[@id="ng-app"]/body/div/div[1]/div/table/tbody/tr[4]/td[2]/div[3]/div/table/tbody/tr[2]/td[2]/div[1]/a/p'))
        versionsShow.click();
        var versionShow = element(by.xpath('//*[@id="ng-app"]/body/div/div[1]/div/table/tbody/tr[4]/td[2]/div[3]/div/table/tbody/tr[2]/td[2]/div[3]/div/table/tbody/tr[1]/td[2]/a'))
        versionShow.click()
        var versionDelete = element(by.xpath('//*[@id="ng-app"]/body/div/div[1]/div/table/tbody/tr[4]/td[2]/div[3]/div/table/tbody/tr[2]/td[2]/div[3]/div/table/tbody[1]/tr[1]/td[3]/button'))
        versionDelete.click()
        var buttonOK = element(by.buttonText('Ok'));
        buttonOK.click();
        expect(element(by.cssContainingText(".alert","Versions are successfully deleted."))
        .isDisplayed()).toBe(true);
    });

    it( 'Expand version by  user', function() {
        browser.get(baseURL+"#/scenarios/test-scenario");
        var EC = browser.ExpectedConditions;
        browser.wait(EC.urlContains(baseURL+ '#/scenarios/test-scenario'), 10000);
        var installersShow = element(by.xpath('//*[@id="ng-app"]/body/div/div[1]/div/table/tbody/tr[4]/td[2]/div[1]/a/p'))
        installersShow.click();
        var installerShow = element(by.xpath('//*[@id="ng-app"]/body/div/div[1]/div/table/tbody/tr[4]/td[2]/div[3]/div/table/tbody/tr[1]/td[2]/a'))
        installerShow.click();
        var versionsShow = element(by.xpath('//*[@id="ng-app"]/body/div/div[1]/div/table/tbody/tr[4]/td[2]/div[3]/div/table/tbody/tr[2]/td[2]/div[1]/a/p'))
        versionsShow.click();
        var versionShow = element(by.xpath('//*[@id="ng-app"]/body/div/div[1]/div/table/tbody/tr[4]/td[2]/div[3]/div/table/tbody/tr[2]/td[2]/div[3]/div/table/tbody/tr[1]/td[2]/a'))
        versionShow.click()
        var projectsShow = element(by.xpath('//*[@id="ng-app"]/body/div/div[1]/div/table/tbody/tr[4]/td[2]/div[3]/div/table/tbody/tr[2]/td[2]/div[3]/div/table/tbody/tr[3]/td[2]/div[1]/a'))
        expect(projectsShow.isDisplayed()).toBe(true);
    });

    it( 'add project', function() {
        browser.get(baseURL+"#/scenarios/test-scenario");
        var EC = browser.ExpectedConditions;
        browser.wait(EC.urlContains(baseURL+ '#/scenarios/test-scenario'), 10000);
        var installersShow = element(by.xpath('//*[@id="ng-app"]/body/div/div[1]/div/table/tbody/tr[4]/td[2]/div[1]/a/p'))
        installersShow.click();
        var installerShow = element(by.xpath('//*[@id="ng-app"]/body/div/div[1]/div/table/tbody/tr[4]/td[2]/div[3]/div/table/tbody/tr[1]/td[2]/a'))
        installerShow.click();
        var versionsShow = element(by.xpath('//*[@id="ng-app"]/body/div/div[1]/div/table/tbody/tr[4]/td[2]/div[3]/div/table/tbody/tr[2]/td[2]/div[1]/a/p'))
        versionsShow.click();
        var versionShow = element(by.xpath('//*[@id="ng-app"]/body/div/div[1]/div/table/tbody/tr[4]/td[2]/div[3]/div/table/tbody/tr[2]/td[2]/div[3]/div/table/tbody/tr[1]/td[2]/a'))
        versionShow.click()
        var projectAdd = element(by.xpath('//*[@id="ng-app"]/body/div/div[1]/div/table/tbody/tr[4]/td[2]/div[3]/div/table/tbody/tr[2]/td[2]/div[3]/div/table/tbody/tr[3]/td[2]/div[2]/button'))
        projectAdd.click()
        var project = element(by.model('projectModalCtrl.project.project'));
        browser.wait(EC.visibilityOf(project), 5000);
        project.sendKeys('testP');
        var buttonOk = element(by.xpath('//*[@id="ng-app"]/body/div[3]/div/div/div/div[2]/button[1]'))
        buttonOk.click()
        expect(element(by.cssContainingText(".alert","Projects are successfully updated."))
        .isDisplayed()).toBe(true);
    });

    it( 'Expand projects by  user', function() {
        browser.get(baseURL+"#/scenarios/test-scenario");
        var EC = browser.ExpectedConditions;
        browser.wait(EC.urlContains(baseURL+ '#/scenarios/test-scenario'), 10000);
        var installersShow = element(by.xpath('//*[@id="ng-app"]/body/div/div[1]/div/table/tbody/tr[4]/td[2]/div[1]/a/p'))
        installersShow.click();
        var installerShow = element(by.xpath('//*[@id="ng-app"]/body/div/div[1]/div/table/tbody/tr[4]/td[2]/div[3]/div/table/tbody/tr[1]/td[2]/a'))
        installerShow.click();
        var versionsShow = element(by.xpath('//*[@id="ng-app"]/body/div/div[1]/div/table/tbody/tr[4]/td[2]/div[3]/div/table/tbody/tr[2]/td[2]/div[1]/a/p'))
        versionsShow.click();
        var versionShow = element(by.xpath('//*[@id="ng-app"]/body/div/div[1]/div/table/tbody/tr[4]/td[2]/div[3]/div/table/tbody/tr[2]/td[2]/div[3]/div/table/tbody/tr[1]/td[2]/a'))
        versionShow.click()
        var projectsShow = element(by.xpath('//*[@id="ng-app"]/body/div/div[1]/div/table/tbody/tr[4]/td[2]/div[3]/div/table/tbody/tr[2]/td[2]/div[3]/div/table/tbody/tr[3]/td[2]/div[1]/a'))
        projectsShow.click();
        var projectShow = element(by.xpath('//*[@id="ng-app"]/body/div/div[1]/div/table/tbody/tr[4]/td[2]/div[3]/div/table/tbody/tr[2]/td[2]/div[3]/div/table/tbody/tr[3]/td[2]/div[3]/div/table/tbody/tr[1]/td[2]/a'))
        expect(projectShow.isDisplayed()).toBe(true)
        var versionAdd = element(by.xpath('//*[@id="ng-app"]/body/div/div[1]/div/table/tbody/tr[4]/td[2]/div[3]/div/table/tbody/tr[2]/td[2]/div[2]/button'))
        var versionDelete = element(by.xpath('//*[@id="ng-app"]/body/div/div[1]/div/table/tbody/tr[4]/td[2]/div[3]/div/table/tbody/tr[2]/td[2]/div[3]/div/table/tbody/tr[1]/td[3]/button'))
        expect(versionAdd.isDisplayed()).toBe(false)
        expect(versionDelete.isDisplayed()).toBe(false)
    });

    it( 'delete project', function() {
        browser.get(baseURL+"#/scenarios/test-scenario");
        var EC = browser.ExpectedConditions;
        browser.wait(EC.urlContains(baseURL+ '#/scenarios/test-scenario'), 10000);
        var installersShow = element(by.xpath('//*[@id="ng-app"]/body/div/div[1]/div/table/tbody/tr[4]/td[2]/div[1]/a/p'))
        installersShow.click();
        var installerShow = element(by.xpath('//*[@id="ng-app"]/body/div/div[1]/div/table/tbody/tr[4]/td[2]/div[3]/div/table/tbody/tr[1]/td[2]/a'))
        installerShow.click();
        var versionsShow = element(by.xpath('//*[@id="ng-app"]/body/div/div[1]/div/table/tbody/tr[4]/td[2]/div[3]/div/table/tbody/tr[2]/td[2]/div[1]/a/p'))
        versionsShow.click();
        var versionShow = element(by.xpath('//*[@id="ng-app"]/body/div/div[1]/div/table/tbody/tr[4]/td[2]/div[3]/div/table/tbody/tr[2]/td[2]/div[3]/div/table/tbody/tr[1]/td[2]/a'))
        versionShow.click()
        var projectsShow = element(by.xpath('//*[@id="ng-app"]/body/div/div[1]/div/table/tbody/tr[4]/td[2]/div[3]/div/table/tbody/tr[2]/td[2]/div[3]/div/table/tbody/tr[3]/td[2]/div[1]/a'))
        projectsShow.click();
        var projectDelete = element(by.xpath('//*[@id="ng-app"]/body/div/div[1]/div/table/tbody/tr[4]/td[2]/div[3]/div/table/tbody/tr[2]/td[2]/div[3]/div/table/tbody/tr[3]/td[2]/div[3]/div/table/tbody[1]/tr[1]/td[3]/button'))
        projectDelete.click()
        var buttonOK = element(by.buttonText('Ok'));
        buttonOK.click();
        expect(element(by.cssContainingText(".alert","Projects are successfully Deleted."))
        .isDisplayed()).toBe(true);
    });

    it( 'Expand project by  user', function() {
        browser.get(baseURL+"#/scenarios/test-scenario");
        var EC = browser.ExpectedConditions;
        browser.wait(EC.urlContains(baseURL+ '#/scenarios/test-scenario'), 10000);
        var installersShow = element(by.xpath('//*[@id="ng-app"]/body/div/div[1]/div/table/tbody/tr[4]/td[2]/div[1]/a/p'))
        installersShow.click();
        var installerShow = element(by.xpath('//*[@id="ng-app"]/body/div/div[1]/div/table/tbody/tr[4]/td[2]/div[3]/div/table/tbody/tr[1]/td[2]/a'))
        installerShow.click();
        var versionsShow = element(by.xpath('//*[@id="ng-app"]/body/div/div[1]/div/table/tbody/tr[4]/td[2]/div[3]/div/table/tbody/tr[2]/td[2]/div[1]/a/p'))
        versionsShow.click();
        var versionShow = element(by.xpath('//*[@id="ng-app"]/body/div/div[1]/div/table/tbody/tr[4]/td[2]/div[3]/div/table/tbody/tr[2]/td[2]/div[3]/div/table/tbody/tr[1]/td[2]/a'))
        versionShow.click()
        var projectsShow = element(by.xpath('//*[@id="ng-app"]/body/div/div[1]/div/table/tbody/tr[4]/td[2]/div[3]/div/table/tbody/tr[2]/td[2]/div[3]/div/table/tbody/tr[3]/td[2]/div[1]/a'))
        projectsShow.click();
        var projectShow = element(by.xpath('//*[@id="ng-app"]/body/div/div[1]/div/table/tbody/tr[4]/td[2]/div[3]/div/table/tbody/tr[2]/td[2]/div[3]/div/table/tbody/tr[3]/td[2]/div[3]/div/table/tbody/tr[1]/td[2]/a'))
        projectShow.click();
        var customsShow = element(by.xpath('//*[@id="ng-app"]/body/div/div[1]/div/table/tbody/tr[4]/td[2]/div[3]/div/table/tbody/tr[2]/td[2]/div[3]/div/table/tbody/tr[3]/td[2]/div[3]/div/table/tbody/tr[4]/td[2]/a/p'))
        expect(customsShow.isDisplayed()).toBe(true)
        var trustIndicatorsShow = element(by.xpath('//*[@id="ng-app"]/body/div/div[1]/div/table/tbody/tr[4]/td[2]/div[3]/div/table/tbody/tr[2]/td[2]/div[3]/div/table/tbody/tr[3]/td[2]/div[3]/div/table/tbody/tr[2]/td[2]/a/p'))
        expect(trustIndicatorsShow.isDisplayed()).toBe(true)
        var scoresShow = element(by.xpath('//*[@id="ng-app"]/body/div/div[1]/div/table/tbody/tr[4]/td[2]/div[3]/div/table/tbody/tr[2]/td[2]/div[3]/div/table/tbody/tr[3]/td[2]/div[3]/div/table/tbody/tr[3]/td[2]/a/p'))
        expect(scoresShow.isDisplayed()).toBe(true)
    });

    it( 'Expand trust indicator by user', function() {
        browser.get(baseURL+"#/scenarios/test-scenario");
        var EC = browser.ExpectedConditions;
        browser.wait(EC.urlContains(baseURL+ '#/scenarios/test-scenario'), 10000);
        var installersShow = element(by.xpath('//*[@id="ng-app"]/body/div/div[1]/div/table/tbody/tr[4]/td[2]/div[1]/a/p'))
        installersShow.click();
        var installerShow = element(by.xpath('//*[@id="ng-app"]/body/div/div[1]/div/table/tbody/tr[4]/td[2]/div[3]/div/table/tbody/tr[1]/td[2]/a'))
        installerShow.click();
        var versionsShow = element(by.xpath('//*[@id="ng-app"]/body/div/div[1]/div/table/tbody/tr[4]/td[2]/div[3]/div/table/tbody/tr[2]/td[2]/div[1]/a/p'))
        versionsShow.click();
        var versionShow = element(by.xpath('//*[@id="ng-app"]/body/div/div[1]/div/table/tbody/tr[4]/td[2]/div[3]/div/table/tbody/tr[2]/td[2]/div[3]/div/table/tbody/tr[1]/td[2]/a'))
        versionShow.click()
        var projectsShow = element(by.xpath('//*[@id="ng-app"]/body/div/div[1]/div/table/tbody/tr[4]/td[2]/div[3]/div/table/tbody/tr[2]/td[2]/div[3]/div/table/tbody/tr[3]/td[2]/div[1]/a'))
        projectsShow.click();
        var projectShow = element(by.xpath('//*[@id="ng-app"]/body/div/div[1]/div/table/tbody/tr[4]/td[2]/div[3]/div/table/tbody/tr[2]/td[2]/div[3]/div/table/tbody/tr[3]/td[2]/div[3]/div/table/tbody/tr[1]/td[2]/a'))
        projectShow.click();
        var trustIndicatorsShow = element(by.xpath('//*[@id="ng-app"]/body/div/div[1]/div/table/tbody/tr[4]/td[2]/div[3]/div/table/tbody/tr[2]/td[2]/div[3]/div/table/tbody/tr[3]/td[2]/div[3]/div/table/tbody/tr[2]/td[2]/a/p'))
        trustIndicatorsShow.click();
        var row = element.all(by.repeater('(indexTI, trust_indicator) in project.trust_indicators')).first();
        var cells = row.all(by.tagName('td'));
        expect(cells.get(1).getText()).toContain("silver");
    });

    it( 'Expand score by user', function() {
        browser.get(baseURL+"#/scenarios/test-scenario");
        var EC = browser.ExpectedConditions;
        browser.wait(EC.urlContains(baseURL+ '#/scenarios/test-scenario'), 10000);
        var installersShow = element(by.xpath('//*[@id="ng-app"]/body/div/div[1]/div/table/tbody/tr[4]/td[2]/div[1]/a/p'))
        installersShow.click();
        var installerShow = element(by.xpath('//*[@id="ng-app"]/body/div/div[1]/div/table/tbody/tr[4]/td[2]/div[3]/div/table/tbody/tr[1]/td[2]/a'))
        installerShow.click();
        var versionsShow = element(by.xpath('//*[@id="ng-app"]/body/div/div[1]/div/table/tbody/tr[4]/td[2]/div[3]/div/table/tbody/tr[2]/td[2]/div[1]/a/p'))
        versionsShow.click();
        var versionShow = element(by.xpath('//*[@id="ng-app"]/body/div/div[1]/div/table/tbody/tr[4]/td[2]/div[3]/div/table/tbody/tr[2]/td[2]/div[3]/div/table/tbody/tr[1]/td[2]/a'))
        versionShow.click()
        var projectsShow = element(by.xpath('//*[@id="ng-app"]/body/div/div[1]/div/table/tbody/tr[4]/td[2]/div[3]/div/table/tbody/tr[2]/td[2]/div[3]/div/table/tbody/tr[3]/td[2]/div[1]/a'))
        projectsShow.click();
        var projectShow = element(by.xpath('//*[@id="ng-app"]/body/div/div[1]/div/table/tbody/tr[4]/td[2]/div[3]/div/table/tbody/tr[2]/td[2]/div[3]/div/table/tbody/tr[3]/td[2]/div[3]/div/table/tbody/tr[1]/td[2]/a'))
        projectShow.click();
        var scoresShow = element(by.xpath('//*[@id="ng-app"]/body/div/div[1]/div/table/tbody/tr[4]/td[2]/div[3]/div/table/tbody/tr[2]/td[2]/div[3]/div/table/tbody/tr[3]/td[2]/div[3]/div/table/tbody[1]/tr[3]/td[2]/a/p'))
        scoresShow.click();
        var row = element.all(by.repeater('(indexSC, score) in project.scores')).first();
        var cells = row.all(by.tagName('td'));
        expect(cells.get(1).getText()).toContain("14/24");
    });

    it( 'Expand Customs by user', function() {
        browser.get(baseURL+"#/scenarios/test-scenario");
        var EC = browser.ExpectedConditions;
        browser.wait(EC.urlContains(baseURL+ '#/scenarios/test-scenario'), 10000);
        var installersShow = element(by.xpath('//*[@id="ng-app"]/body/div/div[1]/div/table/tbody/tr[4]/td[2]/div[1]/a/p'))
        installersShow.click();
        var installerShow = element(by.xpath('//*[@id="ng-app"]/body/div/div[1]/div/table/tbody/tr[4]/td[2]/div[3]/div/table/tbody/tr[1]/td[2]/a'))
        installerShow.click();
        var versionsShow = element(by.xpath('//*[@id="ng-app"]/body/div/div[1]/div/table/tbody/tr[4]/td[2]/div[3]/div/table/tbody/tr[2]/td[2]/div[1]/a/p'))
        versionsShow.click();
        var versionShow = element(by.xpath('//*[@id="ng-app"]/body/div/div[1]/div/table/tbody/tr[4]/td[2]/div[3]/div/table/tbody/tr[2]/td[2]/div[3]/div/table/tbody/tr[1]/td[2]/a'))
        versionShow.click()
        var projectsShow = element(by.xpath('//*[@id="ng-app"]/body/div/div[1]/div/table/tbody/tr[4]/td[2]/div[3]/div/table/tbody/tr[2]/td[2]/div[3]/div/table/tbody/tr[3]/td[2]/div[1]/a'))
        projectsShow.click();
        var projectShow = element(by.xpath('//*[@id="ng-app"]/body/div/div[1]/div/table/tbody/tr[4]/td[2]/div[3]/div/table/tbody/tr[2]/td[2]/div[3]/div/table/tbody/tr[3]/td[2]/div[3]/div/table/tbody/tr[1]/td[2]/a'))
        projectShow.click();
        var customsShow = element(by.xpath('//*[@id="ng-app"]/body/div/div[1]/div/table/tbody/tr[4]/td[2]/div[3]/div/table/tbody/tr[2]/td[2]/div[3]/div/table/tbody/tr[3]/td[2]/div[3]/div/table/tbody[1]/tr[4]/td[2]/a/p'))
        customsShow.click();
        var row = element.all(by.repeater('(indexCU, custom) in project.customs')).first();
        var cells = row.all(by.tagName('td'));
        expect(cells.get(0).getText()).toContain("dvs");
        var projectAdd = element(by.xpath('//*[@id="ng-app"]/body/div/div[1]/div/table/tbody/tr[4]/td[2]/div[3]/div/table/tbody/tr[2]/td[2]/div[3]/div/table/tbody/tr[3]/td[2]/div[2]/button'))
        var projectDelete = element(by.xpath('//*[@id="ng-app"]/body/div/div[1]/div/table/tbody/tr[4]/td[2]/div[3]/div/table/tbody/tr[2]/td[2]/div[3]/div/table/tbody/tr[3]/td[2]/div[3]/div/table/tbody[1]/tr[1]/td[3]/button'))
        expect(projectDelete.isDisplayed()).toBe(false)
        expect(projectAdd.isDisplayed()).toBe(false)
        var buttonAdd = element(by.xpath('//*[@id="ng-app"]/body/div/div[1]/div/table/tbody/tr[4]/td[2]/div[3]/div/table/tbody/tr[2]/td[2]/div[3]/div/table/tbody/tr[3]/td[2]/div[3]/div/table/tbody[1]/tr[4]/td[2]/button'))
        var buttonDelete = element(by.xpath('//*[@id="ng-app"]/body/div/div[1]/div/table/tbody/tr[4]/td[2]/div[3]/div/table/tbody/tr[2]/td[2]/div[3]/div/table/tbody/tr[3]/td[2]/div[3]/div/table/tbody[1]/tr[4]/td[2]/table/tbody/tr[1]/td[2]/button'))
        expect(buttonAdd.isDisplayed()).toBe(true)
        expect(buttonDelete.isDisplayed()).toBe(true)
    });

    it( 'Add Customs by user', function() {
        browser.get(baseURL+"#/scenarios/test-scenario");
        var EC = browser.ExpectedConditions;
        browser.wait(EC.urlContains(baseURL+ '#/scenarios/test-scenario'), 10000);
        var installersShow = element(by.xpath('//*[@id="ng-app"]/body/div/div[1]/div/table/tbody/tr[4]/td[2]/div[1]/a/p'))
        installersShow.click();
        var installerShow = element(by.xpath('//*[@id="ng-app"]/body/div/div[1]/div/table/tbody/tr[4]/td[2]/div[3]/div/table/tbody/tr[1]/td[2]/a'))
        installerShow.click();
        var versionsShow = element(by.xpath('//*[@id="ng-app"]/body/div/div[1]/div/table/tbody/tr[4]/td[2]/div[3]/div/table/tbody/tr[2]/td[2]/div[1]/a/p'))
        versionsShow.click();
        var versionShow = element(by.xpath('//*[@id="ng-app"]/body/div/div[1]/div/table/tbody/tr[4]/td[2]/div[3]/div/table/tbody/tr[2]/td[2]/div[3]/div/table/tbody/tr[1]/td[2]/a'))
        versionShow.click()
        var projectsShow = element(by.xpath('//*[@id="ng-app"]/body/div/div[1]/div/table/tbody/tr[4]/td[2]/div[3]/div/table/tbody/tr[2]/td[2]/div[3]/div/table/tbody/tr[3]/td[2]/div[1]/a'))
        projectsShow.click();
        var projectShow = element(by.xpath('//*[@id="ng-app"]/body/div/div[1]/div/table/tbody/tr[4]/td[2]/div[3]/div/table/tbody/tr[2]/td[2]/div[3]/div/table/tbody/tr[3]/td[2]/div[3]/div/table/tbody/tr[1]/td[2]/a'))
        projectShow.click();
        var customsShow = element(by.xpath('//*[@id="ng-app"]/body/div/div[1]/div/table/tbody/tr[4]/td[2]/div[3]/div/table/tbody/tr[2]/td[2]/div[3]/div/table/tbody/tr[3]/td[2]/div[3]/div/table/tbody[1]/tr[4]/td[2]/a/p'))
        customsShow.click();
        var row = element.all(by.repeater('(indexCU, custom) in project.customs')).first();
        var cells = row.all(by.tagName('td'));
        expect(cells.get(0).getText()).toContain("dvs");
        var buttonAdd = element(by.xpath('//*[@id="ng-app"]/body/div/div[1]/div/table/tbody/tr[4]/td[2]/div[3]/div/table/tbody/tr[2]/td[2]/div[3]/div/table/tbody/tr[3]/td[2]/div[3]/div/table/tbody[1]/tr[4]/td[2]/button'))
        buttonAdd.click()
        var custom = element(by.model('customModalCtrl.custom'));
        browser.wait(EC.visibilityOf(custom), 5000);
        custom.sendKeys('testC');
        var buttonOk = element(by.xpath('//*[@id="ng-app"]/body/div[3]/div/div/div/div[2]/button[1]'))
        buttonOk.click()
        expect(element(by.cssContainingText(".alert","Customs are successfully updated."))
        .isDisplayed()).toBe(true);
    });

    it( 'Delete Customs by user', function() {
        browser.get(baseURL+"#/scenarios/test-scenario");
        var EC = browser.ExpectedConditions;
        browser.wait(EC.urlContains(baseURL+ '#/scenarios/test-scenario'), 10000);
        var installersShow = element(by.xpath('//*[@id="ng-app"]/body/div/div[1]/div/table/tbody/tr[4]/td[2]/div[1]/a/p'))
        installersShow.click();
        var installerShow = element(by.xpath('//*[@id="ng-app"]/body/div/div[1]/div/table/tbody/tr[4]/td[2]/div[3]/div/table/tbody/tr[1]/td[2]/a'))
        installerShow.click();
        var versionsShow = element(by.xpath('//*[@id="ng-app"]/body/div/div[1]/div/table/tbody/tr[4]/td[2]/div[3]/div/table/tbody/tr[2]/td[2]/div[1]/a/p'))
        versionsShow.click();
        var versionShow = element(by.xpath('//*[@id="ng-app"]/body/div/div[1]/div/table/tbody/tr[4]/td[2]/div[3]/div/table/tbody/tr[2]/td[2]/div[3]/div/table/tbody/tr[1]/td[2]/a'))
        versionShow.click()
        var projectsShow = element(by.xpath('//*[@id="ng-app"]/body/div/div[1]/div/table/tbody/tr[4]/td[2]/div[3]/div/table/tbody/tr[2]/td[2]/div[3]/div/table/tbody/tr[3]/td[2]/div[1]/a'))
        projectsShow.click();
        var projectShow = element(by.xpath('//*[@id="ng-app"]/body/div/div[1]/div/table/tbody/tr[4]/td[2]/div[3]/div/table/tbody/tr[2]/td[2]/div[3]/div/table/tbody/tr[3]/td[2]/div[3]/div/table/tbody/tr[1]/td[2]/a'))
        projectShow.click();
        var customsShow = element(by.xpath('//*[@id="ng-app"]/body/div/div[1]/div/table/tbody/tr[4]/td[2]/div[3]/div/table/tbody/tr[2]/td[2]/div[3]/div/table/tbody/tr[3]/td[2]/div[3]/div/table/tbody[1]/tr[4]/td[2]/a/p'))
        customsShow.click();
        var row = element.all(by.repeater('(indexCU, custom) in project.customs')).first();
        var cells = row.all(by.tagName('td'));
        expect(cells.get(0).getText()).toContain("dvs");
        var buttonAdd = element(by.xpath('//*[@id="ng-app"]/body/div/div[1]/div/table/tbody/tr[4]/td[2]/div[3]/div/table/tbody/tr[2]/td[2]/div[3]/div/table/tbody/tr[3]/td[2]/div[3]/div/table/tbody[1]/tr[4]/td[2]/table/tbody/tr[1]/td[2]/button'))
        buttonAdd.click()
        var buttonOk = element(by.xpath('//*[@id="ng-app"]/body/div[3]/div/div/div[3]/button[1]'))
        buttonOk.click()
        expect(element(by.cssContainingText(".alert","Customs are successfully deleted."))
        .isDisplayed()).toBe(true);
    });

});