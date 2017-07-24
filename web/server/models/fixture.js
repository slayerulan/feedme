import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const fixtureSchema = new Schema({
    eventId: { type: String, required: true, unique: true },
    category: { type: String, required: true },
    subCategory: { type: String, required: true },
    name: { type: String, required: true },
    startTime: { type: Date, required: true },
    displayed: { type: Boolean, required: true },
    suspended: { type: Boolean, required: true },
    markets: [{
        marketId: { type: String, require: true },
        name: { type: String, required: true },
        displayed: { type: Boolean, required: true },
        suspended: { type: Boolean, required: true },
        outcomes: [{
            outcomeId: { type: String, require: true },
            name: { type: String, require: true },
            price: { type: String, require: true },
            displayed: { type: Boolean, required: true },
            suspended: { type: Boolean, required: true },
        }],
    }],
    created_at: { type: Date },
    updated_at: { type: Date }
});

export default mongoose.model('Fixture', fixtureSchema);
