'use strict';

angular.module('d3BarApp')
  .directive('bargraph', function () {
    return {
    	controller:function($scope,$element,$http){
    		$scope.switchData = false;
    		$scope.getData = function(item){
    			var data = [];
    			if(item.id === 0){
    				data = [
	    				{value:8}, {value:12}, {value:15}, {value:30},
	    				{value:43},{value:8}, {value:12}, {value:15}, 
	    				{value:30}, {value:43}
	    			]	
    			}else if(item.id === 1){
    				data = [
	    				{value:10},{value:20},{value:30},{value:10}
	    			]	
    			}else{
    				data = [{value:40}]
    			}

    			$scope.updateChart(data);
    			
    		}
    	},
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
      	var data = [{value:8}, {value:12}, {value:15}, {value:30}, 
      	{value:43},{value:8}, {value:12}, {value:15}, {value:30}, {value:43}];

      	var w = 800,
    				h = 300,
    				gutter = 10;

    		var chart = d3.select(element[0]).append("svg")
				    .attr("class", "chart")
				    .attr("width",w)
				    .attr("height", h);

				var y = d3.scale.linear()
								.domain([0,d3.max(data,function(num){ return num.value})])
								.rangeRound([0,h])
      	
      	scope.buildChart = function(data){

					chart.selectAll("rect")
					    .data(data)
					  .enter().append("rect")
					    .attr("x", function(d, i) { return i * (w/data.length); })
					    .attr("y", function(d) { return h - y(d.value) - gutter; })
					    .attr("width", function(){ return w/data.length - gutter})
					    .attr("height", function(d) { return y(d.value); } );

					// horizontal line for the x-axis
					chart.append("line")
					     .attr("x1", 0)
					     .attr("x2", w * data.length)
					     .attr("y1", h - gutter)
					     .attr("y2", h - gutter)
					     .style("stroke", "#000");


      	};

      	//
      	// this takes care of the update property of d3
      	// it basically rebinds the chart with the new data
      	//
      	scope.updateChart = function(data){
      		chart.selectAll("rect")
      				.transition()
					    .attr("x", function(d, i) { return i * (w/data.length); })
					    .attr("y", function(d) { return h - y(d.value) - gutter; })
					    .attr("width", function(){ return w/data.length - gutter})
					    .attr("height", function(d) { return y(d.value); } )
      	}

      	scope.buildChart(data);



      }
    };
  });
