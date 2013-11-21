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
            NEUTRALIZED_MINE = 3;


        var NOT_MARKED = 1,
            FLAG = 2,
            QUESTION_MARK = 3;



        // Set default parameters

        var status = EMPTY,
            unknownStatus = true,
            mark = NOT_MARKED;





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
            isFlaged()

            Is cell marked with flag?
        */
        this.isFlaged = function()
        {
            return (mark == FLAG);
        }



        /**
            isQuestionMarked()

            Is cell market by question mark?
        */
        this.isQuestionMarked = function()
        {
            return (mark == QUESTION_MARK);
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



        /**
            mark(M)

            Mark cell
        */
        this.mark = function(M)
        {
            var marks = {
                not_marked: NOT_MARKED,
                flag: FLAG,
                question_mark: QUESTION_MARK
            }

            mark = marks[M];
        }


    }

})();
