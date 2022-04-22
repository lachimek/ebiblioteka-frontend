export default interface IIssuesTableData {
    id: string;
    issueDate: string;
    returnDate: string;
    status: "good" | "near" | "returned" | "overdue";
    book: {
        id: string;
        title: string;
        isbn: string;
    };
    member: {
        id: string;
        firstName: string;
        lastName: string;
        phone: string;
        groupName: string;
    };
}
