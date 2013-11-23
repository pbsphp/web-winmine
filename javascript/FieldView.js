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
                var button = $('<div/>')
                    .addClass('mine-button unpressed')
                    .attr('onclick',
                        'game.fieldsController.demine(' + x + ', ' + y + ')')
                    .attr('oncontextmenu',
                        'game.fieldsController.mark(' + x + ', ' + y + ');\
                        return false')
                    .prop('id', 'mine-button-' + x + '-' + y);

                row.append(button);
            }
            options.field.append(row);
        }



        // Clear dials

        $('#timer').html('000');
        $('#number_of_mines').html('000');


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


            // Table of colors
            // TODO: set right colors
            colors = {
                '0': '#000000',
                '1': '#0000ff',
                '2': '#008000',
                '3': '#ff0000',
                '4': '#000080',
                '5': '#800000',
                '6': '#008080',
                '7': '#000000',
                '8': '#808080'
            };


            switch (type) {
            case 'mine':
                button.removeClass('unpressed').addClass('pressed');
                button.css('background-image', 'url(./images/mine.png)');
            break;
            case 'destroyedMine':
                button.removeClass('unpressed').addClass('pressed');
                button.css('background-image', 'url(./images/destroyed-mine.png)');
            break;
            case 'flag':
                button.css('background-image', 'url(./images/flag.png)');
            break;
            case 'question_mark':
                button.css('background-image', 'url(./images/question_mark.png)');
            break;

            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
                button.removeClass('unpressed').addClass('pressed');
                button.html('<span>' + type + '</span>');
                button.css('color', colors[type]);
            break;

            case '0':
                button.removeClass('unpressed').addClass('pressed');
                // No break needed here
            case 'none':
            default:
                button.html('');
                button.css('background-image', 'none');
            break;
            }
        };




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
        };



        /**
            stopTimer()

            Stop count seconds after start
        */
        this.stopTimer = function()
        {
            clearInterval(timer);
        };



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
                winner: 'url(./images/face-winner.png)'
            };

            button.css('background-image', faces[face]);
        };



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
        };



        /**
            red(x, y)

            Set cell background red
        */
        this.red = function(x, y)
        {
            $('#mine-button-' + x + '-' + y).css('background-color', 'red');
        };




        /**
            setNumberOfMines(N)

            Set number of mines in mines counter
        */
        this.setNumberOfMines = function(N)
        {
            var sNumberOfMines = '';

            if (N >= 0) {
                // Get three last digits (within zeros)
                for (var i = 3; i > 0; --i) {
                    sNumberOfMines += ((N / Math.pow(10, i - 1)) % 10) | 0;
                }
            }
            else {
                // Get two last digits (within zeros)
                sNumberOfMines = '-';
                for (var i = 2; i > 0; --i) {
                    sNumberOfMines += ((-N / Math.pow(10, i - 1)) % 10) | 0;
                }
            }

            $('#number_of_mines').html(sNumberOfMines);
        }

    };

})();
// Nikolay is gay
