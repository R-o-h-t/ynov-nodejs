class AppError {
    status;
    details;

    constructor(status, details) {
        this.status = status || 500;
        this.details = details || "An Error as occurred !";
    }

    static fromError(error) {
        if (error instanceof AppError) return error;
        return new AppError(500, error.message);
    }
}

const catchError = (error, _req, res, _next) => {
    if (error instanceof AppError) {
        res.status(error.status).send(error.details);
    } else {
        res.status(500).send(error.message);
    }
};

export { AppError, catchError };