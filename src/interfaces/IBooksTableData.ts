import { IIssueHistory } from "./IIssueHistory";

export default interface IBooksTableData {
    id: string;
    lp: number;
    title: string;
    author: string;
    genre: string[];
    isbn: string;
    available: boolean;
    reserved: boolean;
    description: string;
    issueHistory: IIssueHistory[];
}
