import '../styles/index.scss'

import {
  dom,
  domSetStyles,
  domRemove,
  domShow,
  domHide,
  eventListen
} from './utils'

const ANIMATE_DURATION = 250

const webapp2048 = () => {
  const board = []
  const hasConflicted = []
  const docWidth = document.documentElement.clientWidth

  let score = 0
  let gridConWidth = 0.92 * docWidth
  let cellSideLength = 0.18 * docWidth
  let cellSpace = 0.04 * docWidth

  let startX = 0
  let startY = 0
  let endX = 0
  let endY = 0
  prepareForMobile()
  newgame()

  eventListen(dom('#newGamebtn'), 'click', newgame)

  const $cover = dom('#cover')
  eventListen(dom('#rank'), 'click', () => {
    domShow($cover)
    domShow(dom('#coverList'))
  })
  eventListen($cover, 'click', () => {
    domHide($cover)
    dom('.cover-content').forEach(content => {
      domHide(content)
    })
  })

  function prepareForMobile () {
    if (docWidth > 500) {
      gridConWidth = 500
      cellSpace = 20
      cellSideLength = 100
    }

    const gridCon = dom('#grid-container')
    const gridCells = dom('.grid-cell')

    domSetStyles(gridCon, {
      width: gridConWidth - 2 * cellSpace,
      height: gridConWidth - 2 * cellSpace,
      padding: cellSpace,
      borderRadius: 0.02 * gridConWidth
    })

    gridCells.forEach(cell => {
      domSetStyles(cell, {
        width: cellSideLength,
        height: cellSideLength
      })
    })
  }

  function newgame () {
    init()
    generateOneNumber()
    generateOneNumber()
  }

  function init () {
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        const gridCell = dom('#grid-cell-' + i + '-' + j)
        domSetStyles(gridCell, {
          top: getPosTop(i, j),
          left: getPosLeft(i, j)
        })
      }
    }
    for (let i = 0; i < 4; i++) {
      board[i] = []
      hasConflicted[i] = []
      for (let j = 0; j < 4; j++) {
        board[i][j] = 0
        hasConflicted[i][j] = false
      }
    }
    updateBoardView()
    updateScore(0, false)
  }

  function getPosTop (i, j) {
    return cellSpace + i * (cellSpace + cellSideLength)
  }

  function getPosLeft (i, j) {
    return cellSpace + j * (cellSpace + cellSideLength)
  }

  function updateBoardView () {
    dom('.number-cell').forEach(cell => domRemove(cell))
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        dom('#grid-container').innerHTML += `<div class = "number-cell" id = "number-cell-${i}-${j}"></div>`
        const theNumberCell = dom(`#number-cell-${i}-${j}`)
        if (board[i][j] === 0) {
          domSetStyles(theNumberCell, {
            width: 0,
            height: 0,
            top: getPosTop(i, j) + (cellSideLength / 2),
            left: getPosLeft(i, j) + (cellSideLength / 2)
          })
        } else {
          theNumberCell.innerText = board[i][j]
          domSetStyles(theNumberCell, {
            width: cellSideLength,
            height: cellSideLength,
            top: getPosTop(i, j),
            left: getPosLeft(i, j),
            backgroundColor: getNumberBackgroundColor(board[i][j]),
            color: getNumberColor(board[i][j]),
            lineHeight: cellSideLength
          })
          let fontSize
          if (board[i][j] < 1000 && board[i][j] > 100) {
            fontSize = 0.5 * cellSideLength
          } else if (board[i][j] < 1000) {
            fontSize = 0.6 * cellSideLength
          } else if (board[i][j] > 1000 && board[i][j] < 10000) {
            fontSize = 0.4 * cellSideLength
          } else {
            fontSize = 0.35 * cellSideLength
          }
          domSetStyles(theNumberCell, { fontSize })
        }
        hasConflicted[i][j] = false
      }
    }
  }

  function updateScore (sc, add = true) {
    score = add ? score + sc : sc
    dom('#score').innerText = score
  }

  function getNumberBackgroundColor (number) {
    switch (number) {
      case 2:
        return '#eee4da'
      case 4:
        return '#ede0c8'
      case 8:
        return '#f2b179'
      case 16:
        return '#f59563'
      case 32:
        return '#f67c5f'
      case 64:
        return '#f65e3b'
      case 128:
        return '#edcf72'
      case 256:
        return '#edcc61'
      case 512:
        return '#9c0'
      case 1024:
        return '#33b5e5'
      case 2048:
        return '#09c'
      case 4096:
        return '#a6c'
      case 8192:
        return '#93c'
    }
    return '#8cb6c0'
  }

  function getNumberColor (number) {
    return number <= 4 ? '#776e65' : '#fff'
  }

  function generateOneNumber () {
    if (nospace(board)) return false

    let randx = parseInt(Math.floor(Math.random() * 4))
    let randy = parseInt(Math.floor(Math.random() * 4))
    let times = 0

    while (times < 50) {
      if (board[randx][randy] === 0) {
        break
      }
      randx = parseInt(Math.floor(Math.random() * 4))
      randy = parseInt(Math.floor(Math.random() * 4))
      times++
    }
    if (times === 50) {
      for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
          if (board[i][j] === 0) {
            randx = i
            randy = j
          }
        }
      }
    }

    const randNumber = Math.random() > 0.3 ? 2 : 4
    board[randx][randy] = randNumber
    showNumberWithAnimation(randx, randy, randNumber)

    return true
  }

  function nospace (board) {
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        if (board[i][j] === 0) {
          return false
        }
      }
    }
    return true
  }

  function showNumberWithAnimation (i, j, randNumber) {
    const numberCell = dom(`#number-cell-${i}-${j}`)
    const transtr = ['width', 'height', 'top', 'left'].map(item => {
      return `${item} 0.05s`
    }).join(',')

    domSetStyles(numberCell, {
      width: cellSideLength,
      height: cellSideLength,
      top: getPosTop(i, j),
      left: getPosLeft(i, j),
      color: getNumberColor(randNumber),
      fontSize: 0.6 * cellSideLength,
      lineHeight: cellSideLength,
      backgroundColor: getNumberBackgroundColor(randNumber),
      transition: transtr
    })
    setTimeout(() => {
      numberCell.innerText = randNumber
      domSetStyles(numberCell, {
        transition: ''
      })
    }, 50)
  }

  function showMoveAnimation (fromx, fromy, tox, toy) {
    const numberCell = dom(`#number-cell-${fromx}-${fromy}`)
    const fromTop = getPosTop(fromx, fromy)
    const fromLeft = getPosLeft(fromx, fromy)
    const toTop = getPosTop(tox, toy)
    const toLeft = getPosLeft(tox, toy)
    domSetStyles(numberCell, {
      transform: `translate3d(${toLeft - fromLeft}px, ${toTop - fromTop}px, 0px)`,
      transition: `transform ${ANIMATE_DURATION / 1000}s linear`
    })
  }

  eventListen(document, 'keydown', e => {
    switch (e.keyCode) {
      case 37:
        if (isgameover() || !moveLeft()) return
        break
      case 38:
        if (isgameover() || !moveUp()) return
        break
      case 39:
        if (isgameover() || !moveRight()) return
        break
      case 40:
        if (isgameover() || !moveDown()) return
        break
      default:
        return
    }
    e.preventDefault()
    setTimeout(generateOneNumber, 210)
  })

  const gridContainer = dom('#grid-container')
  eventListen(gridContainer, 'touchstart', e => {
    startX = e.touches[0].pageX
    startY = e.touches[0].pageY
  })
  eventListen(gridContainer, 'touchmove', e => {
    e.preventDefault()
    e.stopPropagation()
  })
  eventListen(gridContainer, 'touchend', e => {
    endX = e.changedTouches[0].pageX
    endY = e.changedTouches[0].pageY

    const deltaX = endX - startX
    const deltaY = endY - startY

    if ((Math.abs(deltaX) < 0.15 * docWidth &&
      Math.abs(deltaY) < 0.15 * docWidth) ||
      isgameover()
    ) {
      return
    }

    if (Math.abs(deltaX) >= Math.abs(deltaY)) {
      if (deltaX > 0) {
        if (moveRight()) {
          setTimeout(generateOneNumber, 210)
        }
      } else {
        if (moveLeft()) {
          setTimeout(generateOneNumber, 210)
        }
      }
    } else {
      if (deltaY > 0) {
        if (moveDown()) {
          setTimeout(generateOneNumber, 210)
        }
      } else {
        if (moveUp()) {
          setTimeout(generateOneNumber, 210)
        }
      }
    }
  })

  function moveLeft () {
    if (!canMoveLeft(board)) return false

    for (let i = 0; i < 4; i++) {
      for (let j = 1; j < 4; j++) {
        if (board[i][j] !== 0) {
          for (let k = 0; k < j; k++) {
            if (board[i][k] === 0 && noBlockHorizontal(i, k, j, board)) {
              showMoveAnimation(i, j, i, k)
              board[i][k] = board[i][j]
              board[i][j] = 0
              break
            } else if (board[i][k] === board[i][j] && noBlockHorizontal(i, k, j, board) && !hasConflicted[i][k]) {
              showMoveAnimation(i, j, i, k)
              board[i][k] += board[i][j]
              board[i][j] = 0
              hasConflicted[i][k] = true
              updateScore(board[i][k])
              break
            }
          }
        }
      }
    }
    setTimeout(updateBoardView, ANIMATE_DURATION)
    return true
  }

  function canMoveLeft (board) {
    for (let i = 0; i < 4; i++) {
      for (let j = 1; j < 4; j++) {
        if (board[i][j] !== 0) {
          if (board[i][j - 1] === 0 || board[i][j - 1] === board[i][j]) {
            return true
          }
        }
      }
    }
    return false
  }

  function moveUp () {
    if (!canMoveUp(board)) return false
    for (let i = 1; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        if (board[i][j] !== 0) {
          for (let k = 0; k < i; k++) {
            if (board[k][j] === 0 && noBlockVertical(j, k, i, board)) {
              showMoveAnimation(i, j, k, j)
              board[k][j] = board[i][j]
              board[i][j] = 0
              break
            } else if (board[k][j] === board[i][j] && noBlockVertical(j, k, i, board) && !hasConflicted[k][j]) {
              showMoveAnimation(i, j, k, j)
              board[k][j] += board[i][j]
              board[i][j] = 0
              updateScore(board[k][j])
              hasConflicted[k][j] = true
              break
            }
          }
        }
      }
    }
    setTimeout(updateBoardView, ANIMATE_DURATION)
    return true
  }

  function canMoveUp (board) {
    for (let i = 1; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        if (board[i][j] !== 0) {
          if (board[i - 1][j] === 0 || board[i - 1][j] === board[i][j]) {
            return true
          }
        }
      }
    }
    return false
  }

  function moveDown () {
    if (!canMoveDown(board)) return false
    for (let i = 2; i >= 0; i--) {
      for (let j = 0; j < 4; j++) {
        if (board[i][j] !== 0) {
          for (let k = 3; k > i; k--) {
            if (board[k][j] === 0 && noBlockVertical(j, i, k, board)) {
              showMoveAnimation(i, j, k, j)
              board[k][j] = board[i][j]
              board[i][j] = 0
              break
            } else if (board[k][j] === board[i][j] && noBlockVertical(j, i, k, board) && !hasConflicted[k][j]) {
              showMoveAnimation(i, j, k, j)
              board[k][j] += board[i][j]
              board[i][j] = 0
              updateScore(board[k][j])
              hasConflicted[k][j] = true
              break
            }
          }
        }
      }
    }
    setTimeout(updateBoardView, ANIMATE_DURATION)
    return true
  }

  function canMoveDown (board) {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 4; j++) {
        if (board[i][j] !== 0) {
          if (board[i + 1][j] === 0 || board[i + 1][j] === board[i][j]) {
            return true
          }
        }
      }
    }
    return false
  }

  function moveRight () {
    if (!canMoveRight(board)) return false
    for (let i = 0; i < 4; i++) {
      for (let j = 2; j >= 0; j--) {
        if (board[i][j] !== 0) {
          for (let k = 3; k > j; k--) {
            if (board[i][k] === 0 && noBlockHorizontal(i, j, k, board)) {
              showMoveAnimation(i, j, i, k)
              board[i][k] = board[i][j]
              board[i][j] = 0
              break
            } else if (board[i][k] === board[i][j] && noBlockHorizontal(i, j, k, board) && !hasConflicted[i][k]) {
              showMoveAnimation(i, j, i, k)
              board[i][k] += board[i][j]
              board[i][j] = 0
              updateScore(board[i][k])
              hasConflicted[i][k] = true
              break
            }
          }
        }
      }
    }
    setTimeout(updateBoardView, ANIMATE_DURATION)
    return true
  }

  function canMoveRight (board) {
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[i][j] !== 0) {
          if (board[i][j + 1] === 0 || board[i][j + 1] === board[i][j]) {
            return true
          }
        }
      }
    }
    return false
  }

  function noBlockHorizontal (row, col1, col2, board) {
    for (let i = col1 + 1; i < col2; i++) {
      if (board[row][i] !== 0) {
        return false
      }
    }
    return true
  }

  function noBlockVertical (col, row1, row2, board) {
    for (let i = row1 + 1; i < row2; i++) {
      if (board[i][col] !== 0) {
        return false
      }
    }
    return true
  }

  function isgameover () {
    if (nospace(board) && nomove(board)) {
      domShow($cover)
      domShow(dom('#gameOver'))
      return true
    } else {
      return false
    }
  }

  function nomove (board) {
    if (canMoveLeft(board) ||
        canMoveRight(board) ||
        canMoveDown(board) ||
        canMoveUp(board)) {
      return false
    }
    return true
  }
}

export default webapp2048
