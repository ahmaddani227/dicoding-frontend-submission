import routes from '../routes/routes';
import UrlParser from '../routes/url-parser';
import DrawerInitiator from '../utils/drawer-initiator';

class App {
  constructor({ content, button, navList, navMenu, links }) {
    this._content = content;
    this._button = button;
    this._navList = navList;
    this._navMenu = navMenu;
    this._links = links;
    this._initialAppShell();
  }

  _initialAppShell() {
    DrawerInitiator.init({
      button: this._button,
      navList: this._navList,
      navMenu: this._navMenu,
      links: this._links,
    });
  }

  async renderPage() {
    const url = UrlParser.parseActiveUrlWithCombiner();
    const page = routes[url];
    this._content.innerHTML = await page.render();

    const skipLinkElem = document.querySelector('.skip-to-content');
    skipLinkElem.addEventListener('click', (event) => {
      event.preventDefault();
      document.querySelector('#main-content').scrollIntoView();
      skipLinkElem.blur();
    });

    await page.afterRender();
  }
}

export default App;
