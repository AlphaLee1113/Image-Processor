(function(imageproc) {
    "use strict";

    /*
     * Apply blur to the input data
     */
    imageproc.blur = function(inputData, outputData, kernelSize) {
        console.log("Applying blur...");

        // You are given a 3x3 kernel but you need to create a proper kernel
        // using the given kernel size
        var kernel;
        switch(kernelSize){
            case 3:
                kernel = [ [1, 1, 1], [1, 1, 1], [1, 1, 1] ];
                break;
            case 5:
                kernel = [ [1, 1, 1, 1, 1], [1, 1, 1, 1, 1], [1, 1, 1, 1, 1], [1, 1, 1, 1, 1], [1, 1, 1, 1, 1] ];
                break;
            case 7:
                kernel = [ [1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1],
                             [1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1] ];
                break;
            case 9:
                kernel = [ [1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1],
                            [1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1],
                            [1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1] ];
                break;
        }


        /**
         * TODO: You need to extend the blur effect to include different
         * kernel sizes and then apply the kernel to the entire image
         */
        var meanR;
        var meanG;
        var meanB;

        var step = (kernelSize-1)/2;
        // eg 3x3 become 1              5x5 become 2

        // Apply the kernel to the whole image
        for (var y = 0; y < inputData.height; y++) {
            for (var x = 0; x < inputData.width; x++) {
                // Use imageproc.getPixel() to get the pixel values
                // over the kernel
                for (var j = -step; j <= step; j++) {
                    for (var i = -step; i <= step; i++) {
                        var pixel = imageproc.getPixel(inputData, x+i , y+j);

                        meanR += pixel.r;
                        meanG += pixel.g;
                        meanB += pixel.b;
                    }
                }

                // Then set the blurred result to the output data
                
                var i = (x + y * outputData.width) * 4;
                outputData.data[i]     = meanR/(kernelSize*kernelSize);
                outputData.data[i + 1] = meanG/(kernelSize*kernelSize);
                outputData.data[i + 2] = meanB/(kernelSize*kernelSize);

                meanR = 0;
                meanG= 0;
                meanB= 0;
            }
        }
    } 

}(window.imageproc = window.imageproc || {}));
