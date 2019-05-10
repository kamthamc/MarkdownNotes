import * as React from 'react';
import styled from 'styled-components';

import {Column} from "../../Components/Layout/Row";

const EmptyNotesListContainer = styled(Column)`
  align-items: center;
  padding: 5px;
`;

interface EmptyNotesListProps {

}

export default class EmptyNotesList extends React.PureComponent<EmptyNotesListProps> {
    keyUpEventListener = (evt: KeyboardEvent) => {
        // console.log(evt);
        if(evt.key === 'n') {
            evt.preventDefault();
            // console.log('wohoo');
        }
    };

    componentDidMount(): void {
        document.addEventListener('keyup', this.keyUpEventListener);
    }

    componentWillUnmount(): void {
        document.removeEventListener('keyup', this.keyUpEventListener);
    }

    render() {
        return (
            <EmptyNotesListContainer>
                Add New Note by clicking on '+' icon
            </EmptyNotesListContainer>
        );
    }
}
