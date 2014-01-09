d3.csv("http://mke.artcircles.us/sites/mke.artcircles.us/files/force.csv", function (error, links) {
	var margin = {
			top: -5,
			right: -5,
			bottom: -5,
			left: -5
		},
		width = 960 - margin.left - margin.right,
		height = 500 - margin.top - margin.bottom;

	var nodes = {};

	// Compute the distinct nodes from the links.
	links.forEach(function (link) {
		link.source = nodes[link.source] || (nodes[link.source] = {
			name: link.source
		});
		link.target = nodes[link.target] || (nodes[link.target] = {
			name: link.target
		});
		link.value = +link.value;
	});

	var force = d3.layout.force()
		.nodes(d3.values(nodes))
		.links(links)
		.gravity(.1)
		.size([width, height])
		.linkStrength(.2)
		.friction(.8)
		.linkDistance(75)
		.charge(-150)
		.on("tick", tick)
		.start();

	function tick(e) {
		circle.attr("cx", function (d) {
			return d.x;
		})
			.attr("cy", function (d) {
				return d.y;
			});
		path.attr("d", function (d) {
			var dx = d.target.x - d.source.x,
				dy = d.target.y - d.source.y,
				dr = 0; //Math.sqrt(dx * dx + dy * dy);
			return "M" + d.source.x + "," + d.source.y + "A" + dr + "," + dr + " 0 0,1 " + d.target.x + "," + d.target.y;
		});

		node.attr("transform", function (d) {
			return "translate(" + d.x + "," + d.y + ")";
		});
	}



	var zoom = d3.behavior.zoom()
		.scaleExtent([1, 10])
		.on("zoom", zoomed);

	var drag = d3.behavior.drag()
		.origin(function (d) {
			return d;
		})
		.on("dragstart", dragstarted)
		.on("drag", dragged)
		.on("dragend", dragended);

	var svg = d3.select("#artcircles")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom)
		.append("g")
		.attr("transform", "translate(" + margin.left + "," + margin.right + ")")
		.call(zoom);

	var container = svg.append("g");

	var path = svg.append("svg:g").selectAll("path")
		.data(force.links())
		.enter().append("svg:path")
		.attr("class", "link");


	var node = svg.selectAll(".node")
		.data(force.nodes())
		.enter().append("g")
		.attr("class", "node")
		.call(force.drag);

	// add the nodes
	node.append("circle")
		.attr("r", 10)
		.style("fill", "#BBBDC0");

	// add the text
	node.append("text")
		.attr("text-anchor", "middle")
		.text(function (d) {
			return d.name;
		});

	var circle = svg.selectAll("circle")
		.data(nodes)
		.enter().append("circle")
		.attr("r", function(d) { return d.radius; })
		.style("fill", function(d) { return d.color; })
		.call(force.drag);

	function dottype(d) {
		d.x = +d.x;
		d.y = +d.y;
		return d;
	}

	function zoomed() {
		container.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
	}

	function dragstarted(d) {
		d3.event.sourceEvent.stopPropagation();
		d3.select(this).classed("dragging", true);
	}

	function dragged(d) {
		d3.select(this).attr("cx", d.x = d3.event.x).attr("cy", d.y = d3.event.y);
	}

	function dragended(d) {
		d3.select(this).classed("dragging", false);
	}

});