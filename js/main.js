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
    boardObj = initBoard(true, 'start');
    $('#chess-overlay').click(maximiseBoard);
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

const miniToMaxi = (...elements) => {
    for (let element of elements) {
        element.removeClass('mini');
        element.addClass('maxi');
    }
}

const maxiToMini = (...elements) => {
    for (let element of elements) {
        element.removeClass('maxi');
        element.addClass('mini');
    }
}

const minimiseBoard = () => {
    boardObj.position('start', true);

    setTimeout(() => {
        const overlay = $('#chess-overlay');
        maxiToMini(
            overlay,  $('.board-sides'),
            $('#chessboard'), $('.board-b72b1')
        );
        miniToMaxi($('#header-space'));

        overlay.click(maximiseBoard);
    }, 400)
}

const maximiseBoard = () => {
    miniToMaxi(
        $('#chess-overlay'), $('.board-sides'),
        $('#chessboard'), $('.board-b72b1')
    )
    maxiToMini($('#header-space'));

    $('#minimise-cross').click(minimiseBoard);

    $('#reset-board').click(() => boardObj.position(puzzle['fen'], true));
    $('#clear-board').click(() => boardObj.position('start', true));

    setTimeout(() => boardObj.position(puzzle['fen'], true), 400);
}

$(document).ready(main);