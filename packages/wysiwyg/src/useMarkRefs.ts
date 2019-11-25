import { createRef, RefObject, useRef } from "react";

const useMarkRefs = () => {
  const markRefs = useRef<
    Record<string, Record<string, RefObject<HTMLElement>>>
  >({});
  const setMarkRef = (key: string, mark: string) => {
    !markRefs.current[key] && (markRefs.current[key] = { [mark]: createRef() });
    !markRefs.current[key][mark] && (markRefs.current[key][mark] = createRef());
    return markRefs.current[key][mark];
  };

  return { markRefs, setMarkRef };
};

export default useMarkRefs;
