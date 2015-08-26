

describe('RHTest', function() {
  'use strict';

  it('should automatically redirect to /repos when location hash/fragment is empty', function() {
    browser.get('index.html');
    expect(browser.getLocationAbsUrl()).toMatch("/repos");
  });


  describe('repos list', function() {

    beforeEach(function() {
      browser.get('index.html#/repos');
    });

    it('should render the list view when user navigates to /repos', function() {
      expect(element.all(by.css('[ng-view] md-toolbar')).first().getAttribute('class')).
        toMatch('md-warn');
    });

  });


  describe('repo detail', function() {

    beforeEach(function() {
      browser.get('index.html#/repo/13313291');
    });


    it('should render deatil view when user navigates to /repo/13313291', function() {
      expect(element.all(by.css('[ng-view] md-content')).first().getAttribute('class')).
        toMatch('detail');
    });


    it('should redirect to /repos when back button is clicked', function() {

      element(by.css(".btn-back")).click();

      expect(browser.getLocationAbsUrl()).toMatch("/repos");
    });

  });
});
