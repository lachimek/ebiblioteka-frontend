export interface IBook {
    id?: string | null;
    isbn: string;
    title: string;
    author: IAuthor | string;
    publicationDate: string;
    language: ILanguage | string;
    publisher: IPublisher | string;
    genres: IGenre[] | string[];
    available: boolean;
    description: string;
    issueHistory: IIssueHistory[];
}

export interface ILanguage {
    id: string;
    language: string;
}

export interface IAuthor {
    id: string;
    name: string;
}

export interface IPublisher {
    id: string;
    name: string;
}

export interface IGenre {
    id: string;
    name: string;
}

export interface IIssueHistory {
    id: string;
    issueDate: string;
    returnDate: string;
    returned: boolean;
}

/*{
    "status": 200,
    "book": {
      "isbn": "978-3-16-148410-0",
      "title": "testowa książka 6",
      "publicationDate": "2022-02-22",
      "language": {
        "id": "def8f94d-015d-49a0-9750-16dabaac07b6",
        "language": "Polski",
        "languageShort": "PL"
      },
      "condition": {
        "id": "43c6d938-3806-4197-bc3d-ebe49c1e6194",
        "condition": "Nowa"
      },
      "publisher": {
        "id": "e9c5d2e5-7806-4f19-a461-7e5c56758a45",
        "name": "Wydawca dwa"
      },
      "genres": [
        {
          "id": "8c6fc7ac-1b28-4d95-a044-9630dee93fa2",
          "name": "Komedia"
        }
      ],
      "id": "1500ced6-fdd4-4dd3-bb7c-4aa84bb2c81b"
    }
  }*/
