import { IIssueHistory } from "./IBook";

export default interface IBooksTableData {
    id: string;
    lp: number;
    title: string;
    author: string;
    genre: string[];
    isbn: string;
    available: boolean;
    description: string;
    issueHistory: IIssueHistory[];
}
