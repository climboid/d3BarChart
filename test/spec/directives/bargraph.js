'use strict';

describe('Directive: bargraph', function () {
  beforeEach(module('d3BarApp'));

  var element;

  it('should make hidden element visible', inject(function ($rootScope, $compile) {
    element = angular.element('<bargraph></bargraph>');
    element = $compile(element)($rootScope);
    expect(element.text()).toBe('this is the bargraph directive');
  }));
});
