export const errorHandler = (statusCode, message) => {
    if (typeof statusCode !== 'number') {
        throw new Error('Status code must be a number');
    }

    if (typeof message !== 'string') {
        throw new Error('Message must be a string');
    }

    const error = new Error(message);
    error.statusCode = statusCode;
    return error;
};