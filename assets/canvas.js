var loadcount = 0;
var loadtotal = 0;
var preloaded = false;



function loadImages(imagefiles) {
    loadcount = 0;
    loadtotal = imagefiles.length;
    preloaded = false;

    var loadedimages = [];
    for (var i=0; i<imagefiles.length; i++) {
        var image = new Image();

        image.onload = function () {
            loadcount++;
            if (loadcount == loadtotal) {
                preloaded = true;
            }
        };

        image.src = imagefiles[i];
        loadedimages[i] = image;
    }

    return loadedimages;
}

function draw() {
    var canvas = document.getElementById('myCanvas');
    var canvasWidth = canvas.width;
    var canvasHeight = canvas.height;

    var circle = {'x': 100, 'y': 100, 'xVel': 10, 'yVel': 5, 'diameter': 500};

    var requestAnimationFrame =
        window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        function(callback) {
            return setTimeout(callback, 1);
        };

    if (canvas.getContext) {
        var ctx = canvas.getContext('2d');
        var images = loadImages(["MrBenyon.jpg", "MrBenyon.jpg"]);
        var woodPattern;
        animate();
    } else {
        console.log("Canvas-unsupported code here");
    }

    function animate() {
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        
        woodPattern = ctx.createPattern(images[1], "repeat");
        ctx.fillStyle = woodPattern;
        ctx.fillRect(20, 20, 300, 300);
        
        
        ctx.drawImage(images[0], circle.x, circle.y, circle.diameter, circle.diameter);
        circle.x += circle.xVel;

        if (circle.x > canvasWidth - circle.diameter|| circle.x < 0) {
            circle.xVel *= -1
        }

        requestAnimationFrame(animate);

       
    }
}
