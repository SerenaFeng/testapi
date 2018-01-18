'use strict';

var mock = require('protractor-http-mock');
var baseURL = "http://localhost:8000"
describe('testing the Pods page for anonymous user', function () {

	beforeEach(function(){
		mock([{
			request: {
			  path: '/api/v1/pods',
			  method: 'GET'
			},
			response: {
				data: {
					pods: [{role: "community-ci", name: "test", owner: "testUser",
					details: "DemoDetails", mode: "metal", _id: "59f02f099a07c84bfc5c7aed",
					creation_date: "2017-10-25 11:58:25.926168"}]
				}
			}
		  },
		  {
			request: {
				path: '/api/v1/pods',
				method: 'GET',
				queryString: {
					name: 'test'
				}
			},
			response: {
				data: {
					pods: [{role: "community-ci", name: "test", owner: "testUser",
					details: "DemoDetails", mode: "metal", _id: "59f02f099a07c84bfc5c7aed",
					creation_date: "2017-10-25 11:58:25.926168"}]
				}
			}
		}
	]);
	});

	afterEach(function(){
		mock.teardown();
	});

	it( 'should navigate to pods link ', function() {
		browser.get(baseURL);
		var podslink = element(by.linkText('Pods')).click();
		var EC = browser.ExpectedConditions;
		browser.wait(EC.urlContains(baseURL+ '/#/pods'), 10000);
	});

	it('create button is not visible for anonymous user', function () {
		browser.get(baseURL+'#/pods');
		var buttonCreate = element(by.buttonText('Create'));
		expect(buttonCreate.isDisplayed()).toBeFalsy();
	});

	it('filter button is visible for anonymous user', function () {
		var buttonFilter = element(by.buttonText('Filter'));
		expect(buttonFilter.isDisplayed()).toBe(true)
	});

	it('Delete button is visible for anonymous user', function () {
		var buttonDelete = element(by.buttonText('Delete'));
		expect(buttonDelete.isDisplayed()).toBeFalsy();
	});

	it('Show results', function () {
		var row = element.all(by.repeater('(index, pod) in ctrl.data.pods')).first();
        var cells = row.all(by.tagName('td'));
        expect(cells.get(1).getText()).toContain("test");
	});

	it('Show relevant results to the filter', function () {
		var filter = element(by.model('ctrl.filterText'));
		filter.sendKeys('test');
		var buttonFilter = element(by.buttonText('Filter'));
		var row = element.all(by.repeater('(index, pod) in ctrl.data.pods')).first();
        var cells = row.all(by.tagName('td'));
        expect(cells.get(1).getText()).toContain("test");
	});

	it('delete Operation is not visible for  user ', function () {
		browser.get(baseURL+'#/pods');
		var deleteOperation = element(by.css('a[title=Delete]'));
		expect(deleteOperation.isDisplayed()).toBeFalsy();
	});


});

