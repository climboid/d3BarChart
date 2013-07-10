'use strict';

angular.module('d3BarApp')
  .directive('bargraph', function () {
    return {
    	controller:function($scope,$element,$http){
    		$scope.switchData = false;
    		$scope.getData = function(item){
    			//
    			// here you would do an AJAX call POST to a service
    			// you would pass the data and the service would give you back an array
    			// of objects. You would on success set that data to your scope in order
    			// to feed it to the directive. 
    			console.log("here",item)
    			var data = [];
    			if(item === 'day'){
    				data = [
	    				{pounds:8}, {pounds:12}, {pounds:15}, {pounds:30},
	    				{pounds:43},{pounds:8}, {pounds:12}, {pounds:15}, 
	    				{pounds:30}, {pounds:43}
	    			]	
    			}else if(item === 'week'){
    				data = [
	    				{pounds:10},{pounds:20},{pounds:30},{pounds:10}
	    			]	
    			}else{
    				data = [{pounds:40}]
    			}

    			$scope.updateChart(data);
    			
    		}
    	},
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
      	var data = [{pounds:8}, {pounds:12}, {pounds:15}, {pounds:30}, 
      	{pounds:43},{pounds:8}, {pounds:12}, {pounds:15}, {pounds:30}, {pounds:43}];

      	var w = 800,
    				h = 300,
    				gutter = 10;

    		var chart = d3.select(element[0]).append("svg")
				    .attr("class", "chart")
				    .attr("width",w)
				    .attr("height", h);

				var y = d3.scale.linear()
								.domain([0,d3.max(data,function(num){ return num.pounds})])
								.rangeRound([0,h])
      	
      	scope.buildChart = function(data){

					chart.selectAll("rect")
					    .data(data)
					  .enter().append("rect")
					    .attr("x", function(d, i) { return i * (w/data.length); })
					    .attr("y", function(d) { return h - y(d.pounds) - gutter; })
					    .attr("width", function(){ return w/data.length - gutter})
					    .attr("height", function(d) { return y(d.pounds); } );

					// horizontal line for the x-axis
					chart.append("line")
					     .attr("x1", 0)
					     .attr("x2", w * data.length)
					     .attr("y1", h - gutter)
					     .attr("y2", h - gutter)
					     .style("stroke", "#000");

					var yAxis = d3.svg.axis()
                  .scale(y)
                  .orient("left")
                  .ticks(5);

          chart.append("g")
				    .attr("class", "axis")
				    .attr("transform", "translate(" + padding + ",0)")
				    .call(yAxis);


      	};

      	//
      	// this takes care of the update property of d3
      	// it basically rebinds the chart with the new data
      	//
      	scope.updateChart = function(data){
      		chart.selectAll("rect")
      				.transition()
					    .attr("x", function(d, i) { return i * (w/data.length); })
					    .attr("y", function(d) { return h - y(d.pounds) - gutter; })
					    .attr("width", function(){ return w/data.length - gutter})
					    .attr("height", function(d) { return y(d.pounds); } )
      	}

      	scope.buildChart(data);



      }
    };
  });
