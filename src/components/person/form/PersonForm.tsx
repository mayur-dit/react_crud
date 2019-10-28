import * as React from 'react';
import {Window} from '@progress/kendo-react-dialogs';

export default class PersonForm extends React.Component {
    state: any = {};

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

    submitForm() {
        console.log('form submit.');
    }

    render() {
        return (
            <div className="text-left m-2">
                <button className="btn btn-primary" onClick={this.toggleDialog}>+ Person</button>
                {this.state.visible &&
                <Window title={'Person Form'} onClose={this.toggleDialog} initialHeight={450} initialWidth={500} initialTop={10}>
                    <h1>Hello world.</h1>
                </Window>}
            </div>
        );
    }
}