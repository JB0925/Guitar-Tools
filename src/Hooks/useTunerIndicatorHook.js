import { noteFrequencies } from "../Helpers/audioInfo";

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
                    if (color === "red") return styleObject;
                    if (color === "yellow" && number <= 4) return styleObject;
                };
            }
        };
        return {};
    };

    return [determineIfFilledIn];
};

export default useTunerIndicatorUpdate;