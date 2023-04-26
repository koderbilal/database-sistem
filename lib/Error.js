class DatabaseError extends Error {
    constructor(message = "Unknown Error") {
        super();
        this.name = "database-sistem";
        this.message = message;
    };
};
module.exports = DatabaseError;