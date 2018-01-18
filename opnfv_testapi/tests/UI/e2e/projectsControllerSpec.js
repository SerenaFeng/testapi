'use strict';

var mock = require('protractor-http-mock');
var baseURL = "http://localhost:8000"

describe('testing the Projects Link for anonymous user', function () {
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
            }
        ]);
    });

	afterEach(function(){
		mock.teardown();
	});

	it( 'should show the Projects Link for anonymous user', function() {
        mock.teardown();
		browser.get(baseURL);
        var projectslink = element(by.linkText('Projects'));
        expect(projectslink.isPresent()).toBe(true);
    });

    it( 'navigate anonymous user to project page', function() {
        browser.get(baseURL+'#/projects');
        var EC = browser.ExpectedConditions;
        browser.wait(EC.urlContains(baseURL+ '/#/projects'), 10000);
    });

    it('create button is not visible for anonymous user ', function () {
        browser.get(baseURL+'#/projects');
        var buttonCreate = element(by.buttonText('Create'));
        expect(buttonCreate.isDisplayed()).toBeFalsy();
    });

    it('Delete button is not visible for anonymous user ', function () {
        browser.get(baseURL+'#/projects');
        var buttonCreate = element(by.buttonText('Create'));
        expect(buttonCreate.isDisplayed()).toBeFalsy();
    });

    it('Show projects list when anonymous user comes to the projects page', function () {
        var row = element.all(by.repeater('(index, project) in ctrl.data.projects')).first();
        var cells = row.all(by.tagName('td'));
        expect(cells.get(1).getText()).toContain("testproject");
    });

    // it('redirect to project page when user clicks a project',function(){
    //     var projectlink = element(by.linkText('testproject')).click();
    //     var EC = browser.ExpectedConditions;
    //     browser.wait(EC.urlContains(baseURL+ '/#/projects/testproject'), 10000);
    // });

    it('delete Operation is not  visible for anonymous user ', function () {
		browser.get(baseURL+'#/projects');
		var deleteOperation = element(by.css('a[title=Delete]'));
		expect(deleteOperation.isDisplayed()).toBeFalsy();
	});

});

