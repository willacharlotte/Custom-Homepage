const initBoard = (position='start', orientation='white') => {
    const config = {
        draggable: true,
        position: position,
        orientation: orientation,
        showNotation: false,
        pieceTheme: 'img/chesspieces/geometric/{piece}.png'
    };
    return Chessboard('chessboard', config);
}

const board = initBoard();