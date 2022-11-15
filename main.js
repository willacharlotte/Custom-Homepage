//
// const chess = new Chess()
// while (!chess.game_over()) {
//     const moves = chess.moves()
//     const move = moves[Math.floor(Math.random() * moves.length)]
//     chess.move(move)
// }
// console.log(chess.pgn())

const chessboardConfig = {
    draggable: true,
    position: 'start'
}

const board = Chessboard('chessboard', chessboardConfig);
