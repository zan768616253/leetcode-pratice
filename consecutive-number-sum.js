// Consecutive Numbers Sum

// 15 = 15 = 8 + 7 = 4 + 5 + 6 = 1 + 2 + 3 + 4 + 5
// N = x1 = x2 + (x2 + 1) + (X2 + 2) + (X2 + 3) + ...
// N = x * k + (1 + 2 + 3 + 4 = ... + k - 1) = kx + k(k + 1)/2 => kx = n + k(k + 1) / 2
// if x = 0 => N = k(k + 1)/2 => max k = square(2N + 1/4) - 1/2


const consecutiveNumbersSum = function(N) {
    let res = 0
    const kMax = Math.floor(Math.sqrt(N * 2 + 1/4) - 1/2)
    for (let i = 0; i <= kMax; i++) {
        if ((N + i * (i + 1) / 2) % i === 0) {
            res ++;
        }
    }
    return res;
}
consecutiveNumbersSum(15)
