// ----- CONST DEFINITIONS -----

const LLM_REGEX = /chatgpt\.com|perplexity\.ai|gemini\.google\.com|claude\.ai|deepseek\.com|you\.com|jasper\.ai|copilot\.microsoft\.com|writesonic\.com\/chat|socrat\.ai|huggingface\.co\/chat/;
const RESETTIME = 15 * 60 * 1000;
const LEETCODE_GRAPHQL_ENDPOINT = 'https://leetcode.com/graphql';
const QUESTION_QUERY = `
query questionData($titleSlug: String!) {
  question(titleSlug: $titleSlug) {
    questionId
    title
    titleSlug
    content
    difficulty
    exampleTestcases
  }
}
`;

// ----- HELPER FUNCTION -----

async function fetchLeetCodeQuestion(titleSlug) {
    const response = await fetch(LEETCODE_GRAPHQL_ENDPOINT, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            query: QUESTION_QUERY,
            variables: { titleSlug: titleSlug },
        }),
    });
    const data = await response.json();
    if (data.errors) {
        console.error("GraphQL Error:", data.errors);
        throw new Error("Failed to fetch LeetCode question");
    }
    return data.data.question;
}

async function getRandomLeetCodeProblemTitleSlug() {
    try {
        const questions = [
            "count-total-number-of-colored-cells",
            "two-sum",
            "add-two-numbers",
            "longest-substring-without-repeating-characters",
            "median-of-two-sorted-arrays",
            "longest-palindromic-substring",
            "zigzag-conversion",
            "reverse-integer",
            "string-to-integer-(atoi)",
            "palindrome-number",
            "regular-expression-matching",
            "container-with-most-water",
            "integer-to-roman",
            "roman-to-integer",
            "longest-common-prefix",
            "3sum",
            "3sum-closest",
            "letter-combinations-of-a-phone-number",
            "4sum",
            "remove-nth-node-from-end-of-list",
            "valid-parentheses",
            "merge-two-sorted-lists",
            "generate-parentheses",
            "merge-k-sorted-lists",
            "swap-nodes-in-pairs",
            "reverse-nodes-in-k-group",
            "remove-duplicates-from-sorted-array",
            "remove-element",
            "find-the-index-of-the-first-occurrence-in-a-string",
            "divide-two-integers",
            "substring-with-concatenation-of-all-words",
            "next-permutation",
            "longest-valid-parentheses",
            "search-in-rotated-sorted-array",
            "find-first-and-last-position-of-element-in-sorted-array",
            "search-insert-position",
            "valid-sudoku",
            "sudoku-solver",
            "count-and-say",
            "combination-sum",
            "combination-sum-ii",
            "first-missing-positive",
            "trapping-rain-water",
            "multiply-strings",
            "wildcard-matching",
            "jump-game-ii",
            "permutations",
            "permutations-ii",
            "rotate-image",
            "group-anagrams",
            "pow(x,-n)",
            "n-queens",
            "n-queens-ii",
            "maximum-subarray",
            "spiral-matrix",
            "jump-game",
            "merge-intervals",
            "insert-interval",
            "length-of-last-word",
            "spiral-matrix-ii",
            "permutation-sequence",
            "rotate-list",
            "unique-paths",
            "unique-paths-ii",
            "minimum-path-sum",
            "valid-number",
            "plus-one",
            "add-binary",
            "text-justification",
            "sqrt(x)",
            "climbing-stairs",
            "simplify-path",
            "edit-distance",
            "set-matrix-zeroes",
            "search-a-2d-matrix",
            "sort-colors",
            "minimum-window-substring",
            "combinations",
            "subsets",
            "word-search",
            "remove-duplicates-from-sorted-array-ii",
            "search-in-rotated-sorted-array-ii",
            "remove-duplicates-from-sorted-list-ii",
            "remove-duplicates-from-sorted-list",
            "largest-rectangle-in-histogram",
            "maximal-rectangle",
            "partition-list",
            "scramble-string",
            "merge-sorted-array",
            "gray-code",
            "subsets-ii",
            "decode-ways",
            "reverse-linked-list-ii",
            "restore-ip-addresses",
            "binary-tree-inorder-traversal",
            "unique-binary-search-trees-ii",
            "unique-binary-search-trees",
            "interleaving-string",
            "validate-binary-search-tree",
            "recover-binary-search-tree",
            "same-tree",
            "symmetric-tree",
            "binary-tree-level-order-traversal",
            "binary-tree-zigzag-level-order-traversal",
            "maximum-depth-of-binary-tree",
            "construct-binary-tree-from-preorder-and-inorder-traversal",
            "construct-binary-tree-from-inorder-and-postorder-traversal",
            "binary-tree-level-order-traversal-ii",
            "convert-sorted-array-to-binary-search-tree",
            "convert-sorted-list-to-binary-search-tree",
            "balanced-binary-tree",
            "minimum-depth-of-binary-tree",
            "path-sum",
            "path-sum-ii",
            "flatten-binary-tree-to-linked-list",
            "distinct-subsequences",
            "populating-next-right-pointers-in-each-node",
            "populating-next-right-pointers-in-each-node-ii",
            "pascal's-triangle",
            "pascal's-triangle-ii",
            "triangle",
            "best-time-to-buy-and-sell-stock",
            "best-time-to-buy-and-sell-stock-ii",
            "best-time-to-buy-and-sell-stock-iii",
            "binary-tree-maximum-path-sum",
            "valid-palindrome",
            "word-ladder-ii",
            "word-ladder",
            "longest-consecutive-sequence",
            "sum-root-to-leaf-numbers",
            "surrounded-regions",
            "palindrome-partitioning",
            "palindrome-partitioning-ii",
            "clone-graph",
            "gas-station",
            "candy",
            "single-number",
            "single-number-ii",
            "copy-list-with-random-pointer",
            "word-break",
            "word-break-ii",
            "linked-list-cycle",
            "linked-list-cycle-ii",
            "reorder-list",
            "binary-tree-preorder-traversal",
            "binary-tree-postorder-traversal",
            "lru-cache",
            "insertion-sort-list",
            "sort-list",
            "max-points-on-a-line",
            "evaluate-reverse-polish-notation",
            "reverse-words-in-a-string",
            "maximum-product-subarray",
            "find-minimum-in-rotated-sorted-array",
            "find-minimum-in-rotated-sorted-array-ii",
            "min-stack",
            "binary-tree-upside-down",
            "read-n-characters-given-read4",
            "read-n-characters-given-read4-ii---call-multiple-times",
            "longest-substring-with-at-most-two-distinct-characters",
            "intersection-of-two-linked-lists",
            "one-edit-distance",
            "find-peak-element",
            "missing-ranges",
            "maximum-gap",
            "compare-version-numbers",
            "fraction-to-recurring-decimal",
            "two-sum-ii---input-array-is-sorted",
            "excel-sheet-column-title",
            "majority-element",
            "two-sum-iii---data-structure-design",
            "excel-sheet-column-number",
            "factorial-trailing-zeroes",
            "binary-search-tree-iterator",
            "dungeon-game",
            "combine-two-tables",
            "second-highest-salary",
            "nth-highest-salary",
            "rank-scores",
            "largest-number",
            "consecutive-numbers",
            "employees-earning-more-than-their-managers",
            "duplicate-emails",
            "customers-who-never-order",
            "department-highest-salary",
            "department-top-three-salaries",
            "reverse-words-in-a-string-ii",
            "repeated-dna-sequences",
            "best-time-to-buy-and-sell-stock-iv",
            "rotate-array",
            "reverse-bits",
            "number-of-1-bits",
            "word-frequency",
            "valid-phone-numbers",
            "transpose-file",
            "tenth-line",
            "delete-duplicate-emails",
            "rising-temperature",
            "house-robber",
            "binary-tree-right-side-view",
            "number-of-islands",
            "bitwise-and-of-numbers-range",
            "happy-number",
            "remove-linked-list-elements",
            "count-primes",
            "isomorphic-strings",
            "reverse-linked-list",
            "course-schedule",
            "implement-trie-(prefix-tree)",
            "minimum-size-subarray-sum",
            "course-schedule-ii",
            "design-add-and-search-words-data-structure",
            "word-search-ii",
            "house-robber-ii",
            "shortest-palindrome",
            "kth-largest-element-in-an-array",
            "combination-sum-iii",
            "contains-duplicate",
            "the-skyline-problem",
            "contains-duplicate-ii",
            "contains-duplicate-iii",
            "maximal-square",
            "count-complete-tree-nodes",
            "rectangle-area",
            "basic-calculator",
            "implement-stack-using-queues",
            "invert-binary-tree",
            "basic-calculator-ii",
            "summary-ranges",
            "majority-element-ii",
            "kth-smallest-element-in-a-bst",
            "power-of-two",
            "implement-queue-using-stacks",
            "number-of-digit-one",
            "palindrome-linked-list",
            "lowest-common-ancestor-of-a-binary-search-tree",
            "lowest-common-ancestor-of-a-binary-tree",
            "delete-node-in-a-linked-list",
            "product-of-array-except-self",
            "sliding-window-maximum",
            "search-a-2d-matrix-ii",
            "different-ways-to-add-parentheses",
            "valid-anagram",
            "shortest-word-distance",
            "shortest-word-distance-ii",
            "shortest-word-distance-iii",
            "strobogrammatic-number",
            "strobogrammatic-number-ii",
            "strobogrammatic-number-iii",
            "group-shifted-strings",
            "count-univalue-subtrees",
            "flatten-2d-vector",
            "meeting-rooms",
            "meeting-rooms-ii",
            "factor-combinations",
            "verify-preorder-sequence-in-binary-search-tree",
            "paint-house",
            "binary-tree-paths",
            "add-digits",
            "3sum-smaller",
            "single-number-iii",
            "graph-valid-tree",
            "trips-and-users",
            "ugly-number",
            "ugly-number-ii",
            "paint-house-ii",
            "palindrome-permutation",
            "palindrome-permutation-ii",
            "missing-number",
            "alien-dictionary",
            "closest-binary-search-tree-value",
            "encode-and-decode-strings",
            "closest-binary-search-tree-value-ii",
            "integer-to-english-words",
            "h-index",
            "h-index-ii",
            "paint-fence",
            "find-the-celebrity",
            "first-bad-version",
            "perfect-squares",
            "wiggle-sort",
            "zigzag-iterator",
            "expression-add-operators",
            "move-zeroes",
            "peeking-iterator",
            "inorder-successor-in-bst",
            "walls-and-gates",
            "find-the-duplicate-number",
            "unique-word-abbreviation",
            "game-of-life",
            "word-pattern",
            "word-pattern-ii",
            "nim-game",
            "flip-game",
            "flip-game-ii",
            "find-median-from-data-stream",
            "best-meeting-point",
            "serialize-and-deserialize-binary-tree",
            "binary-tree-longest-consecutive-sequence",
            "bulls-and-cows",
            "longest-increasing-subsequence",
            "remove-invalid-parentheses",
            "smallest-rectangle-enclosing-black-pixels",
            "range-sum-query---immutable",
            "range-sum-query-2d---immutable",
            "number-of-islands-ii",
            "additive-number",
            "range-sum-query---mutable",
            "range-sum-query-2d---mutable",
            "best-time-to-buy-and-sell-stock-with-cooldown",
            "minimum-height-trees",
            "sparse-matrix-multiplication",
            "burst-balloons",
            "super-ugly-number",
            "binary-tree-vertical-order-traversal",
            "count-of-smaller-numbers-after-self",
            "remove-duplicate-letters",
            "shortest-distance-from-all-buildings",
            "maximum-product-of-word-lengths",
            "bulb-switcher",
            "generalized-abbreviation",
            "create-maximum-number",
            "coin-change",
            "number-of-connected-components-in-an-undirected-graph",
            "wiggle-sort-ii",
            "maximum-size-subarray-sum-equals-k",
            "power-of-three",
            "count-of-range-sum",
            "odd-even-linked-list",
            "longest-increasing-path-in-a-matrix",
            "patching-array",
            "verify-preorder-serialization-of-a-binary-tree",
            "reconstruct-itinerary",
            "largest-bst-subtree",
            "increasing-triplet-subsequence",
            "self-crossing",
            "palindrome-pairs",
            "house-robber-iii",
            "counting-bits",
            "nested-list-weight-sum",
            "longest-substring-with-at-most-k-distinct-characters",
            "flatten-nested-list-iterator",
            "power-of-four",
            "integer-break",
            "reverse-string",
            "reverse-vowels-of-a-string",
            "moving-average-from-data-stream",
            "top-k-frequent-elements",
            "design-tic-tac-toe",
            "intersection-of-two-arrays",
            "intersection-of-two-arrays-ii",
            "android-unlock-patterns",
            "data-stream-as-disjoint-intervals",
            "design-snake-game",
            "russian-doll-envelopes",
            "design-twitter",
            "line-reflection",
            "count-numbers-with-unique-digits",
            "rearrange-string-k-distance-apart",
            "logger-rate-limiter",
            "sort-transformed-array",
            "bomb-enemy",
            "design-hit-counter",
            "max-sum-of-rectangle-no-larger-than-k",
            "nested-list-weight-sum-ii",
            "water-and-jug-problem",
            "find-leaves-of-binary-tree",
            "valid-perfect-square",
            "largest-divisible-subset",
            "plus-one-linked-list",
            "range-addition",
            "sum-of-two-integers",
            "super-pow",
            "find-k-pairs-with-smallest-sums",
            "guess-number-higher-or-lower",
            "guess-number-higher-or-lower-ii",
            "wiggle-subsequence",
            "combination-sum-iv",
            "kth-smallest-element-in-a-sorted-matrix",
            "design-phone-directory",
            "insert-delete-getrandom-o(1)",
            "insert-delete-getrandom-o(1)---duplicates-allowed",
            "linked-list-random-node",
            "ransom-note",
            "shuffle-an-array",
            "mini-parser",
            "lexicographical-numbers",
            "first-unique-character-in-a-string",
            "longest-absolute-file-path",
            "find-the-difference",
            "elimination-game",
            "perfect-rectangle",
            "is-subsequence",
            "utf-8-validation",
            "decode-string",
            "longest-substring-with-at-least-k-repeating-characters",
            "rotate-function",
            "integer-replacement",
            "random-pick-index",
            "evaluate-division",
            "nth-digit",
            "binary-watch",
            "remove-k-digits",
            "frog-jump",
            "sum-of-left-leaves",
            "convert-a-number-to-hexadecimal",
            "queue-reconstruction-by-height",
            "trapping-rain-water-ii",
            "valid-word-abbreviation",
            "longest-palindrome",
            "split-array-largest-sum",
            "minimum-unique-word-abbreviation",
            "fizz-buzz",
            "arithmetic-slices",
            "third-maximum-number",
            "add-strings",
            "partition-equal-subset-sum",
            "pacific-atlantic-water-flow",
            "sentence-screen-fitting",
            "battleships-in-a-board",
            "strong-password-checker",
            "maximum-xor-of-two-numbers-in-an-array",
            "valid-word-square",
            "reconstruct-original-digits-from-english",
            "longest-repeating-character-replacement",
            "word-squares",
            "convert-binary-search-tree-to-sorted-doubly-linked-list",
            "construct-quad-tree",
            "serialize-and-deserialize-n-ary-tree",
            "n-ary-tree-level-order-traversal",
            "flatten-a-multilevel-doubly-linked-list",
            "encode-n-ary-tree-to-binary-tree",
            "all-o`one-data-structure",
            "minimum-genetic-mutation",
            "number-of-segments-in-a-string",
            "non-overlapping-intervals",
            "find-right-interval",
            "path-sum-iii",
            "find-all-anagrams-in-a-string",
            "ternary-expression-parser",
            "k-th-smallest-in-lexicographical-order",
            "arranging-coins",
            "find-all-duplicates-in-an-array",
            "string-compression",
            "sequence-reconstruction",
            "add-two-numbers-ii",
            "arithmetic-slices-ii---subsequence",
            "number-of-boomerangs",
            "find-all-numbers-disappeared-in-an-array",
            "serialize-and-deserialize-bst",
            "delete-node-in-a-bst",
            "sort-characters-by-frequency",
            "minimum-number-of-arrows-to-burst-balloons",
            "minimum-moves-to-equal-array-elements",
            "4sum-ii",
            "assign-cookies",
            "132-pattern",
            "circular-array-loop",
            "poor-pigs",
            "repeated-substring-pattern",
            "lfu-cache",
            "hamming-distance",
            "minimum-moves-to-equal-array-elements-ii",
            "island-perimeter",
            "can-i-win",
            "optimal-account-balancing",
            "count-the-repetitions",
            "unique-substrings-in-wraparound-string",
            "validate-ip-address",
            "convex-polygon",
            "implement-rand10()-using-rand7()",
            "encode-string-with-shortest-length",
            "concatenated-words",
            "matchsticks-to-square",
            "ones-and-zeroes",
            "heaters",
            "number-complement",
            "total-hamming-distance",
            "generate-random-point-in-a-circle",
            "largest-palindrome-product",
            "sliding-window-median",
            "magical-string",
            "license-key-formatting",
            "smallest-good-base",
            "find-permutation",
            "max-consecutive-ones",
            "predict-the-winner",
            "max-consecutive-ones-ii",
            "zuma-game",
            "robot-room-cleaner",
            "the-maze",
            "non-decreasing-subsequences",
            "construct-the-rectangle",
            "reverse-pairs",
            "target-sum",
            "teemo-attacking",
            "next-greater-element-i",
            "random-point-in-non-overlapping-rectangles",
            "diagonal-traverse",
            "the-maze-iii"
        ];
        const randomIndex = Math.floor(Math.random() * questions.length);
        return questions[randomIndex];
    } catch (error) {
        console.error('Error selecting random question:', error);
        return "two-sum";
    }
}

