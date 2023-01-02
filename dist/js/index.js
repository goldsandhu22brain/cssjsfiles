(function() {
  $(function() {
    var win;
    win = $(window);
    return win.scroll(function() {
      return $('.alpha .content').css({
        'margin-top': document.body.scrollTop * 1.5
      })({
        'opcity': document.body.scrollTop / $(window).height()
      });
    });
  });

}).call(this);