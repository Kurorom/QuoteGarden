import mongoose, { Schema, model, models} from "mongoose";

const QuoteSchema = new Schema({
    creator : {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    quote:{
        type: String,
        required:[true,'quote is required.']
    },
    tag:{
        type: [String],
        required:[true,'tag is required.']
    },
    author:{
        type: String,
        required:[true,'author is required.']
    },
    source:{
        type: String,
        default:'',
    },
    likeCount:{
            type: Number,
            default: 0
    },
    likedBy: {
        type: [String],
        default: []
    }

});

const Quote = models.Quote || model('Quote', QuoteSchema);

export default Quote;