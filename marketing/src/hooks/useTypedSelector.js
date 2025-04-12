// hooks/useTypedSelector.js
import { useSelector, shallowEqual } from "react-redux";

// Use shallowEqual for comparison to prevent unnecessary rerenders
const useTypedSelector = (selector) => useSelector(selector, shallowEqual);

export default useTypedSelector;
