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
            if (response.ok){
                return response.json();
            } else {
                return defaultPuzzle;
            }
        });
}


const initStaticBoard = (position='start', orientation='white') => {
    const config = {
        draggable: true,
        position: position,
        orientation: orientation,
        showNotation: false,
        pieceTheme: 'img/chesspieces/geometric/{piece}.png'
    };
    return Chessboard('chessboard', config);
}

const board = initStaticBoard();