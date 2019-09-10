class FormBuilderController {
  // injection here
  static get $inject() {
    return [
      'OdsFormService',
    ];
  }

  constructor(OdsFormService) {
    this.odsFormService = OdsFormService;
    this.cssClass = 'form-print';
  }

  init() {
    this.config = {
      ckeditor: {
        suggestionsUrl: 'http://localhost:63342/ods-lib/angular-component-seed/examples/forms/resources/suggestions.json',
        tokensUrl: 'http://localhost:63342/ods-lib/angular-component-seed/examples/forms/resources/tokens.json',
        suggestions: [
          {
            id: 'patientName',
            label: 'Patient Name',
          },
          {
            id: 'patientDob',
            label: 'Patient DOB',
          },
          {
            id: 'patientGender',
            label: 'Patient Gender',
          },
          {
            id: 'patientMaritalStatus',
            label: 'Patient Marital Status',
          },
        ],
      },
    };

    this.runTimeConfig = {
      ckeditor: {
        tokens: {
          patientName: 'Hermes Lorenzo',
          patientDob: '01/24/1980',
          patientGender: 'Male',
          patientMaritalStatus: 'Single',
        },
      },
    };
  }

  saveForm(schema) {
    const data = this.odsFormService.saveFormData(schema);
    console.log(`The form data is: ${JSON.stringify(data, null, 4)}`);
  }

  toggleStyle() {
    this.cssClass = this.cssClass === 'form-print' ? 'form-print1' : 'form-print';
  }
}

export default FormBuilderController;
