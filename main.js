const defaultPuzzle = {
    "title": "Error loading daily puzzle",
    "url": null,
    "publish_time": null,
    "fen": "start",
    "pgn": null,
    "image": null
}

async function fetchDailyPuzzle() {
    return fetch("https://api.chess.com/pub/puzzle")
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                return defaultPuzzle;
            }
        });
}

const initBoard = (draggable, position = 'start', orientation = 'white') => {
    const config = {
        draggable: draggable,
        position: position,
        orientation: orientation,
        showNotation: false,
        pieceTheme: 'img/chesspieces/geometric/{piece}.png'
    };
    return Chessboard('chessboard', config);
};

const miniToMaxi = (element) => {
    element.removeClass('mini-board');
    element.addClass('maxi-board');
}

const maxiToMini = (element) => {
    element.removeClass('maxi-board');
    element.addClass('mini-board');
}

const initMiniBoard = (position = 'start', orientation = 'white') => {
    const board = initBoard(false, position, orientation);
    maxiToMini($('#chessboard'));
    maxiToMini($('.board-b72b1'));
    return board;
}

const initMaxiBoard = (position = 'start', orientation = 'white') => {
    const board = initBoard(true, position, orientation);
    miniToMaxi($('#chessboard'));
    miniToMaxi($('.board-b72b1'));
    return board;
}

let boardObj;

const minimiseBoard = () => {
    boardObj = initMiniBoard();

    maxiToMini($('#minimise-board'));
    maxiToMini($('#header-space'));

    $('.board-b72b1.mini-board').click(maximiseBoard);

    boardObj.resize();
}

const maximiseBoard = () => {
    boardObj = initMaxiBoard();

    miniToMaxi($('#minimise-board'));
    miniToMaxi($('#header-space'));

    $('#minimise-cross').click(minimiseBoard);

    boardObj.resize();
}

minimiseBoard();