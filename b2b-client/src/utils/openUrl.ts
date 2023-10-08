const openUrl = (url: string, target?: string) => {
  window.open(url, target || "_blank");
};

export default openUrl;
