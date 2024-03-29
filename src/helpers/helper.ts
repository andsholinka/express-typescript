const ResponseData = (status: number, message: string | null, error: any | null, data: any | null) => {
    if (error != null && error instanceof Error) {
        const response = {
            status: status,
            message: error.message,
            error: error,
            data: null
        }

        return response;
    }

    const response = {
        status,
        message,
        error,
        data
    }

    return response;
}

export default { ResponseData };