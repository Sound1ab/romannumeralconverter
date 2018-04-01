export function createRomanNumeralRegex (negated = false) {
    return new RegExp(`[${negated ? '^' : ''}IVXLCDM]`, 'gi')
}

export function createRegex (value) {
    return new RegExp(value, 'gi');
}

export function testStr (str, regex) {
    return regex.test(str);
}

export function replaceFoundText (str, regex) {
    return str.replace(regex, '');
}

export function checkDescendingValue (arr) {
    return !arr.every((el, i) => {
        return i === 0 || el <= arr[i - 1];
    });
}

function digitLength (digit) {
    return digit.toString().length;
}

// Check if subtractor is being used with an incorrect value
// e.g. without this XCX would be valid, when instead, 100 === C
// This is found by checking if first index is a subtractor,
// if so, the next value cannot be the same length
export function checkNonRepeatingSubtractor (arr) {
    let key = [900, 400, 90, 40, 9, 4];
    if (arr.length <= 1) {
        return false;
    }
    let every = arr.every((arrEl, i) => {
        let flag = true;
        if (arr.length - 1 === i) {
            return flag;
        }
        for (let j = 0; j < key.length; j++) {
            if (arrEl === key[j] && digitLength(arrEl) === digitLength(arr[i + 1])) {
                flag = false;
                break;
            }
        }
        return flag;
    });
    return !every;
}

// 'V','L','D' cannot be repeated more than once
// 'I','X','C','M' cannot be repeated more than 3 times
export function checkRepeatingNumeral (str, values, amount) {
    let array = values.filter(el => {
        let regex = createRegex(`${el}{${amount}}`);
        return testStr(str, regex);
    });
    return array.length > 0;
}