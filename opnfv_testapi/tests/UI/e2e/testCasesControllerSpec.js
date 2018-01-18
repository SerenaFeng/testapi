'use strict';

var mock = require('protractor-http-mock');
var baseURL = "http://localhost:8000/"

describe('testing the testCases page for anonymous user', function () {
    beforeEach(function(){
        mock([
            {
                request: {
                    path: '/api/v1/projects',
                    method: 'GET'
                },
                response: {
                    data: {
                        "projects": [
                            {
                                "owner": "thuva4",
                                "_id": "5a0c022f9a07c846d3c2cc94",
                                "creation_date": "2017-11-15 14:30:31.200259",
                                "description": "dsfsd",
                                "name": "testproject"
                            }
                        ]
                    }
                }
            },
            {
                request: {
                    path: '/api/v1/projects/testproject',
                    method: 'GET'
                },
                response: {
                    data: {
                        "owner": "thuva4",
                        "_id": "5a0c022f9a07c846d3c2cc94",
                        "creation_date": "2017-11-15 14:30:31.200259",
                        "description": "dsfsd",
                        "name": "testproject"
                    }
                }
            },
            {
                request: {
                    path: '/api/v1/projects/testproject/cases',
                    method: 'GET'
                },
                response: {
                    data: {
                        "testcases": [
                            {
                                "project_name": "testproject",
                                "run": null,
                                "description": null,
                                "tags": null,
                                "creation_date": "2017-12-20 18:47:04.025544",
                                "dependencies": null,
                                "tier": null,
                                "trust": null,
                                "blocking": null,
                                "name": "testCase",
                                "ci_loop": null,
                                "url": null,
                                "version": null,
                                "criteria": null,
                                "domains": null,
                                "_id": "5a3a62d09a07c836e06858fb",
                                "catalog_description": null
                            }
                        ]
                    }
                }
            },
            {
                request: {
                    path: '/api/v1/projects/testproject/cases/testCase',
                    method: 'GET'
                },
                response: {
                    data: {
                            "project_name": "testproject",
                            "run": null,
                            "description": null,
                            "tags": null,
                            "creation_date": "2017-12-20 18:47:04.025544",
                            "dependencies": null,
                            "tier": null,
                            "trust": null,
                            "blocking": null,
                            "name": "testCase",
                            "ci_loop": null,
                            "url": null,
                            "version": null,
                            "criteria": null,
                            "domains": null,
                            "_id": "5a3a62d09a07c836e06858fb",
                            "catalog_description": null
                    }
                }
            }
        ]);
    });

    afterEach(function(){
        mock.teardown();
    });

    it( 'should show the testCases for anonymous user', function() {
        browser.get(baseURL+"#/projects/testproject");
        var testCases = element(by.linkText('Test Cases'));
        testCases.click();
        var row = element.all(by.repeater('(index, testcase) in testCasesCtrl.data.testcases')).first();
        var cells = row.all(by.tagName('td'));
        expect(cells.get(1).getText()).toContain("testCase");
    });

    it( 'navigate anonymous user to testCase page', function() {
        browser.get(baseURL+"#/projects/testproject");
        var testCases = element(by.linkText('Test Cases'));
        testCases.click();
        var testCase = element(by.linkText('testCase'));
        testCase.click();
        var EC = browser.ExpectedConditions;
        browser.wait(EC.urlContains(baseURL+ '#/projects/testproject/testCase'), 10000);
    });

    it('create button is not visible for anonymous user ', function () {
        browser.get(baseURL+"#/projects/testproject");
        var testCases = element(by.linkText('Test Cases'));
        testCases.click();
        var buttonCreate = element(by.buttonText('Create'));
        expect(buttonCreate.isDisplayed()).toBeFalsy();
    });

    it('Delete button is not visible for anonymous user ', function () {
        browser.get(baseURL+"#/projects/testproject");
        var testCases = element(by.linkText('Test Cases'));
        testCases.click();
        var buttonDelete = element(by.buttonText('Delete'));
        expect(buttonDelete.isDisplayed()).toBeFalsy();
    });

    it('delete Operation is not visible for anonymous user ', function () {
        browser.get(baseURL+"#/projects/testproject");
        var testCases = element(by.linkText('Test Cases'));
        testCases.click();
        var deleteOperation = element(by.css('a[title=Delete]'));
        expect(deleteOperation.isDisplayed()).toBeFalsy();
    });

    it('Edit Operation is not visible for anonymous user ', function () {
        browser.get(baseURL+"#/projects/testproject");
        var testCases = element(by.linkText('Test Cases'));
        testCases.click();
        var editOperation = element(by.css('a[title=Edit]'));
        expect(editOperation.isDisplayed()).toBeFalsy();
    });
});

