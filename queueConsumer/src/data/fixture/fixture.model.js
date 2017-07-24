import mongoose from 'mongoose';

const { Schema } = mongoose;

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

fixtureSchema.pre('save', function(next) {
    const currentDate = new Date();
    this.updated_at = currentDate;
    this.created_at = this.created_at || currentDate;

    next();
});

const Fixture = mongoose.model('Fixture', fixtureSchema);

export default Fixture;