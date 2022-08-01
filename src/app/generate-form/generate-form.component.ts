import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-generate-form',
  templateUrl: './generate-form.component.html',
  styleUrls: ['./generate-form.component.scss']
})
export class GenerateFormComponent implements OnInit {

  customJson: any = `[
    {
      "type": "text",
      "name": "firstName",
      "ui": {
        "label": "First Name",
        "placeholder": "Enter Your First Name"
      }
    }
  ]`;
  uiBindings: any = `["firstName"]`;
  viewMode: string = 'basic'

  constructor(private _router: Router) { }

  ngOnInit(): void {
  }
  // ++++++++++++ Form Submit +++++++++++++++++
  formSubmit() {
    console.log("Submitted Form Data:- ", this.customJson);
  }
  // +++++++++++ Form Preview  ++++++++++++++++ 
  formPreview() {
    this.uiBindings = JSON.parse(this.uiBindings);
    this.customJson = JSON.parse(this.customJson);

    if (this.viewMode != undefined && this.viewMode != null && this.uiBindings != undefined && this.uiBindings != null && this.uiBindings.length > 0 && this.customJson != undefined && this.customJson != null && Object.keys(this.customJson).length > 0) {
      this.uiBindings = [];
      this.customJson.forEach((ele:any)=>{        
        this.uiBindings.push(ele.name);       
      })
      sessionStorage.setItem('viewMode', JSON.stringify(this.viewMode));
      sessionStorage.setItem('uiBindings', JSON.stringify(this.uiBindings));
      sessionStorage.setItem('formJson', JSON.stringify(this.customJson));
      this._router.navigate(['form-preview']);
    }
    else {
      confirm("There is some error in these data :- viewMode, uiBindings, formJson, form-preview")
    }
  }

}
