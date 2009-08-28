/*
    Photo Slideshow with Captions 

    @author:    Kien Tran (kientran@kientran.com)
    @version:   1.2
    @date:      5 August 2009 

    This project aims to create a XHTML compliant slideshow
    that supports text captioning that will failover
    correctly on disabled javascript, images, or CSS.

    This caption bar will fade in on a slide transition
    and itself uses a alpha transparent PNG to reveal the
    photo behind.  Note that in IE the alpha system is
    quirky and it's just easier to remove the fade.

*/


/* Call back function to animate the caption on transition */
function onBefore() {
	if ($.browser.msie && $.browser.version < 9 ) {
    	$('.title').hide(); /* IE Hack since alpha doesn't work*/
	} else {
		$('.title').fadeTo(500, 0);
	}
};

function onAfter() {
	if ($.browser.msie && $.browser.version < 9 ) {
    	$('.title').show();
	} else {
		$('.title').fadeTo(1000, 1);
	}
};

function captionHovers() {

    // In theory, you could use IE8 but the alpha trans is
    // messed up.  Someting to fix in the future.  If you
    // use a non alpha trans caption bg, you could use this
    // on IE8, and maybe even IE7.
	if ($.browser.msie && $.browser.version < 9 ) return;

    // Adjust the title to accomodate a new span
    $('.slide a .title').css({top: '-140px'});

    // Insert the new crossfade span and remove
    // the regular hover color class.  Replace it
    // with a special class that won't trigger
    // hover switch
    $('.slide a .title.orange')
        .removeClass('orange')
        .addClass('nohvorange')
        .before('<span class="hover hvorange"></span>');
    $('.slide a .title.purple')
        .removeClass('purple')
        .addClass('nohvpurple')
        .before('<span class="hover hvpurple"></span>');
    $('.slide a .title.blue')
        .removeClass('blue')
        .addClass('nohvblue')
        .before('<span class="hover hvblue"></span>');
    $('.slide a .title.red')
        .removeClass('red')
        .addClass('nohvred')
        .before('<span class="hover hvred"></span>');
    $('.slide a .title.green')
        .removeClass('green')
        .addClass('nohvgreen')
        .before('<span class="hover hvgreen"></span>');

    // Hide the hovers
    $('.hover').css({opacity: 0});
    // Bind hover state to slides, fade in and out span.hover
    // for that slide only
    $('.slide').hover(function () {
        $('span.hover', this).stop().fadeTo(250, 1);
        }, function () {
        $('span.hover', this).stop().fadeTo(250, 0);
    });

};

function controlHovers() {
	if ($.browser.msie && $.browser.version < 9 ) {
        $('#slideshow-box').hover(function () {
            $('#prev').show();
            $('#next').show();
            }, function() {
            $('#prev').hide();
            $('#next').hide();
        }); 

    } else {
        $('#slideshow-box').hover(function () {
            $('#prev').fadeIn();
            $('#next').fadeIn();
            }, function() {
            $('#prev').fadeOut();
            $('#next').fadeOut();
        }); 
    }
}

/* calls jQuery.cycle plugin */
$(document).ready(function(){
 
    controlHovers(); 
    captionHovers(); 
	$('#slides').cycle({
		speed: 1000,
		timeout: 6000,
		before: onBefore,
		after: onAfter,
		pause: true,
		delay: 2000,
        next: '#next',
        prev: '#prev'
	});

});
