import React, { useState } from 'react';


export default function SavedNotifier(props) {

    function hide(){
        // Re-hide again
        setTimeout(() => props.setSaved(false), 2500);        
    }

    return (
        <>
          {props.saved && (
            hide(),
            <div>
              <p className='opacity-100 transition-opacity duration-1000 ease-in-out animate-pulse animate-bounce text-succes'> 
                {props.text} 
            </p>
            </div>
        )}</>
    );
    }