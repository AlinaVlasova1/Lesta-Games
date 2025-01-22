import {debounce} from 'lodash';
import React from "react";
export function useDebounce(callback: any, delay: number) {
    const callbackRef = React.useRef(callback)
    React.useLayoutEffect(() => {
        callbackRef.current = callback
    })
    return React.useMemo(
        () => debounce((...args) => callbackRef.current(...args), delay),
        [delay],
    )
}