var artists = ['Gloria Trevi','Princess Nokia', 'Missy Elliot', 'Trina', 'Mary J. Blige','Rihanna','MIA','Beyonce','Fever Ray', 'Dolly Parton', 'Donna Summer', 'Miley Cyrus','Bjork','Ciara','Patty Smith','Portishead', 'Austra', 'Le1f','Mykki Blanco', 'Grace Jones'];

artists.forEach(function(artist){
	var thisButton = $('<button>');
	thisButton.html(artist);
	thisButton.attr('class','button')
	thisButton.attr('data-person', artist);
	console.log(thisButton);
	$('#buttons').append(thisButton);
});

$('.button').on('click', function(){
	console.log('click');
	var person = $(this).attr("data-person");
	//api enpoint concatenated with the celeb
	var queryURL = "http://api.giphy.com/v1/gifs/search?q=" +
	  person + "&api_key=dc6zaTOxFJmzC&limit=10";
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
	    var imgUrl = results[i].images.fixed_height.url;
	    var imgUrlstill = results[i].images.fixed_height_still.url;

	    // Make a div with jQuery and store it in a variable named animalDiv.
	    var artistDiv = $('<div>');
	    // Make a paragraph tag with jQuery and store it in a variable named p.
	    var p = $('<p>');
	    // Set the inner text of the paragraph to the source of the image in var
	    // p.html(results[i].source);
	    // Make an image tag with jQuery and store it in a variable named animalImage.
	    var artistImage = $('<img>');
	    // <img src="http://media1.giphy.com/media/3o85xkQpyMlnBkpB9C/200_s.gif" data-still="http://media1.giphy.com/media/3o85xkQpyMlnBkpB9C/200_s.gif" data-animate="http://media1.giphy.com/media/3o85xkQpyMlnBkpB9C/200.gif" data-state="still" class="gif">
	    artistImage.attr('src',imgUrlstill).attr('class','gif img img-responsive col-xs-12 col-sm-3').attr('data-state','still').attr('data-still', imgUrlstill).attr('data-animate',imgUrl);

	    artistDiv.prepend(artistImage);
	    artistDiv.prepend(p);

	    $('#gifs-appear-here').prepend(artistDiv);

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


