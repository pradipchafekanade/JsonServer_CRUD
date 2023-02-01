import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ApiService } from '../api.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  formdata:any
  users:any

  constructor( private router: Router , private api : ApiService ) { }

  ngOnInit(): void {
    this.load();
  }

  load() {
    this.formdata = new FormGroup({
      id: new FormControl(""),
      tname: new FormControl("", Validators.required),
      temail: new FormControl("", Validators.required),
      tdate: new FormControl("", Validators.required),
      timage: new FormControl("", Validators.required)



    })
    this.api.get("work").subscribe((result: any) => {
      console.log(result);
      
      this.users = result;
    });
  }

  save(data: any) {
    console.log(data); 
      this.api.post("work", data).subscribe((result: any) => {
        this.load();
        console.log(data);
      });
    }
  

  edit(data: any) {
    this.formdata = new FormGroup({
      id: new FormControl(data.id),
      tname: new FormControl(data.tname, Validators.required),
      temail: new FormControl(data.temail, Validators.required),
      tdate: new FormControl(data.tdate, Validators.required),
      timage: new FormControl(data.timage, Validators.required)

    });
  }

  delete(data:any) {
    if(confirm("Sure to delete?")){
      this.api.delete("work", data).subscribe((result: any) => {
        this.load();
      });
    }
  }
}






