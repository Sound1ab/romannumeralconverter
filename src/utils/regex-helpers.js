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