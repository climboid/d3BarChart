'use strict';

angular.module('d3BarApp')
  .controller('MainCtrl', function ($scope) {
		$scope.btnList = [
			{label:'day',isSel:true},
			{label:'week',isSel:false},
			{label:'month',isSel:false}
		];
		
  });
