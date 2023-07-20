import { Models } from "appwrite";

declare global {
    namespace DB {
        interface Document extends Models.Document {}
        interface DocumentList<T extends Document = any> extends Models.DocumentList<T> {}
    }

    namespace ThreadPost {
        interface Comment {
            id: string;
            authorId: string;
            comment: string;
        }

        interface BaseThread {
            authorId: string;
            message: string;
            likes: string[];
            views: string[];
            attachment?: string;
        }

        interface ThreadWithoutComment extends BaseThread {
            comments: string[];
        }

        interface ThreadWithComment extends BaseThread {
            comments: CommentDocument[];
        }

        interface CommentDocument extends DB.Document, Comment {}
        interface ThreadDocument extends DB.Document, ThreadWithoutComment {}
        interface ThreadWithCommentDocument extends DB.Document, ThreadWithComment {}
        interface ThreadDocuments extends DB.DocumentList<ThreadDocument> {}
    }

    namespace Account {
        interface User {
            name: string;
            username: string;
            email: string;
        }

        interface UserDocument extends Models.User<Models.Preferences> {}

        interface Session extends Models.Session {}
    }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {};
