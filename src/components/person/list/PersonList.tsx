import * as React from 'react';
import {Grid, GridColumn as Column} from '@progress/kendo-react-grid';
import {IPersonSharedData} from '../interfaces/IPersonSharedData';
import {IPerson} from '../interfaces/IPerson';

type PushesPropsType = { data: IPersonSharedData };
export default class PersonList extends React.Component<PushesPropsType, {}> {
    state = {
        forecasts: [],
        loading: false,
    };

    constructor(props: any) {
        super(props);
        this.props.data.personListRefresh.subscribe(async () => {
            await this.loadPersonsData();
        });
    }

    async componentDidMount() {
        await this.loadPersonsData();
    }

    async deleteClicked(person: IPerson) {
        await this.deletePerson(person);
    }

    async editClicked(person: IPerson) {
        this.props.data.personEditMode.next(person);
    }

    renderForecastsTable(persons: any[]) {
        return (
            <div className="p-2">
                <Grid
                    className="table table-sm"
                    style={{height: '400px'}}
                    data={[...persons]}>
                    <Column field="personId" title="ID" width="40px"/>
                    <Column field="name" title="Name" width="250px"/>
                    <Column field="hobbies" title="Hobbies"/>
                    <Column field="addressTitle" title="Address Title"/>
                    <Column
                        field="addressTitle"
                        width={150}
                        cell={props => (
                            <td>
                                <button className="btn btn-sm btn-secondary" onClick={this.editClicked.bind(this, props.dataItem)}>Edit</button>
                                <button className="btn btn-sm btn-secondary ml-2" onClick={this.deleteClicked.bind(this, props.dataItem)}>Delete</button>
                            </td>
                        )}
                    />
                </Grid>
            </div>
        );
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderForecastsTable(this.state.forecasts);
        return (
            <div>{contents}</div>
        );
    }

    async deletePerson(person: IPerson) {
        let res = await fetch('http://localhost:8888/api/person/deleteperson?personId=' + person.personId, {
            method: 'DELETE',
            headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
        });
        if (res && res.statusText === 'OK') {
            this.props.data.personListRefresh.next(this.props.data.personListRefresh.value + 1);
        }
    }

    async loadPersonsData() {
        const response = await fetch('http://localhost:8888/api/person/getpersons');
        const data = await response.json();
        this.setState({forecasts: data, loading: false});
    }
}