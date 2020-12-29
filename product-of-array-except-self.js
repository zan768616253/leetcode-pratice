var productExceptSelf = function(nums) {
    const left = [];
    const right = [];
    const result = [];

    for (let i = 0; i < nums.length; i++) {
        if (i === 0) {
            left[0] = 1 * nums[0]
        } else {
            left[i] = left[i - 1] * nums[i]
        }
    }

    for (let i = nums.length - 1; i > -1; i--) {
        if (i === nums.length - 1) {
            right[nums.length - 1] = 1 * nums[nums.length - 1]
        } else {
            right[i] = right[i + 1] * nums[i]
        }
    }

    for (let i = 0; i < nums.length; i++) {
        if (i === 0) {
            result[i] = right[1]
        } else if (i === nums.length - 1) {
            result[i] = left[nums.length - 2]
        } else {
            result[i] = left[i - 1] * right[i + 1]
        }
    }
    return result;
};

productExceptSelf([1,2,3,4]);