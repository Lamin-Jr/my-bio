// It's usable inside the Thunk reducer method to catch the error from an unknown error message
export const thunkErrorHelper = (error: unknown) => {
    let errorMessage = '';

    if (error instanceof Error) {
        errorMessage += error.message;
    }
    return errorMessage
}