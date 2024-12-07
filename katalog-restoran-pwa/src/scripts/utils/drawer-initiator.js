const DrawerInitiator = {
  init({ button, navList, navMenu, links }) {
    button.addEventListener('click', () => {
      this._toggleDrawer(navList, navMenu);
    });

    window.addEventListener('click', (event) => {
      if (event.target === navList) {
        this._closeDrawer(navList, navMenu);
      }
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth > 768) {
        this._resetDrawer(navList, navMenu);
      }
    });

    links.forEach((link) => {
      link.addEventListener('click', () => {
        this._closeDrawer(navList, navMenu);
      });
    });
  },

  _toggleDrawer(navList, navMenu) {
    document.body.style.overflow = navList.classList.contains('active')
      ? 'auto'
      : 'hidden';
    navList.classList.toggle('active');
    navMenu.classList.toggle('active');
  },

  _closeDrawer(navList, navMenu) {
    document.body.style.overflow = 'auto';
    navList.classList.remove('active');
    navMenu.classList.remove('active');
  },

  _resetDrawer(navList, navMenu) {
    document.body.style.overflow = 'auto';
    navList.classList.remove('active');
    navMenu.classList.remove('active');
  },
};

export default DrawerInitiator;
