// Dynamic programming - Bottom up
var coinChange1 = function(coins, amount) {
    const dp = Array(amount).fill(amount + 1);
    dp.unshift(0);
    for (let i = 1; i <= amount; i++) {
        for (let j = 0; j < coins.length; j++) {
            if (coins[j] <= i) {
                const current = dp[i - coins[j]] + 1;
                dp[i] = Math.min(dp[i], current);
            }
        }
    }
    return dp[amount] > amount ? -1 : dp[amount];
};

coinChange1([2], 3)

// Dynamic programming - Top down
var coinChange2 = function(coins, amount) {
    const res = change(coins, amount, Array(amount));
    return res
};

const change = (coins, rem, history) => {
    if (rem < 0) return -1;
    if (rem === 0) return 0;
    if (history[rem - 1]) return history[rem - 1];
    let min = Number.MAX_SAFE_INTEGER;
    for (let i = 0; i < coins.length; i++) {
        const res = change(coins, rem - coins[i], history);
        if (res >= 0 && res < min)
            min = 1 + res;
    }
    history[rem - 1] = (min === Number.MAX_SAFE_INTEGER) ? -1 : min;
    return history[rem - 1];
}

coinChange2([1,2,5], 11)

