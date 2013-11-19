/**

    FieldsController

    Process user actions

    TODO: good comments


    @author pbsphp
    @email pbsphp@yandex.ru

    19-nov-2013

*/

(function() {

    FieldsController = function(options)
    {
        /**
            Constructor

            Get parameters as hash

            @param width        Width of field
            @param height       Height of field
            @param mines        Number of mines (TODO: maybe in percents?)
            @param field        DOM-object of field
        */


        // Initialize field
        var field = new Field({
            width: options.width,
            height: options.height,
            mines: options.mines,
            field: options.field
        });


        var fieldView = new FieldView({
            width: options.width,
            height: options.height,
            field: options.field
        });




        /**
            recursiveClearEmptyField(x, y)

            Clear some cells after demine
            TODO: Please, rename this shit!

            @param x    X coordinate of cell
            @param y    Y coordinate of cell

            Workaround:
            This method SHOULD validate X and Y in range
        */
        var recursiveClearEmptyField = function(x, y)
        {
            if (x >= 0 && x < options.width && y >= 0 && y < options.height) {

                var cell = field.getCell(x, y)


                // Check cell if needed

                if (cell.statusIsUnknown()) {

                    // Count mines around cell

                    var minesAroundCell = field.countMinesNear(x, y);


                    // Render number of mines around

                    fieldView.renderIn(x, y, minesAroundCell.toString());
                    cell.check();


                    if (minesAroundCell == 0) {

                        // Check cells around

                        for (var dy = y - 1; dy <= y + 1; ++dy)
                            for (var dx = x - 1; dx <= x + 1; ++dx)
                                if (dx != x || dy != y) // Not check self
                                    recursiveClearEmptyField(dx, dy);

                    }
                }
            }
            else {
                // X or Y not in range, ignore
            }
        }





        /**
            demine(X, Y)

            Try to demine cell (X,Y)
            Event called by clicking LMB to cell

            @param x    X coordinate of cell
            @param y    Y coordinate of cell
        */
        this.demine = function(x, y)
        {
            var cell = field.getCell(x, y);


            // If we not click this cell yet

            if (cell.statusIsUnknown()) {

                // If there is mine

                if (cell.isMined()) {
                    alert('OBOSRALSYA');
                }
                else {
                    recursiveClearEmptyField(x, y);
                }


                // Now we know, what has that cell

                cell.check();
            }
            else {
                // Just ignore this click
            }
        }

    }

})();
