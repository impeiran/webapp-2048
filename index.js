$(function() {
    var board = [];
    var score = 0;
    var hasConflicted = [];

    var docWidth = document.documentElement.clientWidth;
    var gridConWidth = 0.92 * docWidth;
    var cellSideLength = 0.18 * docWidth;
    var cellSpace = 0.04 * docWidth;

    var startX = 0;
    var startY = 0;
    var endX = 0;
    var endY = 0;
    prepareForMobile();
    newgame();
    // test();
    $('#newGamebtn').click(function() {
        newgame();
        return false;
    });

    $('#rank').click(function(){
        $('#cover').show();
        $('#coverList').show();
        return false;
    });

    function test() {
        board[0][0] = 16666;
        updateBoardView();
    }

    function prepareForMobile() {
        if (docWidth > 500) {
            gridConWidth = 500;
            cellSpace = 20;
            cellSideLength = 100;
        }
        $('#grid-container').css('width', gridConWidth - 2 * cellSpace);
        $('#grid-container').css('height', gridConWidth - 2 * cellSpace);
        $('#grid-container').css('padding', cellSpace);
        $('#grid-container').css('border-radius', 0.02 * gridConWidth);

        $('.grid-cell').css('width', cellSideLength);
        $('.grid-cell').css('height', cellSideLength);



    }

    function newgame() {
        init();
        initRankDom();
        generateOneNumber();
        generateOneNumber();
    }

    function init() {
        for (var i = 0; i < 4; i++) {
            for (var j = 0; j < 4; j++) {
                var gridCell = $('#grid-cell-' + i + '-' + j);
                gridCell.css('top', getPosTop(i, j));
                gridCell.css('left', getPosLeft(i, j));
            }
        }
        for (var i = 0; i < 4; i++) {
            board[i] = [];
            hasConflicted[i] = [];
            for (var j = 0; j < 4; j++) {
                board[i][j] = 0;
                hasConflicted[i][j] = false;
            }
        }
        updateBoardView();

        score = 0;
        updateScore(score);
    }

    function initRankDom(){
        var cover = $('#cover');
        cover.click(function(){
            $(this).hide();
            $('#coverList').hide();
        });
    }

    function getPosTop(i, j) {
        return cellSpace + i * (cellSpace + cellSideLength);
    }

    function getPosLeft(i, j) {
        return cellSpace + j * (cellSpace + cellSideLength);
    }

    function updateBoardView() {
        $('.number-cell').remove();
        for (var i = 0; i < 4; i++) {
            for (var j = 0; j < 4; j++) {
                $('#grid-container').append('<div class = "number-cell" id = "number-cell-' + i + '-' + j + '"></div');
                var theNumberCell = $('#number-cell-' + i + '-' + j);
                if (board[i][j] == 0) {
                    theNumberCell.css('width', '0px');
                    theNumberCell.css('height', '0px');
                    theNumberCell.css('top', getPosTop(i, j) + (cellSideLength / 2));
                    theNumberCell.css('left', getPosLeft(i, j) + (cellSideLength / 2));
                } else {
                    theNumberCell.css('width', cellSideLength);
                    theNumberCell.css('height', cellSideLength);
                    theNumberCell.css('top', getPosTop(i, j));
                    theNumberCell.css('left', getPosLeft(i, j));
                    theNumberCell.css('background-color', getNumberBackgroundColor(board[i][j]));
                    theNumberCell.css('color', getNumberColor(board[i][j]));
                    theNumberCell.css('line-height', cellSideLength + 'px');
                    theNumberCell.text(board[i][j]);
                    if(board[i][j] < 1000 && board[i][j] > 100){
                        theNumberCell.css('font-size', 0.5 * cellSideLength + 'px' );
                    }
                    else if(board[i][j] < 1000 ){
                        theNumberCell.css('font-size', 0.6 * cellSideLength + 'px' );
                    }
                    else if (board[i][j] > 1000 && board[i][j] < 10000){
                        theNumberCell.css('font-size', 0.4 * cellSideLength + 'px' );
                    }
                    else{
                        theNumberCell.css('font-size', 0.35 * cellSideLength + 'px' );
                    }
                }
                hasConflicted[i][j] = false;
            }
        }
        

    }

    function updateScore(score) {
        $('#score').text(score);
    }

    function getNumberBackgroundColor(number) {
        switch (number) {
            case 2:
                return '#eee4da';
                break;
            case 4:
                return '#ede0c8';
                break;
            case 8:
                return '#f2b179';
                break;
            case 16:
                return '#f59563';
                break;
            case 32:
                return '#f67c5f';
                break;
            case 64:
                return '#f65e3b';
                break;
            case 128:
                return '#edcf72';
                break;
            case 256:
                return '#edcc61';
                break;
            case 512:
                return '#9c0';
                break;
            case 1024:
                return '#33b5e5';
                break;
            case 2048:
                return '#09c';
                break;
            case 4096:
                return '#a6c';
                break;
            case 8192:
                return '#93c';
                break;
        }
        return '#8cb6c0';
    }

    function getNumberColor(number) {
        if (number <= 4) {
            return '#776e65';
        }
        return '#fff';
    }

    function generateOneNumber() {
        if (nospace(board)) {
            return false;
        }
        var randx = parseInt(Math.floor(Math.random() * 4));
        var randy = parseInt(Math.floor(Math.random() * 4));

        var times = 0;

        while (times < 50) {
            if (board[randx][randy] == 0) {
                break;
            }
            randx = parseInt(Math.floor(Math.random() * 4));
            randy = parseInt(Math.floor(Math.random() * 4));
            times++;
        }
        if (times == 50) {
            for (var i = 0; i < 4; i++) {
                for (var j = 0; j < 4; j++) {
                    if (board[i][j] == 0) {
                        randx = i;
                        randy = j;
                    }
                }
            }
        }

        var randNumber = Math.random() > 0.3 ? 2 : 4;

        board[randx][randy] = randNumber;
        showNumberWithAnimation(randx, randy, randNumber);
        return true;
    }

    function nospace(board) {
        for (var i = 0; i < 4; i++) {
            for (var j = 0; j < 4; j++) {
                if (board[i][j] == 0) {
                    return false
                }
            }
        }
        return true;
    }

    function showNumberWithAnimation(i, j, randNumber) {
        var numberCell = $('#number-cell-' + i + '-' + j);

        numberCell.css('background-color', getNumberBackgroundColor(randNumber));
        numberCell.css('color', getNumberColor(randNumber));
        numberCell.css('font-size', 0.6 * cellSideLength + 'px' );
        numberCell.css('line-height',cellSideLength + 'px')
        numberCell.text(randNumber);
        numberCell.animate({
            width: cellSideLength,
            height: cellSideLength,
            top: getPosTop(i, j),
            left: getPosLeft(i, j)
        }, 50);
    }

    function showMoveAnimation(fromx, fromy, tox, toy) {
        var numberCell = $('#number-cell-' + fromx + '-' + fromy);
        numberCell.animate({
            top: getPosTop(tox, toy),
            left: getPosLeft(tox, toy)
        }, 200);
    }

    $(document).keydown(function(e) {

        switch (e.keyCode) {
            case 37:
                e.preventDefault();
                isgameover();
                if (moveLeft()) {
                    setTimeout(generateOneNumber, 210);
                }
                break;
            case 38:
                e.preventDefault();
                isgameover();
                if (moveUp()) {
                    setTimeout(generateOneNumber, 210);
                }
                break;
            case 39:
                e.preventDefault();
                isgameover();
                if (moveRight()) {
                    setTimeout(generateOneNumber, 210);
                }
                break;
            case 40:
                e.preventDefault();
                isgameover();
                if (moveDown()) {
                    setTimeout(generateOneNumber, 210);
                }
                break;
            default:
                break;
        }
    });

    $('#grid-container')[0].addEventListener('touchstart', function(e) {
        startX = e.touches[0].pageX;
        startY = e.touches[0].pageY;
    });
    $('#grid-container')[0].addEventListener('touchmove', function(e) {
        e.preventDefault();
        e.stopPropagation();
    });
    $('#grid-container')[0].addEventListener('touchend', function(e) {
        endX = e.changedTouches[0].pageX;
        endY = e.changedTouches[0].pageY;

        var deltaX = endX - startX;
        var deltaY = endY - startY;

        if (Math.abs(deltaX) < 0.15 * docWidth && Math.abs(deltaY) < 0.15 * docWidth) {
            return;
        }

        isgameover();

        if (Math.abs(deltaX) >= Math.abs(deltaY)) {
            if (deltaX > 0) {
                if (moveRight()) {
                    setTimeout(generateOneNumber, 210);
                }
            } else {
                if (moveLeft()) {
                    setTimeout(generateOneNumber, 210);
                }
            }
        } else {
            if (deltaY > 0) {
                if (moveDown()) {
                    setTimeout(generateOneNumber, 210);
                }
            } else {
                if (moveUp()) {
                    setTimeout(generateOneNumber, 210);
                }
            }
        }
    });

    function moveLeft() {
        if (!canMoveLeft(board)) {
            return false;
        }
        for (var i = 0; i < 4; i++) {
            for (var j = 1; j < 4; j++) {
                if (board[i][j] != 0) {
                    for (var k = 0; k < j; k++) {
                        if (board[i][k] == 0 && noBlockHorizontal(i, k, j, board)) {
                            showMoveAnimation(i, j, i, k);
                            board[i][k] = board[i][j];
                            board[i][j] = 0;
                            continue;
                        } else if (board[i][k] == board[i][j] && noBlockHorizontal(i, k, j, board) && !hasConflicted[i][k]) {
                            showMoveAnimation(i, j, i, k);
                            board[i][k] += board[i][j];
                            board[i][j] = 0;
                            score += board[i][k];
                            updateScore(score);
                            hasConflicted[i][k] = true;
                            continue;
                        }
                    }
                }
            }
        }
        setTimeout(updateBoardView, 200);
        return true;
    }

    function canMoveLeft(board) {
        for (var i = 0; i < 4; i++) {
            for (var j = 1; j < 4; j++) {
                if (board[i][j] != 0) {
                    if (board[i][j - 1] == 0 || board[i][j - 1] == board[i][j]) {
                        return true;
                    }
                }
            }
        }
        return false;
    }

    function moveUp() {
        if (!canMoveUp(board)) {
            return false;
        }
        for (var i = 1; i < 4; i++) {
            for (var j = 0; j < 4; j++) {
                if (board[i][j] != 0) {
                    for (var k = 0; k < i; k++) {
                        if (board[k][j] == 0 && noBlockVertical(j, k, i, board)) {
                            showMoveAnimation(i, j, k, j);
                            board[k][j] = board[i][j];
                            board[i][j] = 0;
                            continue;
                        } else if (board[k][j] == board[i][j] && noBlockVertical(j, k, i, board) && !hasConflicted[k][j]) {
                            showMoveAnimation(i, j, k, j);
                            board[k][j] += board[i][j];
                            board[i][j] = 0;
                            score += board[k][j];
                            updateScore(score);
                            hasConflicted[k][j] = true;
                            continue;
                        }
                    }
                }
            }
        }
        setTimeout(updateBoardView, 200);
        return true;
    }

    function canMoveUp(board) {
        for (var i = 1; i < 4; i++) {
            for (var j = 0; j < 4; j++) {
                if (board[i][j] != 0) {
                    if (board[i - 1][j] == 0 || board[i - 1][j] == board[i][j]) {
                        return true;
                    }
                }
            }
        }
        return false;
    }

    function moveDown() {
        if (!canMoveDown(board)) {
            return false;
        }
        for (var i = 2; i >= 0; i--) {
            for (var j = 0; j < 4; j++) {
                if (board[i][j] != 0) {
                    for (var k = 3; k > i; k--) {
                        if (board[k][j] == 0 && noBlockVertical(j, i, k, board)) {
                            showMoveAnimation(i, j, k, j);
                            board[k][j] = board[i][j];
                            board[i][j] = 0;
                            continue;
                        } else if (board[k][j] == board[i][j] && noBlockVertical(j, i, k, board) && !hasConflicted[k][j]) {
                            showMoveAnimation(i, j, k, j);
                            board[k][j] += board[i][j];
                            board[i][j] = 0;
                            score += board[k][j];
                            updateScore(score);
                            hasConflicted[k][j] = true;
                            continue;
                        }
                    }
                }
            }
        }
        setTimeout(updateBoardView, 200);
        return true;
    }

    function canMoveDown(board) {
        for (var i = 0; i < 3; i++) {
            for (var j = 0; j < 4; j++) {
                if (board[i][j] != 0) {
                    if (board[i + 1][j] == 0 || board[i + 1][j] == board[i][j]) {
                        return true;
                    }
                }
            }
        }
        return false;
    }

    function moveRight() {
        if (!canMoveRight(board)) {
            return false;
        }
        for (var i = 0; i < 4; i++) {
            for (var j = 2; j >= 0; j--) {
                if (board[i][j] != 0) {
                    for (var k = 3; k > j; k--) {
                        if (board[i][k] == 0 && noBlockHorizontal(i, j, k, board)) {
                            showMoveAnimation(i, j, i, k);
                            board[i][k] = board[i][j];
                            board[i][j] = 0;
                            continue;
                        } else if (board[i][k] == board[i][j] && noBlockHorizontal(i, j, k, board) && !hasConflicted[i][k]) {
                            showMoveAnimation(i, j, i, k);
                            board[i][k] += board[i][j];
                            board[i][j] = 0;
                            score += board[i][k];
                            updateScore(score);
                            hasConflicted[i][k] = true;
                            continue;
                        }
                    }
                }
            }
        }
        setTimeout(updateBoardView, 200);
        return true;
    }

    function canMoveRight(board) {
        for (var i = 0; i < 4; i++) {
            for (var j = 0; j < 3; j++) {
                if (board[i][j] != 0) {
                    if (board[i][j + 1] == 0 || board[i][j + 1] == board[i][j]) {
                        return true;
                    }
                }
            }
        }
        return false;
    }

    function noBlockHorizontal(row, col1, col2, board) {
        for (var i = col1 + 1; i < col2; i++) {
            if (board[row][i] != 0) {
                return false;
            }
        }
        return true;
    }

    function noBlockVertical(col, row1, row2, board) {
        for (var i = row1 + 1; i < row2; i++) {
            if (board[i][col] != 0) {
                return false;
            }
        }
        return true;
    }

    function isgameover() {
        if (nospace(board) && nomove(board)) {
            alert('Game Over');
        }
    }

    function nomove(board) {
        if (canMoveLeft(board) ||
            canMoveRight(board) ||
            canMoveDown(board) ||
            canMoveUp(board)) {
            return false;
        }
        return true;
    }
});