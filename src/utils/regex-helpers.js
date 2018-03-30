export function createRomanNumeralRegex ({negated = false} = {}) {
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
    console.log(arr);
    return arr.every((x, i) => {
        console.log(i)
        console.log(arr[i])
        // console.log(x >= arr[i - 1]);
        return x >= arr[i - 1];
    });
}

export function checkRepeatingNumeral (str, values, amount) {
    let array = values.filter(el => {
        let regex = createRegex(`${el}{${amount}}`);
        return testStr(str, regex);
    });
    return array.length > 0;
}