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
             "advance": {
                "div": [
                   "col-md-6",
                   "col-sm-6"
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
             "advance": {
                "div": [
                   "col-md-6",
                   "col-sm-6"
                ]
             }
          },
          "label": "Password",
          "placeholder": "Password"
       }
    },
    {
       "name": "address",
       "type": "text",
       "ui": {
          "viewMode": {
             "advance": {
                "div": [
                   "col-md-12",
                   "col-sm-12"
                ]
             }
          },
          "label": "Address",
          "placeholder": "1234 Main St"
       }
    },
    {
       "name": "address2",
       "type": "text",
       "ui": {
          "viewMode": {
             "advance": {
                "div": [
                   "col-md-12",
                   "col-sm-12"
                ]
             }
          },
          "label": "Address 2",
          "placeholder": "Apartment, studio or floor"
       }
    },
    {
       "name": "city",
       "type": "text",
       "ui": {
          "viewMode": {
             "advance": {
                "div": [
                   "col-md-6",
                   "col-sm-6"
                ]
             }
          },
          "label": "City"
       }
    },
    {
       "name": "state",
       "type": "select",
       "source": [
          {
             "value": 1,
             "text": "..."
          }
       ],
       "ui": {
          "viewMode": {
             "advance": {
                "div": [
                   "col-md-4",
                   "col-sm-4"
                ]
             }
          },
          "label": "State",
          "placeholder": "Choose"
       }
    },
    {
       "name": "zip",
       "type": "text",
       "ui": {
          "viewMode": {
             "advance": {
                "div": [
                   "col-md-2",
                   "col-sm-2"
                ]
             }
          },
          "label": "Zip"
       }
    },
    {
       "name": "check",
       "type": "checkbox",
       "source": [
          {
             "value": 1,
             "text": "Check me out"
          }
       ],
       "ui": {
          "viewMode": {
             "advance": {
                "div": [
                   "col-md-12",
                   "col-sm-12"
                ]
             }
          }
       }
    }
 ]`;
  uiBindings: any = `[["email", "password"], "address", "address2", ["city", "state", "zip"],"check"]`;
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
