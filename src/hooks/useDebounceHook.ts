import { useState } from "react";
import { useDebounce } from "react-use";

const useDebounceHook = <T,>(value: T, delay: number = 500) => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useDebounce(() => setDebouncedValue(value), delay, [value]);

    return debouncedValue
}

export default useDebounceHook;