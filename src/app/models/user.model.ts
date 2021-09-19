
export class user {

    constructor(
        public name: string,
        public email: string,
        public password?: string,
        public google?: boolean,
        public role?: string,
        public _id?: string
    ) {}
}
