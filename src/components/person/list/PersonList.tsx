import * as React from 'react';

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
            <table className='table table-striped' aria-labelledby="tabelLabel">
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Hobbies</th>
                    <th>Address Title</th>
                </tr>
                </thead>
                <tbody>
                {persons.map(person =>
                    <tr key={person.personId}>
                        <td>{person.name}</td>
                        <td>{person.hobbies}</td>
                        <td>{person.addressTitle}</td>
                    </tr>
                )}
                </tbody>
            </table>
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