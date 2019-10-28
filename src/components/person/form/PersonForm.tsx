import * as React from 'react';
import {Window} from '@progress/kendo-react-dialogs';
import {IPersonSharedData} from '../interfaces/IPersonSharedData';

const txtFieldState = {value: '', valid: true, typeMismatch: false, errMsg: ''};
const ErrorValidationLabel = ({txtLbl}: any) => (<label htmlFor="" style={{color: 'red'}}>{txtLbl}</label>);

type PushesPropsType = { data: IPersonSharedData };

export default class PersonForm extends React.Component<PushesPropsType, {}> {

    reduceFormValues = (formElements: any) => {
        const arrElements = Array.prototype.slice.call(formElements); //we convert elements/inputs into an array found inside form element

        //we need to extract specific properties in Constraint Validation API using this code snippet
        const formValues = arrElements
            .filter((elem: any) => elem.name.length > 0)
            .map((x: any) => {
                const {typeMismatch} = x.validity;
                const {name, type, value} = x;
                return {name, type, typeMismatch, value, valid: x.checkValidity()};
            })
            .reduce((acc: any, currVal: any) => {
                //then we finally use reduce, ready to put it in our state
                const {value, valid, typeMismatch, type} = currVal;
                const {fieldName, requiredTxt, formatErrorTxt} = this.state[currVal.name]; //get the rest of properties inside the state object

                //we'll need to map these properties back to state so we use reducer...
                acc[currVal.name] = {value, valid, typeMismatch, fieldName, requiredTxt, formatErrorTxt};
                return acc;
            }, {});

        return formValues;
    }

    checkAllFieldsValid = (formValues: any) => {
        return !Object.keys(formValues).map(x => formValues[x]).some(field => !field.valid);
    }

    state: any = {
        name: {...txtFieldState, fieldName: 'Name', required: true, requiredTxt: 'Name is required'},
        hobbies: {...txtFieldState, fieldName: 'hobbies', required: true, requiredTxt: 'Hobbies is required'},
        address: {...txtFieldState, fieldName: 'address', required: true, requiredTxt: 'Address is required'},
    };

    constructor(props: any) {
        super(props);
        this.toggleDialog = this.toggleDialog.bind(this);
        this.submitForm = this.submitForm.bind(this);
    }

    toggleDialog() {
        this.setState({
            visible: !this.state.visible
        });
    }

    async submitForm() {
        const form: any = document.getElementById('idForm');

        //we need to extract specific properties in Constraint Validation API using this code snippet
        const formValues = this.reduceFormValues(form.elements);
        const allFieldsValid = this.checkAllFieldsValid(formValues);
        //note: put ajax calls here to persist the form inputs in the database.
        this.setState({...formValues, allFieldsValid}); //we set the state based on the extracted values from Constraint Validation API

        if (allFieldsValid) {
            await this.savePerson(formValues);
        }
    }

    async savePerson(formValues: any) {
        let res = await fetch('http://localhost:8888/api/person/addperson', {
            method: 'POST',
            headers: {'Accept': 'application/json', 'Content-Type': 'application/json',},
            body: JSON.stringify({
                'Name': formValues.name.value,
                'Hobbies': formValues.hobbies.value,
                'AddressId': parseInt(formValues.address.value),
                'CreatedDate': new Date().toISOString()
            })
        });
        if (res && res.statusText === 'OK') {
            this.toggleDialog();
            this.props.data.personListRefresh.next(this.props.data.personListRefresh.value + 1);
        }
    }

    render() {

        const {name, hobbies, address, allFieldsValid} = this.state;
        const successFormDisplay = allFieldsValid ? 'block' : 'none';
        const inputFormDisplay = !allFieldsValid ? 'block' : 'none';
        const renderNameValidationError = name.valid ? ('') : (<ErrorValidationLabel txtLbl={name.requiredTxt}/>);
        const renderHobbiesValidationError = hobbies.valid ? ('') : (<ErrorValidationLabel txtLbl={name.requiredTxt}/>);
        const renderAddressValidationError = address.valid ? ('') : (<ErrorValidationLabel txtLbl={name.requiredTxt}/>);

        return (
            <div className="text-left m-2">
                <button className="btn btn-primary" onClick={this.toggleDialog}>+ Person</button>
                {this.state.visible &&
                <Window title={'Person Form'} onClose={this.toggleDialog} initialHeight={450} initialWidth={500} initialTop={10}>
                    <form id="idForm" noValidate>
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Name</label>
                            <input name="name" type="text" className="form-control" placeholder="Please enter person name" required/>
                            {renderNameValidationError}
                        </div>

                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Hobbies</label>
                            <input name="hobbies" type="text" className="form-control" placeholder="Please enter your hobbies" required/>
                            {renderHobbiesValidationError}
                        </div>

                        <div className="form-group">
                            <label htmlFor="exampleFormControlSelect1">Address</label>
                            <select name="address" className="form-control" required>
                                <option value="1">USA</option>
                                <option value="2">India</option>
                            </select>
                            {renderAddressValidationError}
                        </div>

                        <button type="button" onClick={this.submitForm} className="btn btn-primary">Submit</button>
                    </form>
                </Window>}
            </div>
        );
    }
}