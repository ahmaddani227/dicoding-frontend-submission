const ImgDetailInitiator = {
  init(figureDetail) {
    const imgDetail = figureDetail.querySelector('img');

    figureDetail.addEventListener('click', () => {
      imgDetail.classList.toggle('object-contain');
      imgDetail.classList.toggle('object-cover');
    });
  },
};

export default ImgDetailInitiator;
