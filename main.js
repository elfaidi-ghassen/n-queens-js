// The N-Queen Problem
// Brute Force approach

/**** Data Defintions ****/
// Value is false | "Q"
// interp: false means blank, "Q" is the queen

// Borad is a monodimensional (Array of Value) of size n x n
// interp. a chess borad that has n x n elements

// Pos is Integer[0, (n * n) -1]
// interp. a position in the array

/**** Primitive Functions ****/
// Integer Integer Integer -> Pos
// produce the a position in the array given i, j and n
checkExpect(ijToPos(0, 0, 4), 0)
checkExpect(ijToPos(1, 1, 4), 5)
checkExpect(ijToPos(2, 3, 4), 11)

function ijToPos(i, j, n) {
    return i * n + j
}

/**** Constants ****/
const B = false // blank
const Q = "Q"
const TEST_ARRAY_MODE = true;
const BD1 = [ // n = 4
    B, B, B, B,
    B, B, B, B,
    B, B, B, B,
    B, B, B, B
]
const BD2 = [ // n = 3
    B, B, B,
    B, B, B,
    B, B, B
]
const BD3 = [ // n = 3
    Q, B, B,
    B, B, B,
    B, B, B
]
const BD4 = [ // n = 4 // valid board
    B, B, Q, B,
    Q, B, B, B,
    B, B, B, Q,
    B, Q, B, B
]

const BD5 = [ // n = 4 // invalid board
    B, B, B, B,
    Q, B, Q, B,
    B, B, B, Q,
    B, Q, B, Q
]
const BD6 = [ // n = 4 // invalid board 
    Q, B, B, B,
    B, B, B, B,
    B, Q, B, B,
    B, B, B, Q
]
const BD7 = [ // n = 5 // invalid board 
    B, B, B, B, B,
    B, B, B, B, B,
    B, B, B, B, B,
    B, B, B, B, B,
    B, B, B, B, B,
    
]
const BD8 = [ // n = 6 // invalid board 
    B, B, B, B, B, B, 
    B, B, B, B, B, B,
    B, B, B, B, B, B,
    B, B, B, B, B, B,
    B, B, B, B, B, B, 
    B, B, B, B, B, B,
    
]

/**** Functions ****/
// Integer Integer Board Integer -> Value
// produce the value at the position (i,j)
checkExpect(getValue(0, 0, BD1, 4), false)
checkExpect(getValue(2, 3, BD1, 4), false)
checkExpect(getValue(0, 2, BD4, 4), "Q")
checkExpect(getValue(3, 3, BD6, 4), "Q")
checkExpect(getValue(2, 3, BD6, 4), false)

function getValue(i, j, bd, N) {
    return bd[ijToPos(i, j, N)]
}


// Value Integer Integer BD Integer -> BD
// produce a updated board with an updated value at (i,j)
checkExpect(
    setValue(B, 2, 1, BD6, 4),
    [
        Q, B, B, B,
        B, B, B, B,
        B, B, B, B,
        B, B, B, Q
    ], TEST_ARRAY_MODE)
checkExpect(
    setValue(Q, 0, 0, BD1, 4),
    [
        Q, B, B, B,
        B, B, B, B,
        B, B, B, B,
        B, B, B, B
    ], TEST_ARRAY_MODE)

function setValue(value, i, j, bd, n) {
    let newBD = Array.from(bd);
    newBD[ijToPos(i, j, n)] = value
    return newBD
}


// there are three components for solving this algorithm
// because we are generating new boards with generative recursion, as an n-ary tree
// and doing backtracking search over it

// Board -> Board | false
// produces a solution to the n-queens problem or false if there's no solution
// assuming that the given board is initially empty
// checkExpect(solveBoard(BD2, 3), false)
// checkExpect(solveBoard([B], 1), [Q], TEST_ARRAY_MODE)
// checkExpect(solveBoard(BD1, 4), BD4, TEST_ARRAY_MODE)


// see README.md page to understand why I structured the function this way
function solveBoard(bd, n) {
    function solveBD(bd) {
        if (OneQueensPerColumn(bd, n)) { // if (trivial condition)
            return bd
        }
        else {
            //generate only valid boards
            return solveLOBD(nextBoards(bd, n)) // bd subs don't exists: we generate them
        }
    }

    function solveLOBD(lobd) { // consumes list of boards
        if (lobd.length == 0) { // we ran out of choice
            return false
        } else {
            const trybd = solveBD(lobd[0]) // return Board or false if it's the solution 
            if (trybd != false) { // it's the solution
                return trybd // return the solution
            } else {
                return solveLOBD(lobd.slice(1)) // return Board or false if solution in the rest of options
            }

        }
    }
    return solveBD(bd)

}


// Board Natural -> Boolean
// produce true if the board is a valid solution and false otherwise
// a board is valid if
// - there's a queen in each column
// - the queens don't attack each others

