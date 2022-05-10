const letters = "abcdefghijklmnopqrstuvwxyz".split("");
const vowels = "aeiouy".split("");
const consonants = "bcdfghjklmnpqrstvwxyz".split("");

const excludedLetters = "tuiqsghlmcv".split("");

const possibleLetters = letters.filter((x) => excludedLetters.includes(x));
const possibleVowels = vowels.filter((x) => excludedLetters.includes(x));
const possibleConsonants = consonants.filter((x) =>
    excludedLetters.includes(x)
);

const knownLetters = [{
        letter: "e",
        position: 0,
    },
    {
        letter: "p",
        position: 1,
    },
    {
        letter: "r",
        position: undefined,
        type: "consonant",
    },
    {
        letter: "o",
        position: 4,
    },
    {
        letter: "e",
        position: 7,
    },
    {
        letter: "p",
        positionNot: [2],
        type: "consonant",
    },
    {
        letter: "o",
        positionNot: [3],
        type: "vowel",
    },
    {
        letter: "r",
        positionNot: [4, 7],
        type: "consonant",
    },
    {
        letter: "e",
        positionNot: 6,
        type: "consonant",
    },
];

const wordLength = 8;

const nbOfWords = 100;

const generateWords = (nbTimes) => {
    return new Promise((resolve, _reject) => {
        let words = [];
        for (let i = 0; i < nbTimes; i++) {
            generateWorld().then((word) => {
                words.push(word);
                if (words.length === nbTimes) {
                    resolve(words);
                }
            });
        }
    });
};

const generateWorld = () => {
    return new Promise((resolve, _reject) => {
        const lettersThatShouldBeThere = knownLetters.map((knownLetter) => {
            return knownLetter.letter;
        });

        let word = "";
        for (let i = 0; i < wordLength; i++) {
            let letter = knownLetters.find((l) => l.position === i) || {
                letter: possibleLetters[Math.floor(Math.random() * letters.length)],
                position: i,
            };
            if (letter.letter === undefined) {
                if (letter.type === "consonant") {
                    letter.letter =
                        possibleConsonants[
                            Math.floor(Math.random() * possibleConsonants.length)
                        ];
                }
                if (letter.type === "vowel") {
                    letter.letter =
                        possibleVowels[Math.floor(Math.random() * possibleVowels.length)];
                } else {
                    letter.letter =
                        possibleLetters[Math.floor(Math.random() * letters.length)];
                }
            }
            word += letter.letter;

            if (i === wordLength - 1) {
                if (lettersThatShouldBeThere.every((l) => word.split("").includes(l))) {
                    resolve(word);
                } else {
                    resolve(generateWorld());
                }
            }
        }
    });
};

const print = (string) => {
    console.log(string);
};

generateWords(nbOfWords).then((words) => {
    print(words.join(" \n "));
});