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
       "name": "email",
       "type": "text",
       "ui": {
          "viewMode": {
             "horizontal": {
                "label": [
                   "col-sm-2"
                ],
                "div": [
                   "col-sm-10"
                ]
             }
          },
          "label": "Email",
          "placeholder": "Email"
       }
    },
    {
       "name": "password",
       "type": "password",
       "ui": {
          "viewMode": {
             "horizontal": {
                "label": [
                   "col-sm-2"
                ],
                "div": [
                   "col-sm-10"
                ]
             }
          },
          "label": "Password",
          "placeholder": "Password"
       }
    },
    {
       "name": "radios",
       "type": "radio",
       "source": [
          {
             "value": 1,
             "text": "Male"
          },
          {
             "value": 2,
             "text": "Female"
          },
          {
             "value": 3,
             "text": "None of the above",
             "disabled": true
          }
       ],
       "ui": {
          "viewMode": {
             "horizontal": {
                "label": [
                   "col-sm-2"
                ],
                "div": [
                   "col-sm-10"
                ]
             }
          },
          "label": "Gender"
       }
    },
    {
       "name": "checkbox",
       "type": "checkbox",
       "source": [
          {
             "value": 1,
             "text": "Are you married"
          }
       ],
       "ui": {
          "viewMode": {
             "horizontal": {
                "label": [
                   "col-sm-2"
                ],
                "div": [
                   "col-sm-10"
                ]
             }
          },
          "label": "Married"
       }
    }
 ]`;
  uiBindings: any = `["email","password","radios","checkbox"]`;
  viewMode: any = 'basic'

  constructor(private _router: Router) { }

  ngOnInit(): void {
    if (sessionStorage.getItem('viewMode') != undefined && sessionStorage.getItem('viewMode') != null && sessionStorage.getItem('viewMode') != '') {
      this.viewMode = JSON.parse(sessionStorage.getItem('viewMode') || '');
    }
    if (sessionStorage.getItem('formJson') != undefined && sessionStorage.getItem('formJson') != null && sessionStorage.getItem('formJson') != '') {
      this.customJson = sessionStorage.getItem('formJson');
    }
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
      this.customJson.forEach((ele: any) => {
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