describe('testing the testcaese page for user who is not in submitter group', function () {
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
                        path: '/api/v1/projects',
                        method: 'GET'
                    },
                    response: {
                        data: {
                            "projects": [
                                {
                                    "owner": "thuva4",
                                    "_id": "5a0c022f9a07c846d3c2cc94",
                                    "creation_date": "2017-11-15 14:30:31.200259",
                                    "description": "dsfsd",
                                    "name": "testproject"
                                }
                            ]
                        }
                    }
                },
                {
                    request: {
                        path: '/api/v1/projects/testproject',
                        method: 'GET'
                    },
                    response: {
                        data: {
                            "owner": "thuva4",
                            "_id": "5a0c022f9a07c846d3c2cc94",
                            "creation_date": "2017-11-15 14:30:31.200259",
                            "description": "dsfsd",
                            "name": "testproject"
                        }
                    }
                },
                {
                    request: {
                        path: '/api/v1/projects/testproject/cases',
                        method: 'GET'
                    },
                    response: {
                        data: {
                            "testcases": [
                                {
                                    "project_name": "testproject",
                                    "run": null,
                                    "description": null,
                                    "tags": null,
                                    "creation_date": "2017-12-20 18:47:04.025544",
                                    "dependencies": null,
                                    "tier": null,
                                    "trust": null,
                                    "blocking": null,
                                    "name": "testCase",
                                    "ci_loop": null,
                                    "url": null,
                                    "version": null,
                                    "criteria": null,
                                    "domains": null,
                                    "_id": "5a3a62d09a07c836e06858fb",
                                    "catalog_description": null
                                }
                            ]
                        }
                    }
                },
                {
                    request: {
                        path: '/api/v1/projects/testproject/cases/testCase',
                        method: 'GET'
                    },
                    response: {
                        data: {
                                "project_name": "testproject",
                                "run": null,
                                "description": null,
                                "tags": null,
                                "creation_date": "2017-12-20 18:47:04.025544",
                                "dependencies": null,
                                "tier": null,
                                "trust": null,
                                "blocking": null,
                                "name": "testCase",
                                "ci_loop": null,
                                "url": null,
                                "version": null,
                                "criteria": null,
                                "domains": null,
                                "_id": "5a3a62d09a07c836e06858fb",
                                "catalog_description": null
                        }
                    }
                }
            ]);
        });

        afterEach(function(){
            mock.teardown();
        });

        it( 'should show the testCases for  user', function() {
            browser.get(baseURL+"#/projects/testproject");
            var testCases = element(by.linkText('Test Cases'));
            testCases.click();
            var row = element.all(by.repeater('(index, testcase) in testCasesCtrl.data.testcases')).first();
            var cells = row.all(by.tagName('td'));
            expect(cells.get(1).getText()).toContain("testCase");
        });

        it( 'navigate  user to testCase page', function() {
            browser.get(baseURL+"#/projects/testproject");
            var testCases = element(by.linkText('Test Cases'));
            testCases.click();
            var testCase = element(by.linkText('testCase'));
            testCase.click();
            var EC = browser.ExpectedConditions;
            browser.wait(EC.urlContains(baseURL+ '#/projects/testproject/testCase'), 10000);
        });

        it('create button is not visible for  user ', function () {
            browser.get(baseURL+"#/projects/testproject");
            var testCases = element(by.linkText('Test Cases'));
            testCases.click();
            var buttonCreate = element(by.buttonText('Create'));
            expect(buttonCreate.isDisplayed()).toBeFalsy();
        });

        it('Delete button is not visible for  user ', function () {
            browser.get(baseURL+"#/projects/testproject");
            var testCases = element(by.linkText('Test Cases'));
            testCases.click();
            var buttonDelete = element(by.buttonText('Delete'));
            expect(buttonDelete.isDisplayed()).toBeFalsy();
        });

        it('delete Operation is not visible for  user ', function () {
            browser.get(baseURL+"#/projects/testproject");
            var testCases = element(by.linkText('Test Cases'));
            testCases.click();
            var deleteOperation = element(by.css('a[title=Delete]'));
            expect(deleteOperation.isDisplayed()).toBeFalsy();
        });

        it('Edit Operation is not visible for  user ', function () {
            browser.get(baseURL+"#/projects/testproject");
            var testCases = element(by.linkText('Test Cases'));
            testCases.click();
            var editOperation = element(by.css('a[title=Edit]'));
            expect(editOperation.isDisplayed()).toBeFalsy();
        });
})

