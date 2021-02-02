// class AutocompleteSystem {
//     constructor(sentences, times) {
//         this.items = []
//         for (let i = 0; i < times.length; i++) {
//             this.items.push({
//                 key: sentences[i],
//                 value: times[i]
//             })
//         }
//         this._sortDict();
//
//         this.text = '';
//     }
//
//     input(c) {
//         let result = []
//         if (c === '#') {
//             const index = this.items.findIndex(i => i.key === this.text)
//             if(index > -1) {
//                 this.items[index].value += 1
//             } else {
//                 this.items.push({
//                     key: this.text,
//                     value: 1
//                 })
//             }
//
//             this.text = ''
//             result = []
//             this._sortDict()
//         } else {
//             this.text += c;
//             for (let i = 0; i < this.items.length; i++) {
//                 if (this.items[i].key.startsWith(this.text)) {
//                     if (result.length <= 3) {
//                         result.push(this.items[i].key)
//                         if (result.length === 3) break;
//                     }
//                 }
//             }
//         }
//
//         return result;
//     }
//
//     _sortDict() {
//         this.items.sort((a, b) => {
//             if (a.value > b.value) {
//                 return -1;
//             } else if (b.value > a.value) {
//                 return 1;
//             }
//             if (a.key < b.key) {
//                 return -1;
//             }
//             return 1;
//         })
//     }
// }

class AutocompleteSystem {
    constructor(sentences, times) {
        this.sentences = sentences;
        this.times = times;
        this.trie = new Node('#');
        this.startNode = undefined; // track last node for input letter
        this.term = ''; // current search term for rank updates
        this.hotMap = new Map(); // { sentence => times } for compound sorting
        this.buildTrie();
        this.buildHotMap();
    }

    // builds trie for given sentences, end of sentence will record times. a complete sentence is times !== undefined.
    buildTrie() {
        for(let i = 0; i < this.sentences.length; i++) {
            let sentence = this.sentences[i];
            let prevNode = this.trie;
            for(let letter of sentence) {
                let node;
                if(prevNode.children.get(letter) === undefined) {
                    node = new Node(letter);
                    prevNode.children.set(letter, node);
                } else {
                    node = prevNode.children.get(letter);
                }

                prevNode = node;
            }

            prevNode.times = this.times[i];
        }
    }

    buildHotMap() {
        for(let i = 0; i < this.sentences.length; i++) {
            let sentence = this.sentences[i];
            this.hotMap.set(sentence, this.times[i]);
        }
    }

    // search using backtrack dfs from last valid startNode in search term
    search(letter) {
        if(this.startNode === undefined) this.startNode = this.trie;

        if(this.startNode.children.has(letter)) {
            // track last input letter
            this.startNode = this.startNode.children.get(letter);
            let results = this.backtrack(this.startNode);
            return results.map(item => `${this.term}${item}`);
        } else {
            this.insert(letter);
            return [];
        }
    }

    // insert letter to this.startNode, advance this.startNode
    insert(letter) {
        if(letter === '#') {
            // new search started
            // stamp last startNode
            if(this.startNode.times === undefined) {
                this.startNode.times = 1;
            } else {
                this.startNode.times++;
            }

            // add to hotMap
            this.hotMap.set(this.term, this.startNode.times);

            // reset startNode to root for new search
            this.startNode = this.trie;
        } else {
            // word does not exist, create new search space trie branch for new potential words
            let node = new Node(letter);
            this.startNode.children.set(letter, node);

            // track last letter
            this.startNode = node;
        }
    }

    // backtrack dfs
    backtrack(node, phrase = [], results = []) {
        if(node.times !== undefined) {
            results.push(phrase.slice().join(''));
        }

        for(let child of node.children.values()) {
            // place
            phrase.push(child.val);

            // explore
            this.backtrack(child, phrase, results);

            // backtrack
            phrase.pop();
        }

        return results;
    }

    // debug method to print trie
    printTrie(node, results = []) {
        if(node === undefined) return;
        results.push([node.val, node.times]);
        let children = Array.from(node.children.values());
        for(let child of children) {
            this.printTrie(child, results);
        }

        return results;
    }

    input(c) {
        if(c !== '#') {
            this.term += c;
        }

        // all results
        let results = this.search(c);

        // reset term if new search
        if(c === '#') {
            this.term = '';
        }

        // map hot results
        let hotResults = results.map(item => {
            return { sentence: item, times: this.hotMap.get(item) }
        });

        // compound sort and slice top 3
        let rankedResults = hotResults.sort((a, b) => {
            // descend times
            if(a.times > b.times) return -1;
            if(a.times < b.times) return 1;

            // ascend lex
            if(a.sentence > b.sentence) return 1;
            if(a.sentence < b.sentence) return -1;

            // tie
            return 0;
        }).map(item => item.sentence).slice(0, 3);

        return rankedResults;
    }
}

class Node {
    constructor(val) {
        this.val = val;
        this.children = new Map(); // val => new Node(val)
        this.times = undefined;
    }
}

const helper = new AutocompleteSystem(["i love you", "island","ironman", "i love leetcode"], [5,3,2,2])
console.log(helper.input('i'))
console.log(helper.input(' '))
console.log(helper.input('a'))
console.log(helper.input('#'))
console.log(helper.input('i'))
console.log(helper.input(' '))
console.log(helper.input('a'))
console.log(helper.input('#'))
console.log(helper.input('i'))
console.log(helper.input(' '))
console.log(helper.input('a'))
console.log(helper.input('#'))
