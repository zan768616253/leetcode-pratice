const romanToInt = function(s) {
    let [numberStr, numberIndex] = getNumberGroup(s, s.length - 1, ['I', 'V'], 'IX');
    let [thensStr, thensIndex] = getNumberGroup(s, numberIndex, ['X', 'L'], 'XC');
    let [hundredArray, hundredIndex] = getNumberGroup(s, thensIndex, ['C', 'D'], 'CM');
    let [thusandArray] = getNumberGroup(s, hundredIndex, ['M']);

    const total =  romanToNumber(1, numberStr, 'IV', 'IX', 'V', 'I')
        + romanToNumber(10, thensStr, 'XL', 'XC', 'L', 'X')
        + romanToNumber(100, hundredArray, 'CD', 'CM', 'D', 'C')
        + romanToNumber(1000, thusandArray, 'UNDEFINED', 'UNDEFINED', 'UNDEFINED', 'M');
    return total;
};

const getNumberGroup = function (s, startIndex, accept1, accept2) {
    let group = '';
    let returnIndex = -1;

    for (let i = startIndex; i > -1; i--) {
        const ch = s[i];
        if (accept1.includes(ch)) {
            group = ch + group
        } else if (i - 1 > -1 && `${s[i - 1] + s[i]}` === accept2) {
            group = accept2 + group;
            i--
        } else {
            returnIndex = i;
            break;
        }
    }
    return [group, returnIndex]
};

const romanToNumber = function (base, s, fourth, nineth, fifth, first) {
    let number = 0;
    switch (s) {
        case fourth:
            number = 4;
            break;
        case nineth:
            number = 9;
            break;
        default:
            number = s.includes(fifth) ? 5 : 0;
            number = number + s.split('').filter(item => item === first).length
    }
    return number * base;
};


console.log(romanToInt("IX"));