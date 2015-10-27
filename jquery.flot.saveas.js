(function ($) {
    "use strict";

    var options = {
    };

    function callContextMenu(e) {
        var ctxMenu = $('<div id="contextMenu"/>').html('<table  border="0" cellpadding="0" cellspacing="0" style="border: thin solid #808080; cursor: default;" width="100px"><tr><td><div  class="ContextItem">Save image...</div></td></tr></table>');
        var posx = e.clientX +window.pageXOffset +'px'; // Left Position of Mouse Pointer
        var posy = e.clientY + window.pageYOffset + 'px'; // Top Position of Mouse
        ctxMenu.css({
            'position': 'absolute',
            'left': posx,
            'top': posy
        });
        $('body').append(ctxMenu);
        $(ctxMenu)
            .click(function(){
                savePNG();
                closeContextMenu();
            })
            .children('.ContextItem')
            .css({
                'background':'#CCC',
                'color': 'black'
            });
        return false;
    }

    function closeContextMenu() {
        var t = $('#contextMenu');
        if (t) {
            $(t).remove();
        }
    }

    function savePNG() {
        var dataString = surface.element.toDataURL("image/png");
        window.open(dataString.replace("image/png", "image/octet-stream"));
    }

    function init(plot) {
        plot.hooks.processOptions.push(function (plot, options) {
            plot.hooks.bindEvents.push(function (eventHolder) {
                eventHolder.bind("contextmenu", callContextMenu);
                eventHolder.bind("mousedown", closeContextMenu);
            });

            plot.hooks.shutdown.push(function (eventHolder) {
                eventHolder.unbind("contextmenu", callContextMenu);
                eventHolder.unbind("mousedown", closeContextMenu);
            });
        });
    }

    $.plot.plugins.push({
        init: init,
        options: options,
        name: 'saveas',
        version: '1.0.0'
    });
})(jQuery);
