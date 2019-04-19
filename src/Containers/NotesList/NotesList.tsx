import * as React from 'react';

interface Props {
    addNewNote: ({}) => void,
}

class NotesList extends React.PureComponent<Props>{


    componentDidMount() {
        this.props.addNewNote({});
    }


    render() {
        return (
            <div>
                Test
            </div>
        );
    }


}


export default NotesList;
