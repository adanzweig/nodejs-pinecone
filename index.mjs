import { Pinecone } from "@pinecone-database/pinecone";
import { configDotenv } from "dotenv";
import OpenAI from "openai";
configDotenv();

const openai = new OpenAI({
    apiKey:process.env.OPEN_AI_KEY
});

const pinecone = new Pinecone({
    apiKey: process.env.PINECONE_KEY
})

const index = pinecone.index('lotr');

let genres = ['drama','comedy','action','romance','thrillers'];

const vectors = await Promise.all(genres.map(async(genre,index)=>{
    const genreVector = await getGenreVector(genre);
    return {
        id: `vector_${index+1}`,
        values:genreVector,
        metadata:{genre}
    }
}));

async function getGenreVector(genre){
    const embeddingResponse = await openai.embeddings.create({
        model:'text-embedding-ada-002',
        input:genre
    });
    return embeddingResponse.data[0].embedding.slice(0,1024)
}

await index.namespace('ns1').upsert(vectors)

const response = await index.namespace('ns1').query({
    topK:5,
    vector: await getGenreVector('dramedy'),
    includeValues:true,
    includeMetadata:true
})

console.log(response.matches)