const scrollToTop = () => {
	window.scrollTo({
		top: 1,
		behavior: "smooth",
	});
};

export const globalUtil = {
	scrollToTop,
};
