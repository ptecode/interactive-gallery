
var $overlay = $('<div id="overlay"></div>');
var $wrapper = $('<div class="wrapper"></div>');
var $caption = $("<p></p>");
var $closeBtn = $('<button class="btn-close">&cross;</button>');
var $prevBtn = $('<button class="btn-prev">&larr;</button>');
var $nextBtn = $('<button class="btn-next">&rarr;</button>');

var $container = $('<div class="container"></div>');
var $image = $("<img>");
var $iFrame = $('<iframe width="560" height="315" frameborder="0" fs="0"></iframe>');

//Add container(with img or iframe) to wrapper
$wrapper.append($container);

//Add wrapper and control buttons to overlay
$overlay.append($closeBtn, $prevBtn, $wrapper, $nextBtn, $caption);

$("body").append($overlay);


function lightboxShow(linkToShow) {
    var linkLocation = linkToShow.attr("href");
    $container.empty();

    if ( linkToShow.is("[href^='https://www.youtube']") ) {
        //Add iframe to container
        $iFrame.attr("src", linkLocation);
        $container.append($iFrame);
    } else {
        //Add img to container
        $image.attr("src", linkLocation);
        $container.append($image);
    }

    var captionText = linkToShow.children("img").attr("title");
    $caption.text(captionText);

    //remove 'selected' class from previously selected list item
    $("#gallery li.selected").removeClass("selected");
    //add 'selected' class to the parent list item of current link displayed
    linkToShow.closest("li").addClass("selected");

    setBtnControls();

    $overlay.show();
}


function showPrevious() {
    var prevLink = $("#gallery li.selected").prev().children("a");
    lightboxShow(prevLink);
}


function showNext() {
    var nextLink = $("#gallery li.selected").next().children("a");
    lightboxShow(nextLink);
}


function closeLightbox() {
    $overlay.hide();
}


function setBtnControls() {
    $prevBtn.prop("disabled", false);
    $nextBtn.prop("disabled", false);
    var selectedLi = $("#gallery li.selected");
    //check for first list item and disable prevbtn
    //check for last list item and disable nextbtn
    if ( selectedLi.prev().length === 0 ) {
        $prevBtn.prop("disabled", true);
    } else if ( selectedLi.next().length === 0 ) {
        $nextBtn.prop("disabled", true);
    }
    return;
}

//keyboard controls
$(document).keyup(function(event) {
    if ( $overlay.is(":visible") ) {
        if ( event.which == '37' && $prevBtn.is(":enabled") ) {
            //left arrow will not work on first item, where prevbtn is disabled
            showPrevious();
        } else if ( event.which == '39' && $nextBtn.is(":enabled") ) {
            showNext();
        } else if (event.which == '27') {
            //esc to close
            closeLightbox();
        }
    }
});


//capturing the click event on a link in the list item
$("#gallery a").click(function(event) {
    event.preventDefault();
    var theLinkToShow = $(this);
    lightboxShow(theLinkToShow);
});

//click on overlay buttons
$closeBtn.click(closeLightbox);
$prevBtn.click(showPrevious);
$nextBtn.click(showNext);


//Search function
$("#user_input").keyup(function() {
    var userEntry = $(this).val().toLowerCase();

    $("#gallery li").each(function() {
        var titleContent = $(this).find("img").attr("title").toLowerCase();
        if ( titleContent.indexOf(userEntry) !== -1 ) {
            $(this).show("slow");
        } else {
            $(this).slideUp();
        }
    });
});
















