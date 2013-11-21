/**

    Game

    Game options, methods, etc

    TODO: good comments


    @author pbsphp
    @email pbsphp@yandex.ru

    21-nov-2013

*/

(function() {

    Game = function()
    {
        /**
            Constructor
        */



        this.levels = {
            easy: {
                width: 9,
                height: 9,
                mines: 10,
                field: field
            },

            medium: {
                width: 16,
                height: 16,
                mines: 40,
                field: field
            },

            hard: {
                width: 30,
                height: 16,
                mines: 99,
                field: field
            }
        };


        // Limits

        var MIN_MINES = 10,
            MIN_WIDTH = 9,
            MIN_HEIGHT = 9,
            MAX_MINES = 667,
            MAX_WIDTH = 30,
            MAX_HEIGHT = 30;



        // Fields controller object

        this.fieldsController = null;


        // Latest options

        this.lastParameters = {};



        /**
            start(parameters)

            Start game with parameters
        */
        this.start = function(options)
        {
            // Save params

            this.lastParameters = options;


            var width = Math.min(
                    Math.max(options.width, MIN_WIDTH), MAX_WIDTH);
            var height = Math.min(
                    Math.max(options.height, MIN_HEIGHT), MAX_HEIGHT);
            var mines = Math.min(
                    Math.max(options.mines, MIN_MINES), MAX_MINES);
            var field = $('#field');


            this.fieldsController = new FieldsController({
                width: width,
                height: height,
                mines: mines,
                field: field
            });

        };



        /**
            restart()

            Quick restart game with latest parameters (or with new)
        */
        this.restart = function()
        {
            options = arguments[0];
            // Stop game if started
            if (this.fieldsController)
                this.fieldsController.stopGame();

            this.start(options || this.lastParameters);
        };


    };

})();
