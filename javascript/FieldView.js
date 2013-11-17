/**

    FieldView

    Renders buttons and icons
    View in MVC

    For Shm13:
    Warning, this class not contains any data about
    field and cells (and should not!).
    Just renders


    @author pbsphp
    @email pbsphp@yandex.ru

    17-nov-2013

*/

(function() {

    FieldView = function(options)
    {
        /**
            Constructor

            Get parameters as hash

            @param width        Field width
            @param height       Field height
        */

        for (var y = 0; y < options.height; ++y) {
            var row = $('<div/>');
            row.addClass('mine-field-row');
            for (var x = 0; x < options.width; ++x) {
                var button = $('<button/>');
                button.addClass('mine-button unpressed');
                button.attr('onclick', 'pressed(' + x + ', ' + y + ')');
                button.attr('id', 'mine-button-' + x + '-' + y);
                row.append(button);
            }
        }



        /**
            renderIn(X, Y, type)

            Renders something in (X,Y) cell

            type can be:
            'mine'                  Renders mine
            'destroyedMine'         Renders destroyed mine
            'flag'                  Renders flag
            'N'                     Renders N digit (0 <= N <= 8)
            'none'                  Renders nothing
        */
        this.renderIn = function(X, Y, type)
        {
            var button = $('#mine-button-' + X + '-' + Y);
            button.removeClass('unpressed');
            button.addClass('pressed');
            button.css('background-color', 'black');
        }

    }

})();
