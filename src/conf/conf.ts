const conf = {
    appwriteUrl: String(process.env.NEXT_PUBLIC_APPWRITE_URL),
    appwriteProjectId: String(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID),
    appwriteDatabaseId: String(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID),
    appwriteCollectoinPostId: String(process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_POST_ID),
    appwriteCollectoinCommentId: String(process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_COMMENT_ID),
    appwriteBucketId: String(process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID),
    appwriteKey: String(process.env.APPWRITE_API_KEY),
};

export default conf;
