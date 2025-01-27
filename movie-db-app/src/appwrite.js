import {Client, Databases, ID, Query} from 'appwrite';

const DATABASE_ID=import.meta.env.VITE_APPWRITE_DATABASE_ID;
const COLLEDCTION_ID=import.meta.env.VITE_APPWRITE_COLLECTION_ID;
const PROJECT_ID=import.meta.env.VITE_APPWRITE_PROJECT_ID;


const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject(PROJECT_ID)

const database  = new Databases(client);


export const updateSearchCount = async (searchTerm, movie) => {
    // use aapwrite sdk or api to check of the document already exits inn the db
    try{
        const result = await database.listDocuments(DATABASE_ID, COLLEDCTION_ID, [
            Query.equal('searchTerm', searchTerm),
        ]);

        // if it does, update the count
        if(result.documents.length){
            const doc = result.documents[0];

            await database.updateDocument(DATABASE_ID, COLLEDCTION_ID, doc.$id, {
                count: doc.count + 1,
            });
        // if it does not, create a new document with the count of 1
        }else{
            await database.createDocument(DATABASE_ID, COLLEDCTION_ID, ID.unique(), {
                searchTerm,
                count: 1,
                movie_id: movie.id,
                poster_url: `https://image.tmdb.org/t/p/w500/${movie.poster_path}`,
            });
        }
    }catch(error){
        console.log(error);
    }

}

export const getTrendingMovies = async () => {
    try {
        const result = await database.listDocuments(DATABASE_ID, COLLEDCTION_ID, [
            Query.limit(5),
            Query.orderDesc('count'),
        ]);

        return result.documents;  
    } catch (error) {
        console.log(error);
        
    }
}