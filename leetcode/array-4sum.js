var fourSum = function(nums, target) {
    const res = []
    const sorted = nums.sort((a, b) => a - b);

    for (let i = 0; i < sorted.length - 3; i++) {
        const iValue = sorted[i]
        if (i > 0 && iValue === sorted[i - 1])
            continue;

        for (let j = i + 1; j < sorted.length - 2; j++) {
            const jValue = sorted[j]
            if (j > i + 1 && jValue === sorted[j - 1])
                continue;

            let m = j + 1;
            let n = sorted.length - 1;

            while (n > m) {
                const nValue = sorted[n]
                const mValue = sorted[m]
                const sum = iValue + jValue + nValue + mValue;
                if (sum === target) {
                    res.push([sorted[i], sorted[j], sorted[m], sorted[n]])
                    n--;
                    m++
                    while(sorted[m] === sorted[m - 1]) {
                        m++
                    }
                    while(sorted[n] === sorted[n + 1]) {
                        n--;
                    }
                } else if (sum > target) {
                    n--;
                } else {
                    m++
                }

            }
        }
    }

    return res
};

fourSum([-2,-1,-1,1,1,2,2], 0)
