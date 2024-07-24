import Quote from "@models/quote";
import { connectToDB } from "@utils/database";
import mongoose from "mongoose";


// read the quotes
export const GET = async (request,{ params }) => {
    try {
        await connectToDB()
        const quote = await Quote.findById(params.id).populate('creator')
        
        if(!quote) return new Response("Quote not found", {status : 404})

        return new Response(JSON.stringify(quote), { status: 200 })

    } catch (error) {
        return new Response("Failed to fetch all quote", { status: 500 })
    }
} 

// update

export const PATCH = async (request, { params }) => {
    const { quote, tag, author, source } = await request.json();
    
    const tagsArray = (tag.toString()).split(',').map(tag => tag.trim());    

    try {
        await connectToDB();
        
        // Find the existing quote by ID
        const existingQuote = await Quote.findById(params.id);

        if (!existingQuote) {
            return new Response("Quote not found", { status: 404 });
        }

        // Update the Quote with new data
        
        existingQuote.quote = quote;
        existingQuote.tag = tagsArray;
        existingQuote.author = author;
        existingQuote.source = source||'';

        await existingQuote.save();

        return new Response("Successfully updated the Quotes", { status: 200 });
    } catch (error) {
        console.log(error)
        return new Response("Error Updating Quote", { status: 500 });
    }
};

// delete

export const DELETE = async (request, { params }) => {
        try{
            await connectToDB();

           await Quote.findByIdAndDelete(params.id);
            return new Response("Quote deleted successfuly",{status:200})
             
          
        }
        catch(error){
            return new Response("failed to delete the quote",{status:500})
        }
}

    // like

// export const PUT = async (request, {params}) => {

//     try {
//         await connectToDB()
//         const existingQuote = await Quote.findById(params.id);

//         if (!existingQuote) {
//             return res.status(404).json({ error: 'quote not found' });
//           }
        
//           existingQuote.likeCount += 1 ; 
//          await existingQuote.save();
//          return new Response(JSON.stringify({ message: 'Quote liked successfully' }), { status: 200 });
//         } catch (error) {
//           console.log(error);
//           return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
//      }
// };

export const PUT = async (request, { params }) => {
    try {
        await connectToDB();
        const existingQuote = await Quote.findById(params.id);

        if (!existingQuote) {
            return new Response(JSON.stringify({ error: 'Quote not found' }), { status: 404 });
        }

        const url = new URL(request.url);
        const userId = url.searchParams.get('userId');

        if (!userId) {
            return new Response(JSON.stringify({ error: 'User ID is required' }), { status: 400 });
        }

        // Check if the user has already liked the quote
        const userHasLiked = existingQuote.likedBy.includes(userId);

        if (userHasLiked) {
            // User has already liked the quote, so unlike it
            existingQuote.likeCount -= 1;
            existingQuote.likedBy = existingQuote.likedBy.filter(id => id.toString() !== userId);
        } else {
            // User has not liked the quote, so like it
            existingQuote.likeCount += 1;
            existingQuote.likedBy.push(userId);
        }

        await existingQuote.save();

        return new Response(JSON.stringify({ message: 'Quote liked successfully'}), { status: 200 });
        
    } catch (error) {
        return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
    }
};