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
    B, Q, B, Q 
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

/**** Functions ****/
// Integer Integer Board Integer -> Value
// produce the value at the position (i,j)
checkExpect(getValue(0, 0, BD1, 4), false)
checkExpect(getValue(2, 3, BD1, 4), false)
checkExpect(getValue(0, 2, BD4, 4), "Q")
checkExpect(getValue(3, 3, BD6, 4), "Q")
checkExpect(getValue(2, 3, BD6, 4), false)

function getValue(i, j, bd, N) {
    return bd[ijToPos(i,j, N)]
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
    let newBD =  Array.from(bd);
    newBD[ijToPos(i, j, n)] = value
    return newBD
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

function checkExpect(value, expected, isArr=false) {
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