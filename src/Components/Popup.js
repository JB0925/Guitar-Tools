import React, { useRef, useLayoutEffect } from "react";
import "../CSS/Popup.css";

export default function Popup({ order, isShowing, updateOrder, message }) {
  const popupRef = useRef();

  const hidePopup = () => {
    if (isShowing) {
      
    }

     updateOrder(actualOrder => actualOrder + 1);
  };

  useLayoutEffect(() => {
    const handleDisplay = () => {
      if (!isShowing) {
        setTimeout(() => {
            popupRef.current.style.opacity = "0";
            popupRef.current.style.transition = "opacity 600ms";
          },100);
        
      } else {
          popupRef.current.className = `show${order}`;
          popupRef.current.style.display = "block";
          setTimeout(() => {
            popupRef.current.style.opacity = "1";
            popupRef.current.style.transition = "opacity 1000ms";
          }, 500);
      }
    };

    handleDisplay();
  },[isShowing]);


  return (
    <div className="hide" onClick={hidePopup} ref={popupRef}>
        <p>{message}</p>
    </div>
  );
};