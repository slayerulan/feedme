import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const fixtureSchema = new Schema({
    eventId: { type: String, required: true, unique: true },
    category: { type: String },
    subCategory: { type: String },
    name: { type: String },
    startTime: { type: Date, required: true },
    displayed: { type: Boolean, required: true },
    suspended: { type: Boolean, required: true },
    markets: [{
        marketId: { type: String, require: true },
        name: { type: String },
        displayed: { type: Boolean, required: true },
        suspended: { type: Boolean, required: true },
        outcomes: [{
            outcomeId: { type: String, require: true },
            name: { type: String },
            price: { type: String },
            displayed: { type: Boolean, required: true },
            suspended: { type: Boolean, required: true },
        }],
    }],
    created_at: { type: Date },
    updated_at: { type: Date }
});

export default mongoose.model('Fixture', fixtureSchema);
