const config ={
    appWriteURL : String(import.meta.env.VITE_API_ENDPOINT),
    appWriteProjectId : String(import.meta.env.VITE_PROJECT_ID), 
    appWriteDatabaseId: String(import.meta.env.VITE_DATABASE_ID),
    appWriteCollectionId: String(import.meta.env.VITE_COLLECTION_ID_MESSAGES)
}
export default config