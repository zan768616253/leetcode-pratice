const rotate = function(matrix) {
    const n = matrix.length;

    // transpose matrix
    for (let i = 0; i < n; i++) {
        for (let j = i; j < n; j++) {
            const tmp = matrix[j][i];
            matrix[j][i] = matrix[i][j];
            matrix[i][j] = tmp;
        }
    }
    // reverse each row
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n / 2; j++) {
            const tmp = matrix[i][j];
            matrix[i][j] = matrix[i][n - j - 1];
            matrix[i][n - j - 1] = tmp;
        }
    }
};

rotate([[1,2,3],[4,5,6],[7,8,9]]);