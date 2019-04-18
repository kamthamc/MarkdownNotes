import * as React from 'react';

interface Props {
    name: string
}

export class App extends React.Component<Props> {
    render() {
        return <div>Hello {this.props.name}</div>;
    }
}
