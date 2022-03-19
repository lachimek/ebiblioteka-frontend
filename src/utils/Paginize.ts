export const Paginize = (data: Array<any>, itemsPerPage: number) => {
    let paginized: Array<any> = data.reduce((all, one, i) => {
        const ch = Math.floor(i / itemsPerPage);
        all[ch] = [].concat(all[ch] || [], one);
        return all;
    }, []);

    paginized.map((arr: Array<any>) => {
        while (arr.length < itemsPerPage) {
            arr.push({});
        }
    });

    return paginized;
};
