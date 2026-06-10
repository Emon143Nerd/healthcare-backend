export interface TErrorSources {
    path: string;
    message: string;
}

export interface TErrorResponse {
    statusCode?: number; // Optional status code for more specific error handling
    success: boolean;
    message: string;
    error?: unknown;
    errorSources?: TErrorSources[];
    stack?: string;
}