// ----- EVENT LISTENER FUNCTIONS -----

browser.webNavigation.onBeforeNavigate.addListener(
    function(details) {
        if (LLM_REGEX.test(details.url)) {
            browser.storage.local.get(['lastSolvedTime']).then((result) => {
                const now = Date.now();
                if (!result.lastSolvedTime || now - result.lastSolvedTime > RESETTIME) {
                    browser.storage.local.set({originalUrl: details.url}).then(() => {
                        browser.tabs.update(details.tabId, {url: browser.runtime.getURL("popup.html")});
                    });
                }
            });
        }
    },
    {
        url: [{urlMatches: LLM_REGEX.source}]
    }
);

browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "getRandomQuestion") {
        (async () => {
            try {
                const titleSlug = await getRandomLeetCodeProblemTitleSlug();
                const questionData = await fetchLeetCodeQuestion(titleSlug);
                console.log("LeetCode Question Data:", questionData);
                sendResponse({ 
                    question: questionData.content, 
                    id: questionData.questionId, 
                    title: questionData.title,
                    slug: questionData.titleSlug
                });
            } catch (error) {
                console.error("Error fetching question:", error);
                sendResponse({ question: "Failed to fetch question.", id: null, title: null, slug: null });
            }
        })();
        return true; 
    }
    else if (request.action === "redirectToOriginal") {
        return browser.storage.local.get(['originalUrl']).then((result) => {
            if (result.originalUrl) {
                return browser.tabs.create({ url: result.originalUrl });
            }
        });
    }
});

browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log("Received message in background script:", message);
    if (message.action === "submissionSuccess" || (message.action === "submissionResult" && message.success)) {
        console.log("Successful submission detected");
        browser.runtime.sendMessage({ action: "updatePopup", content: "Congratulations! You've solved the problem.\n\nYou can now access any AI Chatbot for the next 15 minutes." });
        browser.tabs.remove(sender.tab.id);
        browser.storage.local.set({lastSolvedTime: Date.now()}).then(() => {
            console.log("Last solved time updated");
        });
    } else if (message.action === "submissionResult" && !message.success) {
        console.log("Submission failed");
    }
});