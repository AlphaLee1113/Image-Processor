(function(imageproc) {
    "use strict";

    /*
     * Apply negation to the input data
     */
    imageproc.negation = function(inputData, outputData) {
        console.log("Applying negation...");

        for (var i = 0; i < inputData.data.length; i += 4) {
            outputData.data[i]     = 255 - inputData.data[i];
            outputData.data[i + 1] = 255 - inputData.data[i + 1];
            outputData.data[i + 2] = 255 - inputData.data[i + 2];
        }
    }

    /*
     * Convert the input data to grayscale
     */
    imageproc.grayscale = function(inputData, outputData) {
        console.log("Applying grayscale...");

        /**
         * TODO: You need to create the grayscale operation here
         */

        for (var i = 0; i < inputData.data.length; i += 4) {
            // Find the grayscale value using simple averaging
            var intensity = (inputData.data[i] + inputData.data[i + 1] + inputData.data[i + 2])/3;
            
           
            // Change the RGB components to the resulting value

            outputData.data[i]     = intensity;
            outputData.data[i + 1] = intensity;
            outputData.data[i + 2] = intensity;
        }
    }

    /*
     * Applying brightness to the input data
     */
    imageproc.brightness = function(inputData, outputData, offset) {
        console.log("Applying brightness...");

        /**
         * TODO: You need to create the brightness operation here
         */

        for (var i = 0; i < inputData.data.length; i += 4) {
            // Change the RGB components by adding an offset

            outputData.data[i]     = inputData.data[i] + offset;
            outputData.data[i + 1] = inputData.data[i + 1]+ offset;
            outputData.data[i + 2] = inputData.data[i + 2]+ offset;

            if(outputData.data[i]>255){
                outputData.data[i]=255;
            }
            else if (outputData.data[i]<0){
                outputData.data[i]=0;
            }

            if(outputData.data[i+1]>255){
                outputData.data[i+1]=255;
            }
            else if (outputData.data[i+1]<0){
                outputData.data[i+1]=0;
            }

            if(outputData.data[i+2]>255){
                outputData.data[i+2]=255;
            }
            else if (outputData.data[i+2]<0){
                outputData.data[i+2]=0;
            }

            // Handle clipping of the RGB components
        }
    }

    /*
     * Applying contrast to the input data
     */
    imageproc.contrast = function(inputData, outputData, factor) {
        console.log("Applying contrast...");

        /**
         * TODO: You need to create the brightness operation here
         */

        for (var i = 0; i < inputData.data.length; i += 4) {
            // Change the RGB components by multiplying a factor

            outputData.data[i]     = inputData.data[i]*factor;
            outputData.data[i + 1] = inputData.data[i + 1]*factor;
            outputData.data[i + 2] = inputData.data[i + 2]*factor;

            
            if(outputData.data[i]>255){
                outputData.data[i]=255;
            }
            else if (outputData.data[i]<0){
                outputData.data[i]=0;
            }

            if(outputData.data[i+1]>255){
                outputData.data[i+1]=255;
            }
            else if (outputData.data[i+1]<0){
                outputData.data[i+1]=0;
            }

            if(outputData.data[i+2]>255){
                outputData.data[i+2]=255;
            }
            else if (outputData.data[i+2]<0){
                outputData.data[i+2]=0;
            }

            // Handle clipping of the RGB components
        }
    }

    /*
     * Make a bit mask based on the number of MSB required
     */
    function makeBitMask(bits) {
        var mask = 0;
        for (var i = 0; i < bits; i++) {
            mask >>= 1;
            mask |= 128;
        }
        return mask;
    }

    /*
     * Apply posterization to the input data
     */
    imageproc.posterization = function(inputData, outputData,
                                       redBits, greenBits, blueBits) {
        console.log("Applying posterization...");

        /**
         * TODO: You need to create the posterization operation here
         */

        // Create the red, green and blue masks
        // A function makeBitMask() is already given
        var redBitsMask = makeBitMask(redBits);
        var greenBitsMask = makeBitMask(greenBits);
        var blueBitsMask = makeBitMask(blueBits);

        for (var i = 0; i < inputData.data.length; i += 4) {
            // Apply the bitmasks onto the RGB channels

            outputData.data[i]     = inputData.data[i] & redBitsMask;
            outputData.data[i + 1] = inputData.data[i + 1]& greenBitsMask;
            outputData.data[i + 2] = inputData.data[i + 2]& blueBitsMask;
        }
    }

    /*
     * Apply threshold to the input data
     */
    imageproc.threshold = function(inputData, outputData, thresholdValue) {
        console.log("Applying thresholding...");

        /**
         * TODO: You need to create the thresholding operation here
         */

        for (var i = 0; i < inputData.data.length; i += 4) {
            // Find the grayscale value using simple averaging
            // You will apply thresholding on the grayscale value
            var grayscale = (inputData.data[i] + inputData.data[i + 1] + inputData.data[i + 2])/3;
            
           
            // Change the colour to black or white based on the given threshold
            if(grayscale > thresholdValue){
                outputData.data[i]     = 255;
                outputData.data[i + 1] = 255;
                outputData.data[i + 2] = 255;
            }
            else{  // grayscale smaller than threshold then black
                outputData.data[i]     = 0;
                outputData.data[i + 1] =  0;
                outputData.data[i + 2] =  0;;
            }
        }
    }

    /*
     * Build the histogram of the image for a channel
     */
    function buildHistogram(inputData, channel) {
        var histogram = [];
        for (var i = 0; i < 256; i++)
            histogram[i] = 0;

        if(channel=="gray"){
            for(var i = 0; i < inputData.data.length; i += 4){
                var intensity = parseInt((inputData.data[i] + inputData.data[i + 1] + inputData.data[i + 2])/3);
                histogram[intensity]+=1;
            }
            console.log(histogram.slice(0, 10).join(","));
        }
        else if(channel=="red"){
            for(var i = 0; i < inputData.data.length; i += 4){
                histogram[inputData.data[i]]+=1;
            }
        }
        else if(channel=="green"){
            for(var i = 0; i < inputData.data.length; i += 4){
                histogram[inputData.data[i+1]]+=1;
            }
        }
        else if(channel=="blue"){
            for(var i = 0; i < inputData.data.length; i += 4){
                histogram[inputData.data[i+2]]+=1;
            }
        }
        /**
         * TODO: You need to build the histogram here
         */

        // Accumulate the histogram based on the input channel
        // The input channel can be:
        // "red"   - building a histogram for the red component
        // "green" - building a histogram for the green component
        // "blue"  - building a histogram for the blue component
        // "gray"  - building a histogram for the intensity
        //           (using simple averaging)
        //IMPORTSNT histogram cannnot store float numebr and 
        // must change to int before put in the histogram

        return histogram;
    }

    /*
     * Find the min and max of the histogram
     */
    function findMinMax(histogram, pixelsToIgnore) {
        var min = 0, max = 255;
        var original_pixelsToIgnore = pixelsToIgnore;

        /**
         * TODO: You need to build the histogram here
         */
        for (min = 0; min < 255; min++) {
            if (histogram[min] > 0 && histogram[min] >pixelsToIgnore){ // frequency > 0
                // eg pixelsToIgnore is 30 but histogram[12]=50
                //    then can directly use 12 as min
                break;
            }
            else if (histogram[min] > 0 && histogram[min] < pixelsToIgnore){
                // eg pixelsToIgnore is 50 but histogram[12]=30
                //    then need to search histogram[13]
                pixelsToIgnore -= histogram[min];
                // then pixelsToIgnore become 20
                continue;
            }

            
        }
        pixelsToIgnore = original_pixelsToIgnore;
        //recover the original value of the "pixelsToIgnore"

        for (max = 255; max > 0; max--) {
            if (histogram[max] > 0 && histogram[max] >pixelsToIgnore){ // frequency > 0
                // eg pixelsToIgnore is 30 but histogram[244]=50
                //    then can directly use 12 as min
                break;
            }
            else if (histogram[max] > 0 && histogram[max] < pixelsToIgnore){
                // eg pixelsToIgnore is 50 but histogram[244]=30
                //    then need to search histogram[13]
                pixelsToIgnore -= histogram[max];
                // then pixelsToIgnore become 20
                continue;
            }
                
        }

        // Find the minimum in the histogram with non-zero value by
        // ignoring the number of pixels given by pixelsToIgnore
       
        // Find the maximum in the histogram with non-zero value by
        // ignoring the number of pixels given by pixelsToIgnore
        // console.log("min is",min);
        // console.log("max is",max);
        
        return {"min": min, "max": max};
    }

    /*
     * Apply automatic contrast to the input data
     */
    imageproc.autoContrast = function(inputData, outputData, type, percentage) {
        console.log("Applying automatic contrast...");

        // Find the number of pixels to ignore from the percentage
        var pixelsToIgnore = (inputData.data.length / 4) * percentage;

        var histogram, minMax;
        if (type == "gray") {
            // Build the grayscale histogram
            histogram = buildHistogram(inputData, "gray");

            // Find the minimum and maximum grayscale values with non-zero pixels
            minMax = findMinMax(histogram, pixelsToIgnore);

            var min = minMax.min, max = minMax.max, range = max - min;

            /**
             * TODO: You need to apply the correct adjustment to each pixel
             */

            for (var i = 0; i < inputData.data.length; i += 4) {
                // Adjust each pixel based on the minimum and maximum values

                outputData.data[i]     = (inputData.data[i] - min) / (max - min) * 255;
                outputData.data[i + 1] = (inputData.data[i+1] - min) / (max - min) * 255;
                outputData.data[i + 2] = (inputData.data[i+2] - min) / (max - min) * 255;

                if(outputData.data[i]>255){
                    outputData.data[i]=255;
                }
                else if (outputData.data[i]<0){
                    outputData.data[i]=0;
                }
    
                if(outputData.data[i+1]>255){
                    outputData.data[i+1]=255;
                }
                else if (outputData.data[i+1]<0){
                    outputData.data[i+1]=0;
                }
    
                if(outputData.data[i+2]>255){
                    outputData.data[i+2]=255;
                }
                else if (outputData.data[i+2]<0){
                    outputData.data[i+2]=0;
                }
            }
        }
        else {

            /**
             * TODO: You need to apply the same procedure for each RGB channel
             *       based on what you have done for the grayscale version
             */
            var red_histogram = buildHistogram(inputData, "red");
            var Red_minMax = findMinMax(red_histogram, pixelsToIgnore);
//red
            var Red_min = Red_minMax.min;
            var Red_max = Red_minMax.max;
            var red_range = Red_max - Red_min;
//green/////////////////////////////////////////////////////////////
            var green_histogram = buildHistogram(inputData, "green");
            var Green_minMax = findMinMax(green_histogram, pixelsToIgnore);

            var Green_min = Green_minMax.min;
            var Green_max = Green_minMax.max;
            var green_range = Green_max - Green_min;
//blue/////////////////////////////////////////////////////////////////
            var blue_histogram = buildHistogram(inputData, "blue");
            var Blue_minMax = findMinMax(blue_histogram, pixelsToIgnore);

            var Blue_min = Blue_minMax.min;
            var Blue_max = Blue_minMax.max;
            var blue_range = Blue_max - Blue_min;
// proces
            for (var i = 0; i < inputData.data.length; i += 4) {
                // Adjust each channel based on the histogram of each one
                // c = (inputData.data[i] - min) / (max - min) * 255;

                outputData.data[i]     = (inputData.data[i] - Red_min) / (Red_max - Red_min) * 255;
                outputData.data[i + 1] = (inputData.data[i+1] - Green_min) / (Green_max - Green_min) * 255;
                outputData.data[i + 2] = (inputData.data[i+2] - Blue_min) / (Blue_max - Blue_min) * 255;

                if(outputData.data[i]>255){
                    outputData.data[i]=255;
                }
                else if (outputData.data[i]<0){
                    outputData.data[i]=0;
                }
    
                if(outputData.data[i+1]>255){
                    outputData.data[i+1]=255;
                }
                else if (outputData.data[i+1]<0){
                    outputData.data[i+1]=0;
                }
    
                if(outputData.data[i+2]>255){
                    outputData.data[i+2]=255;
                }
                else if (outputData.data[i+2]<0){
                    outputData.data[i+2]=0;
                }
            }
        }
    }

}(window.imageproc = window.imageproc || {}));