describe('testing the Project Link for user who is not in submitter group', function () {
        beforeEach(function(){
            mock([
                {
                    request: {
                        path: '/api/v1/projects',
                        method: 'GET',
                        queryString: {
                            name: 'test'
                        }
                    },
                    response: {
                        data: {
                            "projects": [
                                {
                                    "_id": "5a0c1c9a9a07c846d3a7247b",
                                    "creation_date": "2017-11-15 16:23:14.217093",
                                    "description": "sdgfd",
                                    "name": "test"
                                }]
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
                }
            ]);
        });

        afterEach(function(){
		    mock.teardown();
    	});

        it( 'should show the Project Link for user', function() {
            browser.get(baseURL);
            var projectslink = element(by.linkText('Projects'));
            expect(projectslink.isPresent()).toBe(true);
        });

        it( 'should navigate the user to the Project page', function() {
            browser.get(baseURL);
            var projectslink = element(by.linkText('Projects')).click();
            var EC = browser.ExpectedConditions;
            browser.wait(EC.urlContains(baseURL+ '/#/projects'), 10000);
        });

        it('create button is not visible for user', function () {
            browser.get(baseURL+'#/projects');
            var buttonCreate = element(by.buttonText('Create'));
            expect(buttonCreate.isDisplayed()).toBeFalsy();
        });

        it('Delete button is not visible for  user ', function () {
            browser.get(baseURL+'#/projects');
            var buttonCreate = element(by.buttonText('Create'));
            expect(buttonCreate.isDisplayed()).toBeFalsy();
        });

        it('delete Operation is not visible for user ', function () {
            browser.get(baseURL+'#/projects');
            var deleteOperation = element(by.css('a[title=Delete]'));
            expect(deleteOperation.isDisplayed()).toBeFalsy();
        });

        it('Show relevant results to the filter', function () {
            var filter = element(by.model('ctrl.filterText'));
            filter.sendKeys('test');
            var buttonFilter = element(by.buttonText('Filter'));
            buttonFilter.click()
            var row = element.all(by.repeater('(index, project) in ctrl.data.projects')).first();
            var cells = row.all(by.tagName('td'));
            expect(cells.get(1).getText()).toContain("test");
        });
})

describe('testing the Project Link for user who is in submitter group', function () {
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
                        "opnfv-gerrit-testProject1-submitters",
                        "opnfv-gerrit-testProject2-submitters" ],
                        "email": "testuser@test.com"
                    }
                }
            },
            {
                request: {
                    path: '/api/v1/projects',
                    method: 'POST'
                },
                response: {
                    data: {
                        href: baseURL+"/api/v1/projects/testProject1"
                    }
                }
            },
            {
                request: {
                    path: '/api/v1/projects/vsfv',
                    method: 'DELETE'
                },
                response: {
                    data: {
                        href: baseURL+"/api/v1/projects/testProject1"
                    }
                }
            },
            {
                request: {
                    path: '/api/v1/projects/vsfv',
                    method: 'PUT'
                },
                response: {
                    data: {
                        href: baseURL+"/api/v1/projects/testProject1"
                    }
                }
            },
            {
                request: {
                    path: '/api/v1/projects',
                    method: 'POST',
                    data: {
                        name: 'testProject2',
                        description : 'demoDescription',
                    }
                },
                response: {
                    status : 403
                }
            },
            {
                request: {
                    path: '/api/v1/projects',
                    method: 'POST',
                    data: {
                        name: 'testProject3',
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
                    data :  {
                        "projects": [
                            {
                                "_id": "5a0c1c9a9a07c846d3a7247b",
                                "creation_date": "2017-11-15 16:23:14.217093",
                                "description": "sdgfd",
                                "name": "vsfv"
                            }]
                        }
                    }
            }
        ]);
    });

    afterEach(function(){
		mock.teardown();
	});

    it( 'should show the Project Link for user', function() {
        browser.get(baseURL);
        var projectslink = element(by.linkText('Projects'));
        expect(projectslink.isPresent()).toBe(true);
    });

    it( 'should navigate the user to the Project page', function() {
        browser.get(baseURL);
        var projectslink = element(by.linkText('Projects')).click();
        var EC = browser.ExpectedConditions;
        browser.wait(EC.urlContains(baseURL+ '/#/projects'), 10000);
    });

    it('create button is visible for user', function () {
        browser.get(baseURL+'#/projects');
        var buttonCreate = element(by.buttonText('Create'));
        expect(buttonCreate.isDisplayed()).toBe(true);
    });

    it('Delete button is not visible for anonymous user ', function () {
        browser.get(baseURL+'#/projects');
        var buttonCreate = element(by.buttonText('Create'));
        expect(buttonCreate.isDisplayed()).toBe(true);
    });

    it('delete Operation is not visible for  user ', function () {
        browser.get(baseURL+'#/projects');
        var deleteOperation = element(by.css('a[title=Delete]'));
        expect(deleteOperation.isDisplayed()).toBe(true);
    });

    it('Edit Operation is visible for  user ', function () {
        browser.get(baseURL+'#/projects');
        var editOperation = element(by.css('a[title=Edit]'));
        expect(editOperation.isDisplayed()).toBe(true);
    });

    it('Create the Project', function () {
        browser.get(baseURL+"#/projects");
        var buttonCreate = element(by.buttonText('Create'));
        buttonCreate.click();
        var name = element(by.model('ProjectModalCtrl.project.name'));
        var EC = browser.ExpectedConditions;
        browser.wait(EC.visibilityOf(name), 5000);
        name.sendKeys('testproject');
        var buttonOK = element(by.buttonText('Ok'));
        buttonOK.click();
        expect(element(by.cssContainingText(".alert","Project is successfully created."))
        .isDisplayed()).toBe(true);
    });

    it('Show error if user doesnt have permission to Create the Project', function () {
        browser.get(baseURL+"#/projects");
        var buttonCreate = element(by.buttonText('Create'));
        buttonCreate.click();
        var name = element(by.model('ProjectModalCtrl.project.name'));
        var EC = browser.ExpectedConditions;
        browser.wait(EC.visibilityOf(name), 5000);
        var description = element(by.model('ProjectModalCtrl.project.description'));
        name.sendKeys('testProject2');
        description.sendKeys('demoDescription');
        var buttonOK = element(by.buttonText('Ok'));
        buttonOK.click();
        expect(element(by.css(".alert.alert-danger")).isDisplayed()).toBe(true);
    });

    it('Showing error when creating with a empty name ', function () {
        browser.get(baseURL+"#/projects");
        var buttonCreate = element(by.buttonText('Create'));
        buttonCreate.click();
        var name = element(by.model('ProjectModalCtrl.project.name'));
        var EC = browser.ExpectedConditions;
        browser.wait(EC.visibilityOf(name), 5000);
        var buttonOK = element(by.buttonText('Ok'));
        buttonOK.click();
        expect(element(by.cssContainingText(".alert","Name is missing."))
        .isDisplayed()).toBe(true);
    });

    it('Show error when user click the create button with an already existing name', function () {
		browser.get(baseURL+"#/projects");
        var buttonCreate = element(by.buttonText('Create'));
        buttonCreate.click();
        var name = element(by.model('ProjectModalCtrl.project.name'));
        var EC = browser.ExpectedConditions;
        browser.wait(EC.visibilityOf(name), 5000);
        var description = element(by.model('ProjectModalCtrl.project.description'));
        name.sendKeys('testProject3');
		description.sendKeys('demoDescription');
        var buttonOK = element(by.buttonText('Ok'));
        buttonOK.click();
        expect(element(by.css(".alert.alert-danger")).isDisplayed()).toBe(true);
    });

    it('cancel the delete confimation modal of the project ', function () {
        browser.get(baseURL+"#/projects");
        var deleteOperation = element(by.css('a[title=Delete]'));
        deleteOperation.click();
        var buttonCancel = element(by.buttonText('Cancel'));
        buttonCancel.click();
        expect(buttonCancel.isPresent()).toBe(false);
    });

    it('Delete the projects ', function () {
        browser.get(baseURL+"#/projects");
        var deleteOperation = element(by.css('a[title=Delete]'));
        deleteOperation.click();
        var buttonOK = element(by.buttonText('Ok'));
        buttonOK.click();
        expect(element(by.cssContainingText(".alert","Projects is successfully deleted"))
        .isDisplayed()).toBe(true);
    });

    it(' Show error if user doesnt has permission to delete the projects ', function () {
        mock.teardown();
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
                        "opnfv-gerrit-testProject1-submitters",
                        "opnfv-gerrit-testProject2-submitters" ],
                        "email": "testuser@test.com"
                    }
                }
            },
            {
                request: {
                    path: '/api/v1/projects/testproject3',
                    method: 'DELETE'
                },
                response: {
                    status: 403
                }
            },
            {
                request: {
                    path: '/api/v1/projects',
                    method: 'GET'
                },
                response: {
                    data :  {
                        "projects": [
                            {
                                "_id": "5a0c1c9a9a07c846d3a7247b",
                                "creation_date": "2017-11-15 16:23:14.217093",
                                "description": "sdgfd",
                                "name": "testproject3"
                            }]
                        }
                    }
            }
        ]);
        browser.get(baseURL+"#/projects");
        var deleteOperation = element(by.css('a[title=Delete]'));
        deleteOperation.click();
        var buttonOK = element(by.buttonText('Ok'));
        buttonOK.click();
        expect(element(by.css(".alert.alert-danger")).isDisplayed()).toBe(true);
    });

    it('cancel the Edit modal of the Project ', function () {
        browser.get(baseURL+"#/projects");
        var editOperation = element(by.css('a[title=Edit]'));
        editOperation.click();
        var name = element(by.model('ProjectModalCtrl.project.name'));
        var EC = browser.ExpectedConditions;
        browser.wait(EC.visibilityOf(name), 5000);
        name.sendKeys('test1');
        var buttonCancel = element(by.buttonText('Cancel'));
        buttonCancel.click();
        expect(name.isPresent()).toBe(false);
    });

    it('Edit the Project ', function () {
        browser.get(baseURL+"#/projects");
        var editOperation = element(by.css('a[title=Edit]'));
        editOperation.click();
        var name = element(by.model('ProjectModalCtrl.project.name'));
        var EC = browser.ExpectedConditions;
        browser.wait(EC.visibilityOf(name), 5000);
        name.sendKeys('test1');
        var buttonOK = element(by.buttonText('Ok'));
        buttonOK.click()
        expect(element(by.cssContainingText(".alert","Project is successfully updated."))
        .isDisplayed()).toBe(true);
    });

    it('Show error if user doesnt has permission to edit the projects ', function () {
        mock.teardown();
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
                        "opnfv-gerrit-testProject1-submitters",
                        "opnfv-gerrit-testProject2-submitters" ],
                        "email": "testuser@test.com"
                    }
                }
            },
            {
                request: {
                    path: '/api/v1/projects/testproject3',
                    method: 'PUT'
                },
                response: {
                    status: 403
                }
            },
            {
                request: {
                    path: '/api/v1/projects',
                    method: 'GET'
                },
                response: {
                    data :  {
                        "projects": [
                            {
                                "_id": "5a0c1c9a9a07c846d3a7247b",
                                "creation_date": "2017-11-15 16:23:14.217093",
                                "description": "sdgfd",
                                "name": "testproject3"
                            }]
                        }
                    }
            }
        ]);
        browser.get(baseURL+"#/projects");
        var editOperation = element(by.css('a[title=Edit]'));
        editOperation.click();
        var name = element(by.model('ProjectModalCtrl.project.name'));
        var EC = browser.ExpectedConditions;
        browser.wait(EC.visibilityOf(name), 5000);
        name.sendKeys('test1');
        var buttonOK = element(by.buttonText('Ok'));
        buttonOK.click()
        expect(element(by.css(".alert.alert-danger")).isDisplayed()).toBe(true);
    });

    it('Batch Delete the projects ', function () {
        browser.get(baseURL+"#/projects");
        var checkBox = element(by.model('ctrl.checkBox[index]'));
        checkBox.click();
        var buttonDelete = element(by.buttonText('Delete'));;
        buttonDelete.click();
        var buttonOK = element(by.buttonText('Ok'));
        buttonOK.click();
        expect(element(by.cssContainingText(".alert","Projects is successfully deleted"))
        .isDisplayed()).toBe(true);
    });

	it('If backend is not responding then show error when user click the create button',function(){
		mock.teardown();
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
                        "opnfv-gerrit-testProject1-submitters",
                        "opnfv-gerrit-testProject2-submitters" ],
                        "email": "testuser@test.com"
                    }
                }
            }
		]);
		browser.get(baseURL+"#/projects");
        var buttonCreate = element(by.buttonText('Create'));
        buttonCreate.click();
        var name = element(by.model('ProjectModalCtrl.project.name'));
        var EC = browser.ExpectedConditions;
        browser.wait(EC.visibilityOf(name), 5000);
        var details = element(by.model('ProjectModalCtrl.project.description'));
        name.sendKeys('testproject');
		details.sendKeys('demoDescription');
		var buttonOK = element(by.buttonText('Ok'));
		buttonOK.click().then(function(){
			expect(element(by.css(".alert.alert-danger")).isDisplayed()).toBe(true);
        });
	});
})
