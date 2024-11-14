# Genre-Based Vector Search with Pinecone and OpenAI

This project demonstrates how to use [Pinecone](https://www.pinecone.io/) and [OpenAI's API](https://beta.openai.com/docs/) to perform a genre-based vector search. Using OpenAI's text embeddings, genres like "drama" and "comedy" are converted into vector representations and stored in a Pinecone vector database. This allows us to query for similar genres based on vector similarity.

## Requirements

- Node.js (version 14 or higher)
- A Pinecone API Key
- An OpenAI API Key

## Setup

1. **Clone the Repository:**
   ```bash
   git clone <repository-url>
   cd <repository-name>
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Set Up Environment Variables:**
   Create a `.env` file in the root directory and add your API keys:
   ```plaintext
   OPEN_AI_KEY=your_openai_key
   PINECONE_KEY=your_pinecone_key
   ```

## Code Overview

### Dependencies
- **dotenv:** Loads environment variables from `.env`.
- **@pinecone-database/pinecone:** Pinecone client library for connecting to your vector database.
- **openai:** OpenAI client library for creating text embeddings.

### Code Explanation

1. **Setup OpenAI and Pinecone Clients:**
   ```javascript
   const openai = new OpenAI({
       apiKey: process.env.OPEN_AI_KEY
   });

   const pinecone = new Pinecone({
       apiKey: process.env.PINECONE_KEY
   });
   ```

2. **Generate Embeddings for Genres:**
   Genres are mapped to vectors using the `getGenreVector` function, which creates embeddings from OpenAI's `text-embedding-ada-002` model.

3. **Upsert Vectors into Pinecone:**
   The generated vectors are upserted to the Pinecone index within the namespace `ns1`.

4. **Query Pinecone for Similar Genres:**
   A search query is performed to find genres similar to "dramedy".

### Example Usage

Run the code to index your genres and perform a similarity query:
```bash
node index.js
```

## Notes

- **Embedding Vector Size:** The vector slice is limited to 1024 dimensions due to potential model constraints.
- **Namespace:** Vectors are upserted and queried within the `ns1` namespace for isolation.

## Output

The `console.log(response.matches)` outputs genres similar to the query term "dramedy" based on vector proximity.

## License

MIT License