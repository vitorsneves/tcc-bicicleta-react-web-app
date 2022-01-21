import { useState, useEffect, useLayoutEffect } from 'react';

//---------------------------------------------//

// This hook keeps track of window size.
// It is used to hide some unimportant table columns
// when the window gets too small.
export default function useWindowSize() {
    const [size, setSize] = useState([0, 0]);
    useLayoutEffect(() => {
        function updateSize() {
            setSize([window.innerWidth, window.innerHeight]);
        }
        window.addEventListener('resize', updateSize);
        updateSize();
        return () => window.removeEventListener('resize', updateSize);
    }, []);
    return size;
}