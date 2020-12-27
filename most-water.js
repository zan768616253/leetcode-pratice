/**
 * @param {number[]} height
 * @return {number}
 */
const maxArea = function(height) {
    const jStart = height.length - 1;
    let max = 0;

    for (let i = 0; i < height.length - 1; i++) {
        let jHeight = height[jStart];
        let area = 0;
        area = (jStart - i) * Math.min(height[i], jHeight);
        max = Math.max(area, max);
        for (let j = jStart - 1; j > i; j--) {
            if (height[j] > jHeight) {
                jHeight = height[j];
                area = (j - i) * Math.min(jHeight, height[i]);
                max = Math.max(area, max);
            }
        }
    }

    return max;
};

const max = maxArea([1,8,6,2,5,4,8,3,7]);
