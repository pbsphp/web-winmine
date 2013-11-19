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
            @param field        Field DOM object
        */

        for (var y = 0; y < options.height; ++y) {
            var row = $('<div/>');
            row.addClass('mine-field-row');
            for (var x = 0; x < options.width; ++x) {
                var button = $('<button/>');
                button.addClass('mine-button unpressed');
                button.attr('onclick', 'fieldsController.demine(' + x + ', ' + y + ')');
                button.prop('id', 'mine-button-' + x + '-' + y);
                row.append(button);
            }
            options.field.append(row);
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

            // Table of colors
            // TODO: set right colors
            colors = {
                '0': 'green',
                '1': 'red',
                '2': 'yellow',
                '3': 'red',
                '4': 'blue',
                '5': 'yellow',
                '6': 'green',
                '7': 'blue',
                '8': 'red'
            };


            switch (type) {
            case 'mine':
                button.css('background-image', './images/mine.png');
            break;
            case 'destroyedMine':
                button.css('background-image', './images/destroyed-mine.png');
            break;
            case 'flag':
                button.css('background-image', './images/flag.png');
            break;
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
                button.html('<span>' + type + '</span>');
                button.css('color', colors[type]);
            break;

            case '0':
            case 'none':
            default:
            break;
            }
        }

    }

})();