describe('testing the Pods page for authorized user', function () {

	beforeEach(function(){
		mock([{
			request: {
			  path: '/api/v1/pods',
			  method: 'GET'
			},
			response: {
				data: {
					pods: [{role: "community-ci", name: "test", owner: "testUser",
					details: "DemoDetails", mode: "metal", _id: "59f02f099a07c84bfc5c7aed",
					creation_date: "2017-10-25 11:58:25.926168"}]
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
					"user": "testUser", "groups": ["opnfv-testapi-users",
					"opnfv-gerrit-functest-submitters"], "email": "testuser@test.com"
				}
			}
		},
		{
			request: {
				path: '/api/v1/pods',
				method: 'GET',
				queryString: {
					name: 'test'
				}
			},
			response: {
				data: {
					pods: [{role: "community-ci", name: "test", owner: "testUser",
					details: "DemoDetails", mode: "metal", _id: "59f02f099a07c84bfc5c7aed",
					creation_date: "2017-10-25 11:58:25.926168"}]
				}
			}
		},
		{
			request: {
				path: '/api/v1/pods/test',
				method: 'DELETE'
			},
			response: {
				data: {
					href: baseURL+"/api/v1/pods/test"
				}
			}
		},
		{
			request: {
				path: '/api/v1/pods/test1',
				method: 'DELETE'
			},
			response: {
				data: {
					href: baseURL+"/api/v1/pods/test1"
				}
			}
		},
		{
			request: {
				path: '/api/v1/pods',
				method: 'POST'
			},
			response: {
				data: {
					href: baseURL+"/api/v1/pods/test1"
				}
			}
		},
		{
			request: {
				path: '/api/v1/pods/test',
				method: 'GET'
			},
			response: {
				data: {role: "community-ci", name: "test", owner: "testUser",
				details: "DemoDetails", mode: "metal", _id: "59f02f099a07c84bfc5c7aed",
				creation_date: "2017-10-25 11:58:25.926168"}
			}
		}
	]);
	});

	afterEach(function(){
		mock.teardown();
	});

	it( 'should navigate to pods link ', function() {
		browser.get(baseURL);
		var podslink = element(by.linkText('Pods')).click();
		var EC = browser.ExpectedConditions;
		browser.wait(EC.urlContains(baseURL+ '/#/pods'), 10000);
	});

	it('create button is not visible for  user', function () {
		browser.get(baseURL+'#/pods');
		var buttonCreate = element(by.buttonText('Create'));
		expect(buttonCreate.isDisplayed()).toBe(true);
	});

	it('filter button is visible for  user', function () {
		var buttonFilter = element(by.buttonText('Filter'));
		expect(buttonFilter.isDisplayed()).toBe(true)
	});

	it('Delete button is visible for  user', function () {
		var buttonDelete = element(by.buttonText('Delete'));
		expect(buttonDelete.isDisplayed()).toBe(true)
	});

	it('Show results', function () {
		var row = element.all(by.repeater('(index, pod) in ctrl.data.pods')).first();
        var cells = row.all(by.tagName('td'));
        expect(cells.get(1).getText()).toContain("test");
	});

	it('Show relevant results to the filter', function () {
		var filter = element(by.model('ctrl.filterText'));
		filter.sendKeys('test');
		var buttonFilter = element(by.buttonText('Filter'));
		var row = element.all(by.repeater('(index, pod) in ctrl.data.pods')).first();
        var cells = row.all(by.tagName('td'));
        expect(cells.get(1).getText()).toContain("test");
	});

	it('delete Operation is  visible for  user ', function () {
		browser.get(baseURL+'#/pods');
		var deleteOperation = element(by.css('a[title=Delete]'));
		expect(deleteOperation.isDisplayed()).toBe(true);
	});

	it('Batch Delete the pods ', function () {
        browser.get(baseURL+"#/pods");
        var checkBox = element(by.model('ctrl.checkBox[index]'));
        checkBox.click();
        var buttonDelete = element(by.buttonText('Delete'));;
        buttonDelete.click();
        var buttonOK = element(by.buttonText('Ok'));
		buttonOK.click();
        expect(element(by.cssContainingText(".alert","Delete Success"))
        .isDisplayed()).toBe(true);
	});

	it('Delete the pods ', function () {
        browser.get(baseURL+"#/pods");
        var deleteOperation = element(by.css('a[title=Delete]'));
        deleteOperation.click();
        var buttonOK = element(by.buttonText('Ok'));
        buttonOK.click();
        expect(element(by.cssContainingText(".alert","Delete Success"))
        .isDisplayed()).toBe(true);
	});

	it('Create the pod', function () {
        browser.get(baseURL+"#/pods");
        var buttonCreate = element(by.buttonText('Create'));
        buttonCreate.click();
        var name = element(by.model('PodModalCtrl.pod.name'));
        var EC = browser.ExpectedConditions;
        browser.wait(EC.visibilityOf(name), 5000);
        name.sendKeys('test1');
        var buttonOK = element(by.buttonText('Ok'));
		buttonOK.click();
        expect(element(by.cssContainingText(".alert","Create Success"))
        .isDisplayed()).toBe(true);
    });

    it('Showing error when creating with a empty name ', function () {
        browser.get(baseURL+"#/pods");
        var buttonCreate = element(by.buttonText('Create'));
        buttonCreate.click();
        var name = element(by.model('PodModalCtrl.pod.name'));
        var EC = browser.ExpectedConditions;
        browser.wait(EC.visibilityOf(name), 5000);
		var buttonOK = element(by.buttonText('Ok'));
		buttonOK.click()
        expect(element(by.cssContainingText(".alert","Name is missing."))
        .isDisplayed()).toBe(true);
    });

    it('cancel the delete confimation modal of the pod ', function () {
        browser.get(baseURL+"#/pods");
        var deleteOperation = element(by.css('a[title=Delete]'));
        deleteOperation.click();
        var buttonCancel = element(by.buttonText('Cancel'));
        buttonCancel.click();
        expect(buttonCancel.isPresent()).toBe(false);
	});

	it('Delete the pods which do not exist ', function () {
		mock.teardown();
		mock([{
				request: {
					path: '/api/v1/pods',
					method: 'GET'
				},
				response: {
					data: {
						pods: [{role: "community-ci", name: "test1", owner: "testUser",
						details: "DemoDetails", mode: "metal", _id: "59f02f099a07c84bfc5c7aed",
						creation_date: "2017-10-25 11:58:25.926168"}]
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
						"user": "testUser", "groups": ["opnfv-testapi-users",
						"opnfv-gerrit-functest-submitters"], "email": "testuser@test.com"
					}
			}
			},
			{
				request: {
					path: '/api/v1/pods/test1',
					method: 'DELETE'
				},
				response: {
					status : 403,
					data : 'pods do not exist'
				}
			}
		]);
        browser.get(baseURL+"#/pods");
        var deleteOperation = element(by.css('a[title=Delete]'));
        deleteOperation.click();
        var buttonOK = element(by.buttonText('Ok'));
		buttonOK.click();
        expect(element(by.css(".alert.alert-danger"))
        .isDisplayed()).toBe(true);
	});

	it('view the test case ', function () {
		browser.get(baseURL+"#/pods");
        var viewOperation = element(by.css('a[class=text-info]'));
        viewOperation.click();
        var EC = browser.ExpectedConditions;
        browser.wait(EC.urlContains('#/pods/test'), 10000);
	});

	it('Show error if server is not responding', function () {
		mock.teardown();
		mock([{
				request: {
					path: '/api/v1/pods',
					method: 'GET'
				},
				response: {
					status : 404
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
						"user": "testUser", "groups": ["opnfv-testapi-users",
						"opnfv-gerrit-functest-submitters"], "email": "testuser@test.com"
					}
			}
			},
		]);
        browser.get(baseURL+"#/pods");
        expect(element(by.css(".alert.alert-danger"))
        .isDisplayed()).toBe(true);
	});

});