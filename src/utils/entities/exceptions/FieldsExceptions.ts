export default class FieldException extends Error {
    constructor(message: string) {
        super(message);
    }
}