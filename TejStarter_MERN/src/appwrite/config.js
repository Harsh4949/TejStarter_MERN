import conf from "../conf/conf";
import { Client, ID, Databases, Query } from "appwrite";

export class Service{
    client = new Client();
    databases;

    constructor(){
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId);
        this.databases = new Databases(this.client);
    }

    async loadStudData({ name, dob, edulevel, degree_class, edu_field="-", email,phno,id=ID.unique()}) {
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                ID.unique(),
                {
                    name,
                    dob,
                    edulevel, // ✅ correct 
                    degree_class,
                    edu_field,
                    email,
                    phno,
                    id,
                }
            )
        } catch (error) {
            console.log("Appwrite service :: createPost :: error", error);
        }
    } 
}


const service = new Service()
export default service