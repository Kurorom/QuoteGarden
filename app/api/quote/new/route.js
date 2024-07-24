import Quote from "@models/quote";
import { connectToDB } from "@utils/database";

export const POST = async (request) => {
    const { userId, quote, tag,author,source } = await request.json();

    try {
        await connectToDB();
        const tagsArray = tag.split(',').map(tag => tag.trim());
        const newQuote = new Quote({ creator: userId, quote, tag : tagsArray ,author,source : source || '', likedBy: []});

        await newQuote.save();
        return new Response(JSON.stringify(newQuote), { status: 201 })
    } catch (error) {
        console.log(error)

        return new Response("Failed to create a new quote", { status: 500 });
    }
}