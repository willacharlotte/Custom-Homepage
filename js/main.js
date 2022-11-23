const defaultPuzzle = {
    "title": "Error loading daily puzzle",
    "url": null,
    "publish_time": null,
    "fen": "start",
    "pgn": null,
    "image": null
}

let boardObj;
let puzzle;

async function main() {
    puzzle = await fetchDailyPuzzle();

    const puzzleInfoTemplate = Handlebars.compile($('#puzzle-info').html());
    const rendered = puzzleInfoTemplate({
        puzzleUrl: puzzle['url'],
        puzzleTitle: puzzle['title']
    });

    $('#rendered-info').html(rendered);

    minimiseBoard();
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

const minimiseBoard = () => {
    maxiToMini($('.board-sides'));
    maxiToMini($('#header-space'));

    boardObj = initMiniBoard(puzzle['fen']);

    $('.board-b72b1.mini-board').click(maximiseBoard);

    boardObj.resize();
}

const maximiseBoard = () => {
    miniToMaxi($('.board-sides'));
    miniToMaxi($('#header-space'));

    boardObj = initMaxiBoard(puzzle['fen']);

    $('#minimise-cross').click(minimiseBoard);

    boardObj.resize();
}

$(document).ready(main);