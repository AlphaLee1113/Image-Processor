(function(imageproc) {
    "use strict";

    /*
     * Apply sobel edge to the input data
     */
    imageproc.sobelEdge = function(inputData, outputData, threshold) {
        console.log("Applying Sobel edge detection...");

        /* Initialize the two edge kernel Gx and Gy */
        var Gx = [
            [-1, 0, 1],
            [-2, 0, 2],
            [-1, 0, 1]
        ];
        var Gy = [
            [-1,-2,-1],
            [ 0, 0, 0],
            [ 1, 2, 1]
        ];

        /**
         * TODO: You need to write the code to apply
         * the two edge kernels appropriately
         */
        
        var GXmeanR;
        var GXmeanG;
        var GXmeanB;

        var GYmeanR;
        var GYmeanG;
        var GYmeanB;

        var step = (3-1)/2;
        // eg 3x3 become 1              5x5 become 2

        // Apply the kernel to the whole image
        for (var y = 0; y < inputData.height; y++) {
            for (var x = 0; x < inputData.width; x++) {
                // Use imageproc.getPixel() to get the pixel values
                // over the kernel
                for (var j = -step; j <= step; j++) {
                    for (var i = -step; i <= step; i++) {
                        var pixel = imageproc.getPixel(inputData, x+i , y+j);
                        // console.log("Gx[j+1][i+1] is", Gx[j+1][i+1]);

                        GXmeanR += pixel.r*Gx[j+1][i+1];
                        GXmeanG += pixel.g*Gx[j+1][i+1];
                        GXmeanB += pixel.b*Gx[j+1][i+1];

                        GYmeanR += pixel.r*Gy[j+1][i+1];
                        GYmeanG += pixel.g*Gy[j+1][i+1];
                        GYmeanB += pixel.b*Gy[j+1][i+1];
                    }
                }

                // Then set the blurred result to the output data
                
                var i = (x + y * outputData.width) * 4;
                // outputData.data[i]     = Math.hypot(GXmeanR,GYmeanR);
                // outputData.data[i + 1] = Math.hypot(GXmeanG,GYmeanG);
                // outputData.data[i + 2] = Math.hypot(GXmeanB,GYmeanB);
//apply threshold
                var grayscale = (Math.hypot(GXmeanR,GYmeanR) + Math.hypot(GXmeanG,GYmeanG) + Math.hypot(GXmeanB,GYmeanB))/3;

                // Change the colour to black or white based on the given threshold
                if(grayscale > threshold){
                    outputData.data[i]     = 255;
                    outputData.data[i + 1] = 255;
                    outputData.data[i + 2] = 255;
                }
                else{  // grayscale smaller than threshold then black
                    outputData.data[i]     = 0;
                    outputData.data[i + 1] =  0;
                    outputData.data[i + 2] =  0;;
                }
                
                GXmeanR = 0;
                GXmeanG= 0;
                GXmeanB= 0;

                GYmeanR = 0;
                GYmeanG= 0;
                GYmeanB= 0;
            }
        }

        
    } 

}(window.imageproc = window.imageproc || {}));
