import { noteFrequencies } from "../Helpers/audioInfo";

/** useTunerIndictatorUpdate Hook
 * 
 * Params: 
 *      - number (type = Number): the number of the TunerIndicator component; used to determine if it will light
 *                                up or not.
 *      
 *      - frequency (type = Number(floating point)): the current frequency value, serves the same purpose as above.
 *      
 *      - noteName (type = String): the current note being played, serves the same purpose as above.
 *      
 *      - styleObject (type = Object): the styleObject to return if the conditionals are met
 * 
 * Returns:
 *      - a function that is used to tell the TunerIndicator components whether or not to "light up" as the tuning
 *        gets closer to the closest note in the noteFrequencies object
 */
const useTunerIndicatorUpdate = (number, frequency, noteName, styleObject) => {
    const { color } = styleObject || "black";
    
    const determineIfFilledIn = () => {
        for (let freqObject of noteFrequencies) {
            if (freqObject[noteName]) {
                if (color === "green" && number === 3) return styleObject;

                else if (frequency < freqObject[noteName]) {
                    if (color === "red" && number === 1) return styleObject;
                    if (color === "yellow" && number <= 2) return styleObject;
                }
                else if (frequency > freqObject[noteName]) {
                    if (color === "red" && number <= 5) return styleObject;
                    if (color === "yellow" && number <= 4) return styleObject;
                };
            }
        };
        return {};
    };

    return [determineIfFilledIn];
};

export default useTunerIndicatorUpdate;