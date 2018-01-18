'use strict';

var mock = require('protractor-http-mock');
var baseURL = "http://localhost:8000/"

describe('testing the result page for anonymous user', function () {
    beforeEach(function(){
        mock([
            {
                request: {
                    path: '/api/v1/results',
                    method: 'GET',
                    queryString: {
                        page: '1'
                    }
                },
                response: {
                    data: {
                        "pagination": {
                            "current_page": 1,
                            "total_pages": 1
                        },
                        "results": [
                            {
                                "project_name": "testproject",
                                "description": "Demo results",
                                "stop_date": "2017-12-28 16:08:43",
                                "case_name": "testcase",
                                "build_tag": null,
                                "user": null,
                                "installer": "fuel",
                                "scenario": "test-scenario",
                                "trust_indicator": null,
                                "public": "true",
                                "version": "euphrates",
                                "details": "",
                                "criteria": "PASS",
                                "_id": "5a45170bbb2092000e2643f4",
                                "start_date": "2017-12-28 14:44:27",
                                "pod_name": "testPod"
                            }
                        ]
                    }
                }
            },
            {
                request: {
                    path: '/api/v1/results',
                    method: 'GET',
                    queryString: {
                        page: '1',
                        project: 'testproject'
                      }
                },
                response: {
                    data: {
                        "pagination": {
                            "current_page": 1,
                            "total_pages": 1
                        },
                        "results": [
                            {
                                "project_name": "testproject",
                                "description": "Demo results",
                                "stop_date": "2017-12-28 16:08:43",
                                "case_name": "testcase",
                                "build_tag": null,
                                "user": null,
                                "installer": "fuel",
                                "scenario": "test-scenario",
                                "trust_indicator": null,
                                "public": "true",
                                "version": "euphrates",
                                "details": "",
                                "criteria": "PASS",
                                "_id": "5a45170bbb2092000e2643f5",
                                "start_date": "2017-12-28 14:44:27",
                                "pod_name": "testPod"
                            }
                        ]
                    }
                }
            },
            {
                request: {
                    path: '/api/v1/results',
                    method: 'GET',
                    queryString: {
                        page: '1',
                        project: 'testproject',
                        case: 'testcase'
                      }
                },
                response: {
                    data: {
                        "pagination": {
                            "current_page": 1,
                            "total_pages": 1
                        },
                        "results": [
                            {
                                "project_name": "testproject",
                                "description": "Demo results",
                                "stop_date": "2017-12-28 16:08:43",
                                "case_name": "testcase",
                                "build_tag": null,
                                "user": null,
                                "installer": "fuel",
                                "scenario": "test-scenario",
                                "trust_indicator": null,
                                "public": "true",
                                "version": "euphrates",
                                "details": "",
                                "criteria": "PASS",
                                "_id": "5a45170bbb2092000e2643f6",
                                "start_date": "2017-12-28 14:44:27",
                                "pod_name": "testPod"
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

    it( 'should show the results page for anonymous user', function() {
        browser.get(baseURL+"#/results");
        expect(element(by.cssContainingText(".ng-binding.ng-scope","Test Results")).isDisplayed()).toBe(true);
    });

    it( 'navigate anonymous user to results page', function() {
        browser.get(baseURL);
        var resultLink = element(by.linkText('Results')).click();
        var EC = browser.ExpectedConditions;
        browser.wait(EC.urlContains(baseURL+ '#/results'), 10000);
    });

    it('Should show the results in results page for anonymous user ', function () {
        browser.get(baseURL+"#/results");
        var row = element.all(by.repeater('(index, result) in ctrl.data.results')).first();
        var cells = row.all(by.tagName('td'));
        expect(cells.get(0).getText()).toContain("5a45170bbb2092000e2643f4");
    });

    it('Should show the results in results page related to the filters for anonymous user ', function () {
        browser.get(baseURL+"#/results");
        var filter = element(by.model('ctrl.filter'));
        var filterText = element(by.model('ctrl.filterText'));
        filter.sendKeys('project');
        filterText.sendKeys('testproject');
        var buttonFilter = element(by.buttonText('Filter'));
        buttonFilter.click();
        var row = element.all(by.repeater('(index, result) in ctrl.data.results')).first();
        var cells = row.all(by.tagName('td'));
        expect(cells.get(0).getText()).toContain("5a45170bbb2092000e2643f5");
        filter.sendKeys('case');
        filterText.sendKeys('testcase')
        buttonFilter.click();
        expect(cells.get(0).getText()).toContain("5a45170bbb2092000e2643f6");
    });
    it('Should not show the results in results page related to the filters for anonymous user ', function () {
        browser.get(baseURL+"#/results");
        var filter = element(by.model('ctrl.filter'));
        var filterText = element(by.model('ctrl.filterText'));
        filter.sendKeys('project');
        filterText.sendKeys('testproject1');
        var buttonFilter = element(by.buttonText('Filter'));
        buttonFilter.click();
        expect(element(by.css('.alert.alert-danger.ng-binding.ng-scope'))
            .isDisplayed()).toBe(true);
    });

});

describe('testing the result page for user', function () {
    beforeEach(function(){
        mock([
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
                    path: '/api/v1/results',
                    method: 'GET',
                    queryString: {
                        page: '1'
                    }
                },
                response: {
                    data: {
                        "pagination": {
                            "current_page": 1,
                            "total_pages": 1
                        },
                        "results": [
                            {
                                "project_name": "testproject",
                                "description": "Demo results",
                                "stop_date": "2017-12-28 16:08:43",
                                "case_name": "testcase",
                                "build_tag": null,
                                "user": null,
                                "installer": "fuel",
                                "scenario": "test-scenario",
                                "trust_indicator": null,
                                "public": "true",
                                "version": "euphrates",
                                "details": "",
                                "criteria": "PASS",
                                "_id": "5a45170bbb2092000e2643f4",
                                "start_date": "2017-12-28 14:44:27",
                                "pod_name": "testPod"
                            }
                        ]
                    }
                }
            },
            {
                request: {
                    path: '/api/v1/results',
                    method: 'GET',
                    queryString: {
                        page: '1',
                        project: 'testproject'
                      }
                },
                response: {
                    data: {
                        "pagination": {
                            "current_page": 1,
                            "total_pages": 1
                        },
                        "results": [
                            {
                                "project_name": "testproject",
                                "description": "Demo results",
                                "stop_date": "2017-12-28 16:08:43",
                                "case_name": "testcase",
                                "build_tag": null,
                                "user": null,
                                "installer": "fuel",
                                "scenario": "test-scenario",
                                "trust_indicator": null,
                                "public": "true",
                                "version": "euphrates",
                                "details": "",
                                "criteria": "PASS",
                                "_id": "5a45170bbb2092000e2643f5",
                                "start_date": "2017-12-28 14:44:27",
                                "pod_name": "testPod"
                            }
                        ]
                    }
                }
            },
            {
                request: {
                    path: '/api/v1/results',
                    method: 'GET',
                    queryString: {
                        page: '1',
                        project: 'testproject',
                        case: 'testcase'
                      }
                },
                response: {
                    data: {
                        "pagination": {
                            "current_page": 1,
                            "total_pages": 1
                        },
                        "results": [
                            {
                                "project_name": "testproject",
                                "description": "Demo results",
                                "stop_date": "2017-12-28 16:08:43",
                                "case_name": "testcase",
                                "build_tag": null,
                                "user": null,
                                "installer": "fuel",
                                "scenario": "test-scenario",
                                "trust_indicator": null,
                                "public": "true",
                                "version": "euphrates",
                                "details": "",
                                "criteria": "PASS",
                                "_id": "5a45170bbb2092000e2643f6",
                                "start_date": "2017-12-28 14:44:27",
                                "pod_name": "testPod"
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

    it( 'should show the results page for user', function() {
        browser.get(baseURL+"#/results");
        expect(element(by.cssContainingText(".ng-binding.ng-scope","Test Results")).isDisplayed()).toBe(true);
    });

    it( 'navigate user to testCase page', function() {
        browser.get(baseURL);
        var resultLink = element(by.linkText('Results')).click();
        var EC = browser.ExpectedConditions;
        browser.wait(EC.urlContains(baseURL+ '#/results'), 10000);
    });

    it('Should show the results in results page for user ', function () {
        browser.get(baseURL+"#/results");
        var row = element.all(by.repeater('(index, result) in ctrl.data.results')).first();
        var cells = row.all(by.tagName('td'));
        expect(cells.get(0).getText()).toContain("5a45170bbb2092000e2643f4");
    });

    it('Should show the results in results page related to the filters for user ', function () {
        browser.get(baseURL+"#/results");
        var filter = element(by.model('ctrl.filter'));
        var filterText = element(by.model('ctrl.filterText'));
        filter.sendKeys('project');
        filterText.sendKeys('testproject');
        var buttonFilter = element(by.buttonText('Filter'));
        buttonFilter.click();
        var row = element.all(by.repeater('(index, result) in ctrl.data.results')).first();
        var cells = row.all(by.tagName('td'));
        expect(cells.get(0).getText()).toContain("5a45170bbb2092000e2643f5");
        filter.sendKeys('case');
        filterText.sendKeys('testcase')
        buttonFilter.click();
        expect(cells.get(0).getText()).toContain("5a45170bbb2092000e2643f6");
    });

    it('Clear the filter', function () {
        browser.get(baseURL+"#/results");
        var filter = element(by.model('ctrl.filter'));
        var filterText = element(by.model('ctrl.filterText'));
        filter.sendKeys('project');
        filterText.sendKeys('testproject');
        var buttonFilter = element(by.buttonText('Filter'));
        buttonFilter.click();
        var row = element.all(by.repeater('(index, result) in ctrl.data.results')).first();
        var cells = row.all(by.tagName('td'));
        expect(cells.get(0).getText()).toContain("5a45170bbb2092000e2643f5");
        var buttonClear = element(by.buttonText('Clear'));
        buttonClear.click();
        var row = element.all(by.repeater('(index, result) in ctrl.data.results')).first();
        var cells = row.all(by.tagName('td'));
        expect(cells.get(0).getText()).toContain("5a45170bbb2092000e2643f4");
    });
    it('Should not show the results in results page related to the filters for user ', function () {
        browser.get(baseURL+"#/results");
        var filter = element(by.model('ctrl.filter'));
        var filterText = element(by.model('ctrl.filterText'));
        filter.sendKeys('project');
        filterText.sendKeys('testproject1');
        var buttonFilter = element(by.buttonText('Filter'));
        buttonFilter.click();
        expect(element(by.css('.alert.alert-danger.ng-binding.ng-scope'))
            .isDisplayed()).toBe(true);
    });

});