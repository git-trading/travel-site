import $ from 'jquery';
import waypoints from '../../../../node_modules/waypoints/lib/noframework.waypoints'; // WTF why this explicit?

class RevealOnScroll {
  constructor(els, offset) {
    this.itemsToReveal = els;
    this.offsetPercentage = offset;
    this.hideInitially();
    this.createWaypoints();
  }

  hideInitially() {
    this.itemsToReveal.addClass("reveal-item");
  }

  createWaypoints() {
    // prevents `this` from updating when looping in the each method
    // anchors the original this so offsetPercentage would remain in context
    var that = this;
    this.itemsToReveal.each(function() {
      // this changes context for every cycle
      // currentItem momentarily assigns the value of this to a variable
      // so waypoints can trigger the handler for every single itemsToReveal
      var currentItem = this;
      console.log(`that.offsetPercentage: ${that.offsetPercentage}, this: ${this}`)
      new Waypoint({
        element: currentItem, // dom element to watch
        handler: function() { // what happens when it gets there
          $(currentItem).addClass('reveal-item--is-visible');
        },
        offset: that.offsetPercentage // offsets where handler triggers, percent from bottom of screen
      });
    });
  }

};

export default RevealOnScroll;
