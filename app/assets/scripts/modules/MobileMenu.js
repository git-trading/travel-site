import $ from 'jquery';

class MobileMenu {
  constructor() {
    this.siteHeader = $(".site-header");
    this.menuIcon = $(".site-header__menu-icon");
    this.menuContent = $(".site-header__menu-content");
    // triggered method upon page load if called inside the constructor()
    this.events();
  }

  events() {
    // kailangan ang .bind(this) para ma-retain ang context ng kiniclick
    this.menuIcon.click(this.toggleTheMenu.bind(this));
    console.log(this);
  }
  
  toggleTheMenu() {
    this.menuContent.toggleClass("site-header__menu-content--is-visible");
    this.siteHeader.toggleClass("site-header--is-expanded");
    this.menuIcon.toggleClass("site-header__menu-icon--close-x");
  }

}

export default MobileMenu