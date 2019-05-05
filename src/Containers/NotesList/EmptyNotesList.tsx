import * as React from 'react';
import styled from 'styled-components';

import {Column} from "../../Components/Layout/Row";

const NewButton = styled('div')`
  color: ${props => props.theme.colors.primaryHoverText};
  border: 1px solid ${props => props.theme.colors.border};
  font-weight: ${props => props.theme.fontWeights.primaryText};
  width: 150px;
  height: 25px;
  line-height: 1.5;
  text-align: center;
  padding: 5px;
  cursor: pointer;
  z-index: 1;
  transition: background-color 0.5s;
  
  &:hover {
    background-color: ${props => props.theme.colors.primaryHoverBackground};
    color: ${props => props.theme.colors.primaryHoverText};
  }
`;

const EmptyNotesListContainer = styled(Column)`
  align-items: center;
  padding: 5px;
  // background-color: ${props => props.theme.colors.primaryHoverBackground};
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
