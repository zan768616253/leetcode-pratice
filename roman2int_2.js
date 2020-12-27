const values = {
    "I": 1,
    "V": 5,
    "X": 10,
    "L": 50,
    "C": 100,
    "D": 500,
    "M": 1000,
    "IV": 4,
    "IX": 9,
    "XL": 40,
    "XC": 90,
    "CD": 400,
    "CM": 900
};

const romanToInt = function(s) {
    let total = 0;
    for (let i = 0; i < s.length - 1; i++) {
        const val1 = values[s[i]];
        const val2 = values[s[i + 1]];
        if (val1 < val2) {
            total = total - val1;
        } else {
            total = total + val1;
        }
    }
    total = total + values[s[s.length - 1]];
    return total;
};

console.log(romanToInt("MCMXCIV"));