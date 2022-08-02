import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DynamicFormBuildConfig, DynamicFormConfiguration, RxDynamicFormBuilder } from '@rxweb/reactive-dynamic-forms';
import { ReactiveFormConfig } from '@rxweb/reactive-form-validators';

@Component({
  selector: 'app-form-preview',
  templateUrl: './form-preview.component.html',
  styleUrls: ['./form-preview.component.scss']
})
export class FormPreviewComponent implements OnInit {

  dynamicFormBuildConfig!: DynamicFormBuildConfig;
  dynamicFormConfiguration!: DynamicFormConfiguration;
  uiBindings: any[] = [];
  viewMode: string = 'basic';
  formJson: any[]=[] ;

  constructor(private _router: Router, private _dynamicFormBuilder: RxDynamicFormBuilder) { }

  ngOnInit(): void {
    // ++++++++++++ Fetch Data from Session Storage +++++++++++ 
    this.viewMode = JSON.parse(sessionStorage.getItem('viewMode') || '');
    this.uiBindings = JSON.parse(sessionStorage.getItem('uiBindings') || '');
    this.formJson = JSON.parse(sessionStorage.getItem('formJson') || '');

    ReactiveFormConfig.set({
      validationMessage: {
        required: 'This Field is required',
      }
    })
    this.dynamicFormConfiguration = {
      controlConfigModels: [] ,//{ modelName: "state", model: StateModel }  
      additionalConfig: [
        {
          type: 'card',
          name: 'addressSection',
          childrens: [
            {
              type: 'card-header',
              props:
              {
                text: 'Address'
              }
            },
            {
              type: 'card-body',
              childrens: ['t1','t2']
            }
          ],
          skipDefaultView: true
        }]

    }
    this.dynamicFormBuildConfig = this._dynamicFormBuilder?.formGroup(this.formJson, this.dynamicFormConfiguration);
  }
  // ++++++++++ Move Back ++++++++++++ 
  moveBack() {
    this._router.navigate(['/'])
  }

}
