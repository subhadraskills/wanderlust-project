const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js");

const listingSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: String,
    
    image: { // Image as an object
        url:  String, 
        filename: String, 
            
            //default: "https://upload.wikimedia.org/wikipedia/commons/3/3f/Sunset_with_coconut_palm_tree%2C_Fiji.jpg" },
    },

    price: Number,
    location:  String,
    country: String,
        reviews:[
            {
                type: Schema.Types.ObjectId,
                ref: "Review",
            }
        ],
        owner: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
    
});


listingSchema.post("findOneAndDelete", async (listing) => {
    if(listing){
        await Review.deleteMany({ _id: { $in: listing.reviews}});
    }

});


// Compiling the model
const Listing = mongoose.model("Listing", listingSchema);

module.exports = Listing;
