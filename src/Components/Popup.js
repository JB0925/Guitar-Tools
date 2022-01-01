import React, { useRef, useLayoutEffect } from "react";
import "../CSS/Popup.css";

/**
 * Popup Component
 * 
 * Purpose: Give the user more information about the Tuner component
 *          and some of its child components
 * 
 * Params: 
 *      -order: A number used to "tell" each Popup when to show, i.e. 
 *              "when your number is called, fade in!"
 *      -isShowing: A boolean that, if true, will tell the component to fade in.
 *                  If false, tells the component to fade out.
 *      -updateOrder: Popup is a controlled component, and updateOrder is
 *                    used to update the state of its parent, and thus "tell"
 *                    the Popup how to react next.
 *      -message: A string, used to load a message for the user to read.
 * 
 * Returns: A "popup" div that fades in and fades out once the user clicks on it.
 * 
 */
export default function Popup({ order, isShowing, updateOrder, message }) {
  const popupRef = useRef();
  
  // Each popup only shows if "isShowing" is true, and "order"
  // for each is a number. When it's number is called (state updated),
  // it will fade in after the previous popup fades out.
  const hidePopup = () => {
    updateOrder(actualOrder => actualOrder + 1);
  };

  useLayoutEffect(() => {
    let timer1;
    let timer2; 
    const handleDisplay = () => {
      if (!isShowing) {
        timer1 = setTimeout(() => {
            popupRef.current.style.opacity = "0";
            popupRef.current.style.transition = "opacity 600ms";
          },100);
        
      } else {
          popupRef.current.className = `show${order}`;
          popupRef.current.style.display = "block";
          timer2 = setTimeout(() => {
            popupRef.current.style.opacity = "1";
            popupRef.current.style.transition = "opacity 1000ms";
          }, 500);
      }
    };

    handleDisplay();
    return () => {
      if (order === 1) clearTimeout(timer1);
      else clearTimeout(timer2);
    };
  },[isShowing, order]);


  return (
    <div className="hide" onClick={hidePopup} ref={popupRef} data-testid="popup">
        <p>{message}</p>
    </div>
  );
};