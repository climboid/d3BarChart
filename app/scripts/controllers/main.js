'use strict';

angular.module('d3BarApp')
  .controller('MainCtrl', function ($scope) {
		$scope.btnList = [
			{id:0,label:'data1',isSel:true},
			{id:1,label:'data2',isSel:false},
			{id:2,label:'data3',isSel:false}
		];
		
  });
