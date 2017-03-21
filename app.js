var artists = ['Reba McEntire','Gloria Trevi', 'Trina', 'Rihanna','MIA','Beyonce','Fever Ray', 'Princess Nokia','Dolly Parton', 'Donna Summer', 'Miley Cyrus','Missy Elliot','Bjork','Ciara','Patty Smith','Portishead', 'Austra', 'Mary J. Blige','Le1f','Mykki Blanco', 'Grace Jones'];

artists.forEach(function(artist){
	var thisButton = $('<button>');
	thisButton.html(artist);
	thisButton.attr('class','button')
	thisButton.attr('data-person', artist);
	console.log(thisButton);
	$('#buttons').append(thisButton);
});

$(document).on('click', '.button', function(){
	console.log('click');
	var person = $(this).attr("data-person");
	//api enpoint concatenated with the celeb
	var queryURL = "http://api.giphy.com/v1/gifs/search?q=" +
	  person + "&api_key=dc6zaTOxFJmzC&limit=12";
	  //call
	$.ajax({
	    url: queryURL,
	    method: "GET"
	  })
	  .done(function(response) {
	    console.log(response.data);
	    var results = response.data;
	    console.log(response);

	    for (var i = 0; i < results.length; i++) {
	    var imgUrl = results[i].images.fixed_width.url;
	    var imgUrlstill = results[i].images.fixed_width_still.url;

	    // Make a div with jQuery and store it in a variable named animalDiv.
	    var artistFig = $('<figure>');
	    artistFig.attr('class','figure col-xs-6 col-md-4');
	    // Make a paragraph tag with jQuery and store it in a variable named p.
	    var figcap = $('<figcaption>');
	    // Set the inner text of the paragraph to the rating of the image in var
	    figcap.html(results[i].rating).attr('class','figure-caption text-center');
	    // Make an image tag with jQuery and store it in a variable named animalImage.
	    var artistImage = $('<img>');
	    // <img src="http://media1.giphy.com/media/3o85xkQpyMlnBkpB9C/200_s.gif" data-still="http://media1.giphy.com/media/3o85xkQpyMlnBkpB9C/200_s.gif" data-animate="http://media1.giphy.com/media/3o85xkQpyMlnBkpB9C/200.gif" data-state="still" class="gif">
	    artistImage.attr('src',imgUrlstill).attr('class','gif figure-img img-fluid img-thumbnail').attr('data-state','still').attr('data-still', imgUrlstill).attr('data-animate',imgUrl);

	    artistFig.prepend(figcap);
	    artistFig.prepend(artistImage);

	    $('#gifs-appear-here').prepend(artistFig);

	    }
	})


});

$(document).on("click", ".gif", function() {

   var state = $(this).attr('data-state');
   console.log(state);
   console.log(state);

  if ($(this).attr('data-state') == 'still'){
    $(this).attr('src', $(this).attr('data-animate'));
    $(this).attr('data-state', 'animate');
  }else{
    $(this).attr('src', $(this).attr('data-still'));
    $(this).attr('data-state', 'still');
  }

});

$('#add-artist').off('click').on('click', function(event){
	//prevent page reload
	event.preventDefault();

	// store inputted cal in var
	var newArtist = $('#artist-name').val().trim();

	var newButton = $('<button>');

	newButton.html(newArtist);
	newButton.attr('class','button')
	newButton.attr('data-person', newArtist);
	//make sure that button isn't a duplicate or empty?
	$('#buttons').prepend(newButton);
});


