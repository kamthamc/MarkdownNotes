import styled from 'styled-components';
import { Column, Row } from "../../Components/Layout/Row";

export const NotesListContainerDiv = styled(Row)`
  padding: 0;
  height: 100%;
`;

export const NotesTitleListContainerDiv = styled(Column)`
  flex: 0.3;
  border: 1px solid ${props => props.theme.colors.border};
`;

export const NoteLabelContainer = styled(Column)`
  padding: 5px;
  cursor: pointer;
  border-bottom: 1px dotted ${props => props.theme.colors.border};
  &:last-child {
    border-bottom: none;
  }
`;

export const NoteTitle = styled('div')`
  padding: 2px;
  font-size: 14px;
  font-weight: bold;
`;
export const LastUpdated = styled('div')`
  padding: 2px;
  font-size: 12px;
`;

export const MarkdownContainerDiv = styled('div')`
  flex: 0.7;
  padding-left: 1px;
`;

export const NotesListHeader = styled(Row)`
  padding: 5px;
  flex: 1;
  background-color: ${props => props.theme.colors.primaryHoverBackground};
  color: ${props => props.theme.colors.primaryHoverText};
  height: 40px;
  max-height: 40px;
`;

export const NotesListHeaderTitle = styled(Row)`
  padding: 5px;
  flex: 0.6;
  align-items: center;
  justify-content: flex-end;
`;


export const MarkdownHeader = styled(Row)`
  padding: 5px;
  flex: 1;
  background-color: ${props => props.theme.colors.primaryHoverBackground};
  color: ${props => props.theme.colors.primaryHoverText};
  height: 40px;
  max-height: 40px;
`;

export const MarkdownHeaderTitle = styled(Row)`
  padding: 5px;
  flex: 0.6;
  align-items: center;
  justify-content: flex-end;
  height: 30px;
  max-height: 30px;
`;


export const NotesListHeaderActions = styled(Row)`
  padding: 5px;
  flex: 0.4;
  align-items: center;
  justify-content: end;
  flex-direction: row-reverse;
`;

export const NotesListHeaderActionItem = styled(Row)`
  height: 20px;
  align-items: center;
  justify-content: center;
  padding: 3px 8px;
  border: 1px solid ${props => props.theme.colors.borderHover};
  cursor: pointer;
`;