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
 $('div#slideShow img').attr('src', mImages[mCurrentIndex].imgPath);
 $('.details #location').text('Location: '+ mImages[mCurrentIndex].imgLocation);
 $('.details #description').text("Description: " + mImages[mCurrentIndex].description);
 $('.details #date').text("Date: "+ mImages[mCurrentIndex].date);
	//Add code here to access the #slideShow element.
	//Access the img element and replace its source
	//with a new image from your images array which is loaded 
	//from the JSON string
	//console.log('swap photo');
    if (mCurrentIndex === mImages.length){
        mCurrentIndex = 0;
    } else {
        mCurrentIndex+=1;
    }
}
function galleryImage(imgPath, imgLocation, description, date) {
    this.imgPath = imgPath;
    this.imgLocation = imgLocation;
    this.description = description;
    this.date = date;
   }
// Counter for the mImages array
    var mCurrentIndex = 0;
// XMLHttpRequest variable
// Array holding GalleryImage objects (see below).
    var mImages = [];
// Holds the retrived JSON information
    var mJson;
// URL for the JSON to load by default
// Some options for you are: images.json, images.short.json; you will need to create your own extra.json later
    var mURL = "images.json";
    var mRequest = new XMLHttpRequest();
    mRequest.onReadyStateChange = function() {
            if (mRequest.readyState === 4 && mRequest.status === 200) {
                try {
                    mJson = JSON.parse(mRequest.responseText);
                    for (var i = 0; i < mJson.images.length ; i++){
                    mImages.push(new galleryImage(mJson.images[i].imgPath,mJson.images[i].imgLocation,mJson.images[i].description,mJson.images[i].date));
                }
                } catch(err) {
                    console.log(err.message)
                }
            }
        };
    mRequest.open("GET", mURL , true);
    mRequest.send();


//You can optionally use the following function as your event callback for loading the source of Images from your json data (for HTMLImageObject).
//@param A GalleryImage object. Use this method for an event handler for loading a gallery Image object (optional).
    function makeGalleryImageOnloadCallback(galleryImage) {
        return function (e) {
            galleryImage.img = e.target;
            mImages.push(galleryImage);
        }
    }

    $(document).ready(function () {
        $('.details').hide();
        animate();

    });

    window.addEventListener('load', function () {

        console.log('window loaded');

    },true);


