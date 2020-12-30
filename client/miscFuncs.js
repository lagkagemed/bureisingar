function drawAllInList(size, list, offX, offY) {
    for(let i = 0; i < list.length; i +=1) {
        list[i].draw(size, offX, offY)
    }
}

//img is the original image, scale is a multiplier. It returns the resized image.
function Resize_Nearest_Neighbour( img, scale ){
    //make shortcuts for image width and height
    let w = img.width;
    let h = img.height;

    //---------------------------------------------------------------
    //draw the original image to a new canvas
    //---------------------------------------------------------------

    //set up the canvas
    let c = document.createElement("CANVAS");
    let ctxn = c.getContext("2d");
    //disable antialiasing on the canvas
    ctxn.imageSmoothingEnabled = false;
    //size the canvas to match the input image
    c.width = w;
    c.height = h;
    //draw the input image
    ctxn.drawImage( img, 0, 0 );
    //get the input image as image data
    let inputImg = ctxn.getImageData(0,0,w,h);
    //get the data array from the canvas image data
    let data = inputImg.data;

     //---------------------------------------------------------------
    //resize the canvas to our bigger output image
    //---------------------------------------------------------------
    c.width = w * scale;
    c.height = h * scale;
    //---------------------------------------------------------------
    //loop through all the data, painting each pixel larger
    //---------------------------------------------------------------
    for ( let i = 0; i < data.length; i+=4 ){

        //find the colour of this particular pixel
        let colour = "#";

        //---------------------------------------------------------------
        //convert the RGB numbers into a hex string. i.e. [255, 10, 100]
        //into "FF0A64"
        //---------------------------------------------------------------
        function _Dex_To_Hex( number ){
            let out = number.toString(16);
            if ( out.length < 2 ){
                out = "0" + out;
            }
            return out;
        }
        for ( let colourIndex = 0; colourIndex < 3; colourIndex++ ){
            colour += _Dex_To_Hex( data[ i+colourIndex ] );
        }
        //set the fill colour
        ctxn.fillStyle = colour;

        //---------------------------------------------------------------
        //convert the index in the data array to x and y coordinates
        //---------------------------------------------------------------
        let index = i/4;
        let x = index % w;
        //~~ is a faster way to do 'Math.floor'
        let y = ~~( index / w );
        //---------------------------------------------------------------
        //draw an enlarged rectangle on the enlarged canvas
        //---------------------------------------------------------------
        ctxn.fillRect( x*scale, y*scale, scale, scale );
    }

    //get the output image from the canvas
    let output = c.toDataURL("image/png");
    //returns image data that can be plugged into an img tag's src
    return output;
}