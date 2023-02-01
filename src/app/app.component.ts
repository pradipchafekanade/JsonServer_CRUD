import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from './api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  supplier: any;
  suppliers: any;
  editedid:any;

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.load();
  }

  load() {
    this.supplier = new FormGroup({
      id: new FormControl(""),
      name: new FormControl("", Validators.required)
    })
    this.api.get("users").subscribe((result: any) => {     
      this.suppliers = result;
    });
  }

  save(data: any) {
    
    if (data.id == "") {
      data.id = Date().toString();
      this.api.post("users",+ this.editedid+ data).subscribe((result: any) => {
        this.load();
      });
    } else {
      this.api.put("users", data).subscribe((result: any) => {
        this.load();
      });
    }
  }

  edit(data: any) {
    this.supplier = new FormGroup({
      id: new FormControl(data.id),
      name: new FormControl(data.name, Validators.required)
    });
  }

  delete(data:any) {
    if(confirm("Sure to delete?")){
      this.api.delete("users", data).subscribe((result: any) => {
        this.load();
      });
    }
  }
}






