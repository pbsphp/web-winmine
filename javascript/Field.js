/**

    Field

    Field object (singleton?)

    TODO: good comments


    @author pbsphp
    @email pbsphp@yandex.ru

    19-nov-2013

*/

(function() {

    Field = function(options)
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
        this.getCell = function(x, y)
        {
            return cells[y][x];
        };




        /**
            countMinesNear

            Count mines near (X,Y)
        */
        this.countMinesNear = function(x, y)
        {
            var mines = 0;

            // Check every cell around

            for (var dy = y - 1; dy <= y + 1; ++dy)
                for (var dx = x - 1; dx <= x + 1; ++dx)
                    // Ignore self
                    if (dx != x || dy != y)
                        // X and Y in range
                        if (0 <= dx && dx < options.width &&
                            0 <= dy && dy < options.height)
                            // (dx,dy) cell is mined
                            if (cells[dy][dx].isMined())
                                ++mines;

            return mines;
        };



        /**
            mines()

            Return positions of all mines
        */
        this.mines = function()
        {
            var coordinates = [];

            for (var y = 0; y < options.height; ++y)
                for (var x = 0; x < options.width; ++x)
                    if (cells[y][x].isMined())
                        coordinates.push([x, y]);

            return coordinates;
        };



        /**
            onlyMines()

            Returns true if all next cells is mines
        */
        this.onlyMines = function()
        {
            for (var y = 0; y < cells.length; ++y)
                for (var x = 0; x < cells[y].length; ++x)
                    if (cells[y][x].statusIsUnknown() &&
                        !cells[y][x].isMined())
                        return false;

            return true;
        };


    };

})();
