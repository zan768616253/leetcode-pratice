/*Kadane's algorith*/

var maxSubArray = function(nums) {
    const sums = []
    const maxs = []
    for (let i = 0; i < nums.length; i++) {
        if (i === 0) {
            sums.push(nums[i])
            maxs.push(nums[i])
        } else {
            sums[i] = Math.max(sums[i  -1] + nums[i], nums[i])

            maxs[i] = Math.max(sums[i], maxs[i - 1])
        }
    }
    return maxs[maxs.length - 1]
};

maxSubArray([-2,1,-3,4,-1,2,1,-5,4])
