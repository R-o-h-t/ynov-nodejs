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
        res.send(error.details, error.status);
    } else {
        res.send(error.message, 500);
    }
};

export { AppError, catchError };