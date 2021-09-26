import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';

const base_url: string = environment.base_url;

@Pipe({
  name: 'image'
})
export class ImagePipe implements PipeTransform {

  transform(img: string, type: 'users'|'hospitals'|'doctors'): string {
    if( !img) {
      return `${base_url}/upload/hospitals/no-image`;
    } else if(img.includes('https')) {
        return img;
    } else if(img) {
        return `${base_url}/upload/hospitals/${img}`;
    } else{
        return `${base_url}/upload/hospitals/no-image`;
    }
  }

}