checkExpect(isValidSolution(BD1, 4), false)
checkExpect(isValidSolution(BD2, 3), false)
checkExpect(isValidSolution(BD3, 3), false)
checkExpect(isValidSolution(BD5, 4), false)
checkExpect(isValidSolution(BD6, 4), false)
checkExpect(isValidSolution(BD4, 4), true)



checkExpect(OneQueensPerColumn(BD1, 4), false)
checkExpect(OneQueensPerColumn(BD5, 4), false)
checkExpect(OneQueensPerColumn(BD4, 4), true)



function OneQueensPerColumn(bd, n) {
    let queenCount;
    for (let i = 0; i < n; i++) {
        queenCount = 0
        for (let j = 0; j < n; j++) {
            if (bd[ijToPos(i, j, n)] == Q) {
                queenCount++
            }
        }
        if (queenCount != 1) {
            return false
        }
    }
    return true
}

function noAttacks(qPositions) {
    for (let i = 0; i < qPositions.length; i++) {
        for (let j = i + 1; j < qPositions.length; j++) {
            if (qPositions[i].x == qPositions[j].x ||
                qPositions[i].y == qPositions[j].y ||
                Math.abs(qPositions[i].x - qPositions[j].x) == Math.abs(qPositions[i].y - qPositions[j].y)
            ) {return false}
        }
    }
    return true
}

// Board Integer -> (Array of Objects)
function getQueensPositions(bd, n) {
    let queensPositions = []
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            if (bd[ijToPos(i, j, n)] == Q) {
                queensPositions.push({x: i, y: j})
            }
        }
    }
    return queensPositions
}


function isValidSolution(bd, n) {
    return OneQueensPerColumn(bd, n) && noAttacks(getQueensPositions(bd, n))
}




// Board -> (Array of Board)
// produce the next boards, or an empty array if there's nothing we can add

function nextBoards(bd, n) {
    let result = []
    let col = firstEmptyColumn(bd, n)
    if (col != -1) {
        for (let i = 0; i < n; i++) {
            let solution = setValue(Q, i, col, bd, n)
            if (noAttacks(getQueensPositions(solution, n))) {
                result.push(solution)
            }
        }
    }
    return result
}


function firstEmptyColumn(bd, n) {
    let empty
    for (let i = 0; i < n; i++) { // i is col
        empty = true
        for (let j = 0; j < n; j++) {
            if (bd[ijToPos(j, i, n)] == Q) {
                empty = false
            }
        }
        if (empty) {
            return i
        }
    }
    return -1
}


function generateEmptyBoard(n) {
    let arr = []
    for (let i = 0; i < n*n; i++) {
        arr.push(B)
    }
    return arr
}

// Example

initVisuals(generateEmptyBoard(4), 4)

document.getElementById("btn").addEventListener("click", function() {
    const N = document.getElementById("in").value
    const EMPTYBD = generateEmptyBoard(N)
    initVisuals(EMPTYBD, N)
    updateVisual(solveBoard(EMPTYBD, N))
})



function initVisuals(bd, n) {
    const BOARD = document.getElementById("bd")
    while (BOARD.childNodes.length != 0) {
        BOARD.childNodes[0].remove()
    }
    BOARD.style.gridTemplateColumns = `repeat(${n}, 60px)`
    let square;
    for (let i = 0; i < bd.length; i++) {
        square = document.createElement("div")
        if (bd[i] == Q) {
            square.classList.add("queen")
        }
        BOARD.appendChild(square)
    }
}

function updateVisual(bd, n) {
    const BOARD = document.getElementById("bd")
    let squares = BOARD.childNodes
    squares.forEach(element => {
        element.classList.remove("queen")
    });
    for (let i = 0; i < bd.length; i++) {
        if (bd[i] == Q) {
            squares[i].classList.add("queen")
        }
    }

}










// testing
function testArray(value, expected) {
    if (value.length != expected.length) {
        return false
    } else {
        for (let i = 0; i < value.length; i++) {
            if (value[i] !== expected[i]) {
                return false
            }
        }
        return true
    }
}

function checkExpect(value, expected, isArr = false) {
    let isValid = true;
    if (!isArr) {
        isValid = value == expected
    } else {
        isValid = testArray(value, expected)
    }
    isValid
        ? console.log("test passed")
        : console.error(`test didn't pass, expected [[${expected}]] but got [[${value}]]`);
}



function printMat(BD, n) {
    let line;
    for (let i = 0; i < n; i++) {
        line = ""
        for (let j = 0; j < n; j++) {
            line += (BD[ijToPos(i, j, n)] === false ? "B" : "Q")
            line += "  "
        }
        console.log(line);

    }
}

// printMat(solveBoard(BD8, 6), 6)
