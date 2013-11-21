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


        // Render buttons

        options.field.html('');         // Clear after previous round

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



        // Clear dials

        $('#timer').html('000');


        // Seconds after start

        var time = 0;

        var timer = null;


        // Set normal face

        $('#face').css('background-image', 'url(./images/face-normal.png)');



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
                button.css('background-image', 'url(./images/mine.png)');
            break;
            case 'destroyedMine':
                button.css('background-image', 'url(./images/destroyed-mine.png)');
            break;
            case 'flag':
                button.css('background-image', 'url(./images/flag.png)');
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




        /**
            startTimer()

            Start count seconds after start (if timer not started yet)

            TODO: use background workers (?)
        */
        this.startTimer = function()
        {
            if (timer)
                return;

            timer = setInterval(function() {
                ++time;

                // Get three last digits (within zeros)
                var stime = '';
                for (var i = 3; i > 0; --i) {
                    stime += ((time / Math.pow(10, i - 1)) % 10) | 0;
                }
                $('#timer').html(stime);
            }, 1000);
        }


        /**
            stopTimer()

            Stop count seconds after start
        */
        this.stopTimer = function()
        {
            clearInterval(timer);
        }



        /**
            setFace(face)

            Change smile on button
        */
        this.setFace = function(face)
        {
            var button = $('#face');

            var faces = {
                normal: 'url(./images/face-normal.png)',
                scared: 'url(./images/face-scared.png)',
                dead:   'url(./images/face-dead.png)',
                winner: 'url(./images/face-winner.png)',
            }

            button.css('background-image', faces[face]);
        }



        /**
            showMines(positions)

            Render mines
        */
        this.showMines = function(coordinates)
        {
            for (var i = 0; i < coordinates.length; ++i) {
                var x = coordinates[i][0];
                var y = coordinates[i][1];

                $('#mine-button-' + x + '-' + y)
                    .removeClass('unpressed')
                    .addClass('pressed');

                this.renderIn(x, y, 'mine');
            }
        }



        /**
            red(x, y)

            Set cell background red
        */
        this.red = function(x, y)
        {
            $('#mine-button-' + x + '-' + y).css('background-color', 'red');
        }

    }

})();
