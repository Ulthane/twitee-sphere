export function firstLetterUpperCase(word) {
    let wordWithFirstLetterInUpperCase = word;
    return (
        wordWithFirstLetterInUpperCase[0].toUpperCase() +
        wordWithFirstLetterInUpperCase.slice(
            1,
            wordWithFirstLetterInUpperCase.length
        )
    );
}
