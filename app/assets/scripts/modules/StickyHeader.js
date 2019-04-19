import $ from 'jquery';
import waypoints from '../../../../node_modules/waypoints/lib/noframework.waypoints';

class StickyHeader {
  constructor() {
    this.siteHeader = $('.site-header');
    this.siteLogo = $('.site-header__logo');
    this.headerTriggerElement = $('.large-hero__title');
    this.createHeaderWaypoint();
  }

  createHeaderWaypoint() {
    // `that` will point to the original this to 
    // keep the siteHeader in the constructor in proper context
    var that = this;
    new Waypoint({
      element: this.headerTriggerElement[0], // the first item in a jquery object points to the DOM
      handler: function(direction) {
        // `that` will properly point to the original `this` declared in the constructor
        if (direction == 'down') {
          $(that.siteHeader).addClass('site-header--dark');
          $(that.siteLogo).addClass('site-header__logo--small')
        } else {
          $(that.siteHeader).removeClass('site-header--dark');
          $(that.siteLogo).removeClass('site-header__logo--small')
        }
      }
    });
  }
}

export default StickyHeader;