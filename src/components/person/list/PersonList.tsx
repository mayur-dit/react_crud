import * as React from 'react';
import {Grid, GridColumn as Column} from '@progress/kendo-react-grid';

export default class PersonList extends React.Component {
    state = {
        forecasts: [],
        loading: false,
    };

    constructor(props: any) {
        super(props);
    }

    async componentDidMount() {
        await this.populateWeatherData();
    }

    static renderForecastsTable(persons: any[]) {
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
                </Grid>
            </div>
        );
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : PersonList.renderForecastsTable(this.state.forecasts);
        return (
            <div>{contents}</div>
        );
    }

    async populateWeatherData() {
        const response = await fetch('http://localhost:8888/api/person/getpersons');
        const data = await response.json();
        this.setState({forecasts: data, loading: false});
    }
}