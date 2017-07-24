import Failure from './failure.model';

export default {
    create: async (failure) => createFailure(failure)
};

const createFailure = async (failure) => {
    
    const { 
        line,
        message
    } = failure;

    const model = new Failure({ 
        line,
        message
    });

    await model.save((err) => {
        if(err) throw err;
        console.log(`CREATE FAILURE ${message}`); // eslint-disable-line no-console
    });
};