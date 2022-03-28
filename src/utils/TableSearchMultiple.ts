export function tableSearchMultiple(dataArray: any[], searchStrings: any[]): boolean {
    const setOfSearchStrings = new Set();
    searchStrings.forEach((searchString) => setOfSearchStrings.add(searchString));
    return (
        dataArray.map((item) => item.replace(" ", "")).filter((genre) => setOfSearchStrings.has(genre)).length ===
        setOfSearchStrings.size
    );
}
