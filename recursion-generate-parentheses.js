class Parenthesis {
    constructor(n) {
        this.num = n;
        this.cases = []
    }

    generate() {
        this._addParenthesis(this.num - 1, this.num, '(')
        return this.cases
    }

    _addParenthesis(m, n, current) {
        if (m === 0) {
            for(let i = 0; i < n; i++) {
                current += ')'
            }
            this.cases.push(current)
            return;
        }

        if (m < n) {
            this._addParenthesis(m - 1, n, current + '(')
            this._addParenthesis(m, n - 1, current + ')')
        } else {
            this._addParenthesis(m - 1, n, current + '(')
        }
    }
}

var generateParenthesis = function(n) {
    const p = new Parenthesis(n);
    return p.generate()
};

generateParenthesis(4)
