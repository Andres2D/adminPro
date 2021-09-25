import { environment } from "src/environments/environment";

const base_url: string = environment.base_url;
export class User {

    constructor(
        public name: string,
        public email: string,
        public password?: string,
        public google?: boolean,
        public role?: string,
        public _id?: string,
        public img?: string
    ) {}

    get imageUrl() {

        if(!this.img) {
            return `${base_url}/upload/users/no-image`;
        } else if(this.img.includes('https')) {
            return this.img;
        } else if(this.img) {
            return `${base_url}/upload/users/${this.img}`;
        } else{
            return `${base_url}/upload/users/no-image`;
        }
    }
}