describe('testing the test cases page for user who is in submitter group', function () {
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
                        "user": "testUser", "groups": ["opnfv-testapi-users",
                        "opnfv-gerrit-testProject-submitters"],
                        "email": "testuser@test.com"
                    }
                }
            },
            {
                request: {
                    path: '/api/v1/projects/testproject/cases',
                    method: 'POST'
                },
                response: {
                    data: {
                        href: baseURL+"/api/v1/projects/testProject/cases/testCase"
                    }
                }
            },
            {
                request: {
                    path: '/api/v1/projects/testproject/cases/testCase',
                    method: 'PUT'
                },
                response: {
                    data: {
                        href: baseURL+"/api/v1/projects/testProject/cases/testCase"
                    }
                }
            },
            {
                request: {
                    path: '/api/v1/projects/testproject/cases/testCase',
                    method: 'DELETE'
                },
                response: {
                    data: {
                        href: baseURL+"/api/v1/projects/testProject/cases/testCase"
                    }
                }
            },
            {
                request: {
                    path: '/api/v1/projects/testProject3/cases',
                    method: 'POST',
                    data: {
                        name: 'testCase2',
                        description : 'demoDescription',
                    }
                },
                response: {
                    status : 403,
                    data : 'You do not have permission to perform this action'
                }
            },
            {
                request: {
                    path: '/api/v1/projects',
                    method: 'GET'
                },
                response: {
                    data: {
                        "projects": [
                            {
                                "owner": "thuva4",
                                "_id": "5a0c022f9a07c846d3c2cc94",
                                "creation_date": "2017-11-15 14:30:31.200259",
                                "description": "dsfsd",
                                "name": "testproject"
                            }
                        ]
                    }
                }
            },
            {
                request: {
                    path: '/api/v1/projects/testproject',
                    method: 'GET'
                },
                response: {
                    data: {
                        "owner": "thuva4",
                        "_id": "5a0c022f9a07c846d3c2cc94",
                        "creation_date": "2017-11-15 14:30:31.200259",
                        "description": "dsfsd",
                        "name": "testproject"
                    }
                }
            },
            {
                request: {
                    path: '/api/v1/projects/testproject/cases',
                    method: 'GET'
                },
                response: {
                    data: {
                        "testcases": [
                            {
                                "project_name": "testproject",
                                "run": null,
                                "description": null,
                                "tags": null,
                                "creation_date": "2017-12-20 18:47:04.025544",
                                "dependencies": null,
                                "tier": null,
                                "trust": null,
                                "blocking": null,
                                "name": "testCase",
                                "ci_loop": null,
                                "url": null,
                                "version": null,
                                "criteria": null,
                                "domains": null,
                                "_id": "5a3a62d09a07c836e06858fb",
                                "catalog_description": null
                            }
                        ]
                    }
                }
            },
            {
                request: {
                    path: '/api/v1/projects/testproject/cases/testCase',
                    method: 'GET'
                },
                response: {
                    data: {
                            "project_name": "testproject",
                            "run": null,
                            "description": null,
                            "tags": null,
                            "creation_date": "2017-12-20 18:47:04.025544",
                            "dependencies": null,
                            "tier": null,
                            "trust": null,
                            "blocking": null,
                            "name": "testCase",
                            "ci_loop": null,
                            "url": null,
                            "version": null,
                            "criteria": null,
                            "domains": null,
                            "_id": "5a3a62d09a07c836e06858fb",
                            "catalog_description": null
                    }
                }
            }
        ]);
    });

    afterEach(function(){
        mock.teardown();
    });

    it( 'should show the testCases for  user', function() {
        browser.get(baseURL+"#/projects/testproject");
        var testCases = element(by.linkText('Test Cases'));
        testCases.click();
        var row = element.all(by.repeater('(index, testcase) in testCasesCtrl.data.testcases')).first();
        var cells = row.all(by.tagName('td'));
        expect(cells.get(1).getText()).toContain("testCase");
    });

    it( 'navigate user to testCase page', function() {
        browser.get(baseURL+"#/projects/testproject");
        var testCases = element(by.linkText('Test Cases'));
        testCases.click();
        var testCase = element(by.linkText('testCase'));
        testCase.click();
        var EC = browser.ExpectedConditions;
        browser.wait(EC.urlContains(baseURL+ '#/projects/testproject/testCase'), 10000);
    });

    it('create button is visible for  user ', function () {
        browser.get(baseURL+"#/projects/testproject");
        var testCases = element(by.linkText('Test Cases'));
        testCases.click();
        var buttonCreate = element(by.buttonText('Create'));
        expect(buttonCreate.isDisplayed()).toBe(true);
    });

    it('Delete button is visible for  user ', function () {
        browser.get(baseURL+"#/projects/testproject");
        var testCases = element(by.linkText('Test Cases'));
        testCases.click();
        var buttonDelete = element(by.buttonText('Delete'));
        expect(buttonDelete.isDisplayed()).toBe(true);
    });

    it('delete Operation is visible for  user ', function () {
        browser.get(baseURL+"#/projects/testproject");
        var testCases = element(by.linkText('Test Cases'));
        testCases.click();
        var deleteOperation = element(by.css('a[title=Delete]'));
        expect(deleteOperation.isDisplayed()).toBe(true);
    });

    it('Edit Operation is visible for  user ', function () {
        browser.get(baseURL+"#/projects/testproject");
        var testCases = element(by.linkText('Test Cases'));
        testCases.click();
        var editOperation = element(by.css('a[title=Edit]'));
        expect(editOperation.isDisplayed()).toBe(true);
    });

    it('Create the test case', function () {
        browser.get(baseURL+"#/projects/testproject");
        var testCases = element(by.linkText('Test Cases'));
        testCases.click();
        var buttonCreate = element(by.buttonText('Create'));
        buttonCreate.click();
        var name = element(by.model('TestCaseModalCtrl.testcase.name'));
        var EC = browser.ExpectedConditions;
        browser.wait(EC.visibilityOf(name), 5000);
        name.sendKeys('test');
        var buttonOK = element(by.buttonText('Ok'));
        buttonOK.click();
        expect(element(by.cssContainingText(".alert","Testcase is successfully created."))
        .isDisplayed()).toBe(true);
    });

    it('Showing error when creating with a empty name ', function () {
        browser.get(baseURL+"#/projects/testproject");
        var testCases = element(by.linkText('Test Cases'));
        testCases.click();
        var buttonCreate = element(by.buttonText('Create'));
        buttonCreate.click();
        var name = element(by.model('TestCaseModalCtrl.testcase.name'));
        var EC = browser.ExpectedConditions;
        browser.wait(EC.visibilityOf(name), 5000);
        var buttonOK = element(by.buttonText('Ok'));
        buttonOK.click();
        expect(element(by.cssContainingText(".alert","Name is missing."))
        .isDisplayed()).toBe(true);
    });

    it('cancel the delete confimation modal of the test case ', function () {
        browser.get(baseURL+"#/projects/testproject");
        var testCases = element(by.linkText('Test Cases'));
        testCases.click();
        var deleteOperation = element(by.css('a[title=Delete]'));
        deleteOperation.click();
        var buttonCancel = element(by.buttonText('Cancel'));
        buttonCancel.click();
        expect(buttonCancel.isPresent()).toBe(false);
    });

    it('Delete the test case ', function () {
        browser.get(baseURL+"#/projects/testproject");
        var testCases = element(by.linkText('Test Cases'));
        testCases.click();
        var deleteOperation = element(by.css('a[title=Delete]'));
        deleteOperation.click();
        var buttonOK = element(by.buttonText('Ok'));
        buttonOK.click();
        expect(element(by.cssContainingText(".alert","Test case is successfully deleted"))
        .isDisplayed()).toBe(true);
    });

    it('cancel the Edit modal of the test case ', function () {
        browser.get(baseURL+"#/projects/testproject");
        var testCases = element(by.linkText('Test Cases'));
        testCases.click();
        var editOperation = element(by.css('a[title=Edit]'));
        editOperation.click();
        var name = element(by.model('TestCaseModalCtrl.testcase.name'));
        var EC = browser.ExpectedConditions;
        browser.wait(EC.visibilityOf(name), 5000);
        name.sendKeys('test1');
        var buttonCancel = element(by.buttonText('Cancel'));
        buttonCancel.click();
        expect(name.isPresent()).toBe(false);
    });

    it('Edit the test case ', function () {
        browser.get(baseURL+"#/projects/testproject");
        var testCases = element(by.linkText('Test Cases'));
        testCases.click();
        var editOperation = element(by.css('a[title=Edit]'));
        editOperation.click();
        var name = element(by.model('TestCaseModalCtrl.testcase.name'));
        var EC = browser.ExpectedConditions;
        browser.wait(EC.visibilityOf(name), 5000);
        name.sendKeys('test1');
        var buttonOK = element(by.buttonText('Ok'));
        buttonOK.click();
        expect(element(by.cssContainingText(".alert","Test case is successfully updated"))
        .isDisplayed()).toBe(true);
    });

    it('view the test case ', function () {
        browser.get(baseURL+"#/projects/testproject");
        var testCases = element(by.linkText('Test Cases'));
        testCases.click();
        var viewOperation = element(by.linkText('testCase'));
        viewOperation.click();
        var name = element(by.model('TestCaseModalCtrl.testcase.name'));
        var EC = browser.ExpectedConditions;
        browser.wait(EC.urlContains(baseURL+ '#/projects/testproject/testCase'), 10000);
    });

    it('Batch Delete the test Cases ', function () {
        browser.get(baseURL+"#/projects/testproject");
        var testCases = element(by.linkText('Test Cases'));
        testCases.click();
        var checkBox = element(by.model('testCasesCtrl.checkBox[index]'));
        checkBox.click();
        var buttonDelete = element(by.buttonText('Delete'));;
        buttonDelete.click();
        var buttonOK = element(by.buttonText('Ok'));
        buttonOK.click();
        expect(element(by.cssContainingText(".alert","Test case is successfully deleted"))
        .isDisplayed()).toBe(true);
    });
})
