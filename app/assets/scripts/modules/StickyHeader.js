import $ from 'jquery';
import waypoints from '../../../../node_modules/waypoints/lib/noframework.waypoints';
import smoothScroll from 'jquery-smooth-scroll';

class StickyHeader {
  constructor() {
    this.lazyImages = $('.lazyload');
    this.siteHeader = $('.site-header');
    this.pageSections = $('.page-section');
    this.headerLinks = $('.primary-nav a'); // all link elements in primary-nav
    this.headerTriggerElement = $('.large-hero__title');
    this.createHeaderWaypoint();
    this.createPageSectionWaypoints();
    this.addSmoothScrolling();
    this.refreshWaypoints();
  }

  refreshWaypoints() { // solves the conflict with lazyload
    // as soon as loaded, trigger function
    this.lazyImages.on('load', function() {
      Waypoint.refreshAll();
    });
  }

  addSmoothScrolling() {
    this.headerLinks.smoothScroll({speed:200});
  }

  createHeaderWaypoint() {
    // `that` will point to the original this to 
    // keep the this.siteHeader in the constructor in proper context
    var that = this;
    // console.log(this.headerTriggerElement); // same as below
    // console.log($('.large-hero__title')); // same as above
    new Waypoint({
      element: this.headerTriggerElement[0], // the first item in a jquery object points to the DOM
      handler: function(direction) {
        // `that` will properly point to the original `this` declared in the constructor
        if (direction == 'down') {
          $(that.siteHeader).addClass('site-header--dark');
        } else {
          $(that.siteHeader).removeClass('site-header--dark');
        }
      }
    });
  }

  createPageSectionWaypoints() {
    // `that` is outside the .each method so it remains the same while inside the .each method
    var that = this;
    this.pageSections.each(function() {
      // remember that `this` is assigned to a variable because its
      // context changes for every loop of the .each method
      var currentPageSection = this; // `currentPageSection` is the dom element itself
      // `currentPageSection` is in a different context from `this` when inside the handler function

      // for downward scrollingito ang rules ng pag-match ng header link
      new Waypoint({
        element: currentPageSection,
        // oddly, the handler is only triggered when transitioning to a different pageSection
        handler: function(direction) {
          if (direction == 'down') { 
            // matchingHeaderLink is a DOM element that can be selected with jQuery
            var matchingHeaderLink = currentPageSection.getAttribute('data-matching-link');
            // var matchingHeaderLink = this.element.getAttribute('data-matching-link'); 
            // `this.element` == `currentPageSection` in the handler's context
            // remove all is-current-link class to any of the headerLinks before...
            that.headerLinks.removeClass('is-current-link');
            // ...adding the is-current-link class to the correct one
            $(matchingHeaderLink).addClass('is-current-link');
          } 
        },
        offset: '18%' // of the entire view height
      });

      // for upward scrolling, different offset
      new Waypoint({
        element: currentPageSection,
        // oddly, the handler is only triggered when transitioning to a different pageSection
        handler: function(direction) {
          // for downward scrollingito ang rules ng pag-match ng header link
          if (direction == 'up') { 
            // matchingHeaderLink is a DOM element that can be selected with jQuery
            var matchingHeaderLink = currentPageSection.getAttribute('data-matching-link');
            // var matchingHeaderLink = this.element.getAttribute('data-matching-link'); 
            // `this.element` == `currentPageSection` in the handler's context
            // remove all is-current-link class to any of the headerLinks before...
            that.headerLinks.removeClass('is-current-link');
            // ...adding the is-current-link class to the correct one
            $(matchingHeaderLink).addClass('is-current-link');
          } 
        },
        // offset: 'bottom-in-view' // bottom of element at the bottom of viewport
        offset: function() { // triggers when top of the viewport hits 50% of the element otw up
          return -currentPageSection.clientHeight*0.5
        }
      });
    });
  }

}

export default StickyHeader;