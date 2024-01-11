(function(imageproc) {
    "use strict";

    /* Comic palette colour list */
    var palette = [
        [254, 251, 198],
        [255, 247, 149],
        [255, 240,   1],
        [189, 223, 198],
        [120, 201, 195],
        [  0, 166, 192],
        [190, 219, 152],
        [128, 197, 152],
        [  0, 163, 154],
        [251, 194, 174],
        [244, 148, 150],
        [234,  31, 112],
        [253, 193, 133],
        [246, 146, 120],
        [235,  38,  91],
        [184, 229, 250],
        [109, 207, 246],
        [  0, 173, 239],
        [249, 200, 221],
        [244, 149, 189],
        [233,   3, 137],
        [183, 179, 216],
        [122, 162, 213],
        [  0, 140, 209],
        [184, 137, 189],
        [132, 127, 185],
        [  0, 111, 182],
        [183,  42, 138],
        [143,  50, 141],
        [ 56,  58, 141],
        [187, 176, 174],
        [132, 160, 172],
        [  0, 137, 169],
        [188, 135, 151],
        [139, 126, 152],
        [  1, 110, 151],
        [198, 216,  54],
        [138, 192,  68],
        [  0, 160,  84],
        [190, 175, 136],
        [135, 159, 137],
        [  0, 137, 139],
        [189, 136, 120],
        [140, 126, 123],
        [  0, 110, 125],
        [255, 189,  33],
        [247, 145,  44],
        [236,  42,  50],
        [186,  45, 114],
        [144,  52, 115],
        [ 59,  59, 121],
        [194, 171,  57],
        [142, 156,  68],
        [  0, 135,  79],
        [189,  50,  55],
        [147,  56,  62],
        [ 61,  60,  65],
        [188,  48,  93],
        [145,  54,  97],
        [ 61,  60, 102],
        [191, 134,  57],
        [145, 125,  66],
        [  0, 108,  72],
        [  0,   0,   0],
        [255, 255, 255],
    ];

    /*
     * Convert the colours in the input data to comic colours
     */
    imageproc.comicColor = function(inputData, outputData, saturation) {
        console.log("Applying comic color...");

        /*
         * TODO: You need to complete the comic colour function so that
         * the pixels are mapped to one of the comic colours
         */

        for (var i = 0; i < inputData.data.length; i += 4) {
            var r = inputData.data[i];
            var g = inputData.data[i + 1];
            var b = inputData.data[i + 2];

            // First, you convert the colour to HSL
            // then, increase the saturation by the saturation factor
            // ***** beware of the final range of the saturation *****
            // after that, convert it back to RGB
            var hsv = imageproc.fromRGBToHSV(r,g,b);
            // h *= saturation;
            var newS = hsv["s"] * saturation;
            // v *= saturation;
            // if(h<0){
            //     h=0;
            // }
            // else if(h>1){
            //     h=1;
            // }
            // //
            if(newS<0){
                newS=0;
            }
            else if(newS>1){
                newS=1;
            }
            // console.log("newS is",newS);
            // if(v<0){
            //     v=0;
            // }
            // else if(v>1){
            //     v=1;
            // }
            var newRGB= imageproc.fromHSVToRGB (hsv["h"],newS,hsv["v"]);

            //CUT THIS PART LATTER
            // outputData.data[i]     = newRGB["r"];
            // outputData.data[i + 1] = newRGB["g"];
            // outputData.data[i + 2] = newRGB["b"];

            // Second, based on the saturated colour, find the matching colour
            // from the comic colour palette
            // This is done by finding the minimum distance between the colours
            var distance_of_color = new Array(palette.length).fill(0);
            // console.log("distance_of_color is",distance_of_color);
            // for(var x = 0; x<palette.length; x++){
            //     distance_of_color[x];
            // }
            var minusR = 0;
            var minusG = 0;
            var minusB = 0;

            // console.log("palette.length is ", palette.length);
            for(var x = 0; x < palette.length; x++){
                minusR = Math.abs(palette[x][0]-newRGB["r"]);
                minusG = Math.abs(palette[x][1]-newRGB["g"]);
                minusB = Math.abs(palette[x][2]-newRGB["b"]);
                // distance_of_color[x] = Math.sqrt(minusR^(2)+minusG^(2)+minusB^(2));
                distance_of_color[x] = Math.hypot(minusR, minusG, minusB);
            }

            // console.log("distance_of_color is ", distance_of_color);
            var shortest_distance = Math.min.apply(Math,distance_of_color);
            // console.log("shortest_distance is ", shortest_distance);
            var index_of_cloest = distance_of_color.indexOf(shortest_distance);
            // console.log("index_of_cloest is ", index_of_cloest);

            outputData.data[i]     = palette[index_of_cloest][0];
            outputData.data[i + 1] = palette[index_of_cloest][1];
            outputData.data[i + 2] = palette[index_of_cloest][2];
        }
    }
 
}(window.imageproc = window.imageproc || {}));
