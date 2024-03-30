export default class FieldException extends Error {
    private location: string[] = [];
    constructor(message: string, local: string | string[]) {
        super(message);
        if (Array.isArray(local)) {
            this.location = local;
        } else {
            this.location = [local];
        }
    }
    public getLocation() {
        return this.location;
    }
}