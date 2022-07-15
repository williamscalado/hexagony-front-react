const scrollToTop = (ref: React.RefObject<any>) => {
  return ref?.current?.scrollIntoView();
}

export const utils = {
  scrollToTop,
};
