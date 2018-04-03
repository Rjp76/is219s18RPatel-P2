/************* DO NOT TOUCH CODE ABOVE THIS LINE ***************/

// requestAnim shim layer by Paul Irish
    window.requestAnimFrame = (function(){
      return  window.requestAnimationFrame       || 
              window.webkitRequestAnimationFrame || 
              window.mozRequestAnimationFrame    || 
              window.oRequestAnimationFrame      || 
              window.msRequestAnimationFrame     || 
              function(/* function */ callback, /* DOMElement */ element){
                window.setTimeout(callback, 1000 / 60);
              };
    })();
  

// example code from mr doob : http://mrdoob.com/lab/javascript/requestanimationframe/

animate();

var mLastFrameTime = 0;
var mWaitTime = 5000; //time in ms
function animate() {
    requestAnimFrame( animate );
    var currentTime = new Date().getTime();
    if (mLastFrameTime === 0) {
        mLastFrameTime = currentTime;
    }

    if ((currentTime - mLastFrameTime) > mWaitTime) {
        swapPhoto();
        mLastFrameTime = currentTime;
    }
}

/************* DO NOT TOUCH CODE ABOVE THIS LINE ***************/
function swapPhoto() {

     if(mCurrentIndex < mImages.length) {
            $('.moreIndicator').click(function(){ 
                $('.details').slideDown().toggle();
            });
            mCurrentIndex++;
        } else { 
            mCurrentIndex = 0; // resets it back to zero
        };
    $('.photoHolder #photo').attr("src", mImages[mCurrentIndex].image);
    $('.location').text('Location: ' + mImages[mCurrentIndex].location);
    $('.description').text('Description: ' + mImages[mCurrentIndex].description);
    $('.date').text('Date: ' + mImages[mCurrentIndex].date);
};
function deets(){
    $('.moreIndicator').click(function(){ 
        if( $('.moreIndicator').hasClass('rot90')){
            $('.details').slideDown();
            $('.moreIndicator').removeClass('rot90');
            $('.moreIndicator').addClass('rot270');
        }else{
            $('.details').slideUp();
            $('.moreIndicator').removeClass('rot270');
            $('.moreIndicator').addClass('rot90');
        }
    });
};
var mCurrentIndex = 0;
function makegalleryImageOnloadCallback(galleryImage) {
    return function(e) {
        galleryImage.img = e.target;
        mImages.push(galleryImage);
    }
}


$(document).ready( function() {
    // This initially hides the photos' metadata information
  //  $('.details').eq(0).hide();
  $('.details').eq(0).show();
  deets();
    
});

window.addEventListener('load', function() {
    
    console.log('window loaded');

}, false);


function galleryImage(path, place, descrp, d) {
    this.image = path;
    this.location = place;
    this.description = descrp;
    this.date = d;
}

var mImages = [];

for (var i = 0; i < mImages.length; i++) {
console.log(mImages[i]); 
}
var mURL = "images.json";
var mRequest = new XMLHttpRequest();
mRequest.onreadystatechange = function() {
    // Do something interesting if file is opened successfully
    if (mRequest.readyState == 4 && mRequest.status == 200) {
        try {
            mJson = JSON.parse(mRequest.responseText);
            for(var i = 0; i<mJson.images.length; i++) { 
                var imgloc = mJson.images[i].imgPath;
                var loca = mJson.images[i].imgLocation;
                var desc = mJson.images[i].description;
                var d = mJson.images[i].date;
                mImages.push(new galleryImage(imgloc, loca, desc, d));
            }
            console.log(mJson);
        } catch(err) {
            console.log(err.message);
        }
    }
};
mRequest.open("GET",mURL, true);
mRequest.send();