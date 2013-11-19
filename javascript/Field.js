/**

    Field

    Field object (singleton?)

    TODO: good comments


    @author pbsphp
    @email pbsphp@yandex.ru

    19-nov-2013

*/

(function() {

    Field = function(options={})
    {
        /**
            Constructor

            Get parameters as hash

            @param width        Width of field
            @param height       Height of field
            @param mines        Number of mines (TODO: maybe in percents?)
            @param field        DOM-object of field
        */


        var cells = [];


        // Create field and render buttons

        var fieldView = new FieldView({
            width: options.width,
            height: options.height,
            field: options.field
        });

        for (var y = 0; y < options.height; ++y) {
            cells[y] = [];
            for (var x = 0; x < options.width; ++x) {
                cells[y][x] = new Cell();
            }
        }


        // Mine some cells

        var unminedCells = [];

        for (var y = 0; y < options.height; ++y)
            for (var x = 0; x < options.width; ++x)
                unminedCells.push([x, y]);

        for (var i = 0; i < options.mines; ++i) {
            var R = (Math.random() * unminedCells.length) | 0;

            // Mark cell as mined
            var XY = unminedCells[R];
            cells[XY[1]][XY[0]].mine();

            // Remove from unmineds
            unminedCells.splice(R, 1);
        }





        /**
            getCell(X, Y)

            Return cell by X and Y coordinates
        */
        this.getCell = function(X, Y)
        {
            return cells[Y][X];
        }


        /**
            countMinesNear

            Count mines near (X,Y)
        */
        this.countMinesNear = function(X, Y)
        {
            console.log("MOCK");
            return null;
        }

    }

})();
