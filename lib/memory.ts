import { Redis } from "@upstash/redis";

import { OpenAIEmbeddings } from "langchain/embeddings/openai";

import { Pinecone } from '@pinecone-database/pinecone';
import { PineconeStore } from "langchain/vectorstores/pinecone";

export type CompanionKey = {
    companionName: string;
    modelName: string;
    userId: string;
}

export class MemoryManager {
    private static instance: MemoryManager;
    private history : Redis;
    private vectorDBClient : Pinecone;

    public constructor() {
        this.history = Redis.fromEnv();
        this.vectorDBClient = new Pinecone({
            apiKey: process.env.PINECONE_API_KEY!,
            environment: process.env.PINECONE_ENVIRONMENT!,
        });
    }

    public async init() {
        // if (this.vectorDBClient instanceof Pinecone) {
        //     await this.vectorDBClient({
        //         apiKey: process.env.PINECONE_API_KEY!,
        //         environment: process.env.PINECONE_ENVIRONMENT!,
        //     })
        // }

    }

    public async vectorSearch(
        recentChatHistory: string,
        companionFileName: string
    ) {
        const pinecone = <Pinecone>this.vectorDBClient;

        const pineconeIndex = pinecone.Index(
            process.env.PINECONE_INDEX! || ""
        );

        const vectorStore = await PineconeStore.fromExistingIndex(
            new OpenAIEmbeddings({openAIApiKey: process.env.OPENAI_API_KEY}),
            { pineconeIndex }
        );

        const similarDocs = await vectorStore.similaritySearch(recentChatHistory, 3, 
            {fileName: companionFileName})
            .catch((error)=>{console.log("Failed to get vector results", error)});

        return similarDocs;
    }

    public static async getInstance() : Promise<MemoryManager> {
        if (!MemoryManager.instance) {
            MemoryManager.instance = new MemoryManager();
        }

        return MemoryManager.instance;
    }

    private generateRedisCompanionKey(companionKey: CompanionKey) : string {
        return `${companionKey.companionName}-${companionKey.modelName}-${companionKey.userId}`
    }

    public async writeToHistory(text: string, companionKey: CompanionKey) {
        if (!companionKey || typeof companionKey.userId === "undefined") {
            console.log("Companion key incorrect");
            return "";
        }

        const key = this.generateRedisCompanionKey(companionKey);

        const result = await this.history.zadd(key, {
            score: Date.now(),
            member: text,
        })

        return result;
    }

    public async readLatestHistory(companionKey: CompanionKey): Promise<string> {
        if (!companionKey || typeof companionKey.userId === "undefined") {
            console.log("Companion key incorrect");
            return "";
        }

        const key = this.generateRedisCompanionKey(companionKey);

        let result = await this.history.zrange(key, 0, Date.now(), {
            byScore: true
        });

        result = result.slice(-30).reverse();
        const recentChats = result.reverse().join("\n");

        return recentChats;
    }

    public async seedChatHistory(
        seedContent: string,
        delimiter: string = "\n",
        companionKey: CompanionKey
    ) {
        const key = this.generateRedisCompanionKey(companionKey);

        if (await this.history.exists(key)) {
            console.log("User has chat history");
            return;
        }

        const content = seedContent.split(delimiter);
        let counter = 0;

        for (const line of content) {
            await this.history.zadd(key, {score: counter, member: line});
            counter += 1;
        }
    }
}