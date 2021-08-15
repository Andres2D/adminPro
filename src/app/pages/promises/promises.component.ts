import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promises',
  templateUrl: './promises.component.html',
  styleUrls: ['./promises.component.css']
})
export class PromisesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

    this.getUsers().then( users => {
      console.log(users)
    });
    
    // Promises
    // const promise = new Promise( (resolve, reject) => { 

    //   if(false) {
    //     resolve('Hello world');
    //   } else {
    //     reject('Someting goes wrong');
    //   }
      
    // });

    // promise
    //   .then( (message) => {
    //     console.log(message);  
    //   })
    //   .catch( error => {
    //     console.log('Error on my promise, ' + error);
    //   });

    // console.log('End of init');
    
  }

  getUsers() {

    return new Promise( resolve => {
      fetch(`https://reqres.in/api/users`)
        .then( resp => resp.json())
        .then( body => resolve(body.data));
    });
  }

}
