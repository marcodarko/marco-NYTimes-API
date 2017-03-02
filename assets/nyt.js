$("#searchButton").on("click", function(event){
	// prevents reloading of page
	event.preventDefault();
	var term= $("#searchTerm").val().trim();
	var recordsRequested= $("#recordNumber").val();
	var startYear=$("#start").val().trim().toString();
	var endYear=$("#end").val().trim().toString();
	var word= encodeURI(term);
	var January="0101";
	var December="1231";
// if optional fields were left empty
	if(startYear===""){
		startYear="20000101";
	}
	else{
		// concatonates the month and day to match the requested date format for the API
		startYear.concat(January);
	}
	if(endYear===""){
		endYear="20171231";
	}
	else{
		endYear.concat(December);
	}

	var authKey= "b9f91d369ff59547cd47b931d8cbc56b:0:74623931";
	var queryURL= "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" +
	authKey + "&q="+word+"&begin_date="+startYear+"&end_date="+endYear+"&hl=true";

	$.ajax({
		url: queryURL,
		method: "GET"
	}).done(function(responseNY) {
		var results= responseNY.response.docs;
		// empty container to avoid duplicate results
		$("#resultsHere").empty();
		for(i=0; i<recordsRequested; i++){
			var articleDiv= $("<div class='result'>");
			var title= $("<a class='headlineAnchor'>").text(i+1+". "+results[i].headline.main);
			title.attr("href", results[i].web_url );
			title.attr("target", "_blank");
			var lineBreak =$("<br>");
			var section=$("<p>").text("Section: "+results[i].section_name);
			var pubDate=$("<p>").text("Publication Date: "+results[i].pub_date);
			var artURL= $("<a>").text(results[i].web_url);
			artURL.attr("href", results[i].web_url );
			artURL.attr("target", "_blank");

			articleDiv.append(title);
			articleDiv.append(lineBreak);
			articleDiv.append(section);
			articleDiv.append(pubDate);
			articleDiv.append(artURL);
// appending the resulting div containing all the information we just pulled
			$("#resultsHere").append(articleDiv);
		}

	});

});

$("#clearButton").on("click", function(event){
	// clears all the fields including results
	event.preventDefault();
	$("#searchTerm").val(" ");
	$("#recordNumber").val(" ");
	$("#start").val(" ");
	$("#end").val(" ");
	$("#resultsHere").empty();

});
