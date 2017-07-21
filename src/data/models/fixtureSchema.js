import mongoose from 'mongoose';

const { Schema } = mongoose;

const fixtureSchema = new Schema({
    eventId: { type: String, required: true, unique: true },
    category: { type: String, required: true },
    subCategory: { type: String, required: true },
    name: { type: String, required: true },
    startTime: { type: Date, required: true },
    displayed: { type: Boolean, required: true },
    suspended: { type: Boolean, required: true },
    markets: [{
        marketId: { type: Number, require: true, unique: true },
        name: { type: String, required: true },
        displayed: { type: Boolean, required: true },
        suspended: { type: Boolean, required: true },
        outcomes: [{
            outcomeId: { type: Number, require: true, unique: true },
            name: { type: String, require: true },
            price: { type: String, require: true },
            displayed: { type: Boolean, required: true },
            suspended: { type: Boolean, required: true },
            created_at: { type: Date, required: true },
            updated_at: { type: Date, required: true }
        }],
        created_at: { type: Date, required: true },
        updated_at: { type: Date, required: true }
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