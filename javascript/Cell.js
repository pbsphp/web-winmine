/**

    Cell

    Cell object

    TODO: good comments


    @author pbsphp
    @email pbsphp@yandex.ru

    18-nov-2013

*/

(function() {

    Cell = function(options={})
    {
        /**
            Constructor

            Get parameters as hash

            TODO: no parameters needed?
        */


        // States

        var MINED = 1,
            EMPTY = 2,
            NEUTRALIZED_MINE = 3,



        // Set default parameters

        var status = EMPTY,
            unknownStatus = true;





        /**
            isMined()

            Is cell mined?
        */
        this.isMined = function()
        {
            return (status == MINED);
        }


        /**
            isNeutralized()

            Is cell has neutralized mine?
        */
        this.isNeutralized = function()
        {
            return (status == NEUTRALIZED_MINE);
        }


        /**
            statusIsUnknown()

            Is status of cell unknown?
        */
        this.statusIsUnknown = function()
        {
            return unknownStatus;
        }


        /**
            mine()

            Let this cell be mined
        */
        this.mine = function()
        {
            status = MINED;
        }


        /**
            neutralizeMine()

            Let mine be neutralized
        */
        this.neutralizeMine = function()
        {
            status = NEUTRALIZED_MINE;
        }


        /**
            check()

            Check this cell.
            Set status of cell known
        */
        this.check = function()
        {
            unknownStatus = false;
        }

    }

})();
