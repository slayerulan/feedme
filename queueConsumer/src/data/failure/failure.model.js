import mongoose from 'mongoose';

const { Schema } = mongoose;

const failureSchema = new Schema({
    line: { type: String, required: true },
    message: { type: String, required: true },
    created_at: { type: Date },
    updated_at: { type: Date }
});

failureSchema.pre('save', function(next) {
    const currentDate = new Date();
    this.updated_at = currentDate;
    this.created_at = this.created_at || currentDate;

    next();
});

const Failure = mongoose.model('Failure', failureSchema);

export default Failure;