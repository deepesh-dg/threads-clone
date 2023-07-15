import { Models } from "appwrite";

declare global {
    namespace ThreadPost {
        type Comment = {
            author: string;
            comment: string;
        };

        type Comments = Comment[];

        type Thread = {
            name: string;
            authorId: string;
            message: string;
            likes: string[];
            views: string[];
            comments: Comments;
            attachment?: string;
        };

        type Threads = Thread[];

        type ThreadDocument = Models.Document & Thread;
        type ThreadDocuments = Models.DocumentList<ThreadDocument>;
    }

    namespace Account {
        type User = {
            name: string;
            username: string;
            email: string;
        };

        type UserDocument = Models.User<Models.Preferences>;
    }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {};
