import React from "react"
import "../CSS/FlashCard.css";

/**
 * FlashCard Component
 * 
 * params: 
 *      - note: the note that is passed to both the h2 on the card and the img alt
 *      - image: the actual card image, which is a note on the staff (treble clef)
 * 
 * Returns:
 *      - a FlashCard component with a short message and an image of a note on the staff.
 */
const FlashCard = ({ note, image }) => {
    return (
        <div className="FlashCard">
            <h2>Can you find the note {note}?</h2>
            <img src={image} alt={note}/>
        </div>
    );
};

export default FlashCard;