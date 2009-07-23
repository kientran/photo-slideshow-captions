/*
    Photo Slideshow with Captions 

    @author:    Kien Tran (kientran@kientran.com)
    @version:   1.0
    @date:      22 July 2009

    This project aims to create a XHTML compliant slideshow
    that supports text captioning that will failover
    correctly on disabled javascript, images, or CSS.

    This caption bar will fade in on a slide transition
    and itself uses a alpha transparent PNG to reveal the
    photo behind.  Note that in IE the alpha system is
    quirky and it's just easier to remove the fade.

*/


/* Call back function to animate the caption */
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

/* calls jQuery.cycle plugin */
$(document).ready(function(){
	$('#slideshow-box').cycle({
		speed: 1000,
		timeout: 6000,
		before: onBefore,
		after: onAfter,
		pause: true,
		delay: 2000
	});
});
