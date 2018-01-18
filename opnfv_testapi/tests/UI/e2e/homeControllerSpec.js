'use strict';

var mock = require('protractor-http-mock');
var baseURL = "http://localhost:8000"
describe('testing the home page for anonymous user', function () {

    it( 'should navigate to pods link ', function() {
        browser.get(baseURL);
        var signOut = element(by.linkText('Sign In / Sign Up'))
        expect(signOut.isDisplayed()).toBe(true);
    });
});

describe('testing the home page for user', function () {
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
        }])
    });

    afterEach(function(){
        mock.teardown();
    });

    it( 'should show the profile page', function() {
        browser.get(baseURL);
        var profile = element(by.linkText('Profile'))
        expect(profile.isDisplayed()).toBe(true);
        profile.click()
        var EC = browser.ExpectedConditions;
        browser.wait(EC.urlContains(baseURL+ '/#/profile'), 10000);
    });
});
