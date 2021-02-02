/**
 * @param {number[]} nums
 * @return {number[][]}
 */
const threeSum = function(nums) {
    const results = [];
    nums = nums.sort((a,b) => a - b);

    for (let i = 0; i < nums.length; i++) {
        while(i -1 > -1 && nums[i - 1] === nums[i]) {
            i++
        }
        const num1 = nums[i];
        let m = i + 1;
        let n = nums.length - 1;

        while (n > m) {
            const num2 = nums[m];
            const num3 = nums[n];
            const sum = num1 + num2 + num3;
            if (sum > 0) {
                n--;
                while (nums[n] === nums[n + 1]) {
                    n--;
                }
            } else if (sum < 0) {
                m++;
                while (nums[m] === nums[m -1]) {
                    m++;
                }
            } else {
                results.push([num1, nums[m], nums[n]]);
                m++;
                while (nums[m] === nums[m -1]) {
                    m++;
                }
                n--;
                while (nums[n] === nums[n + 1]) {
                    n--;
                }
            }
        }
    }
    return results;
};

threeSum([-2,0,0,2,2]);