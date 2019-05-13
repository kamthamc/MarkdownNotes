import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import { getMarkdownHTML } from '../../Helpers/Markdown';
class EmptySelection extends React.PureComponent {

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

    render(): React.ReactNode {
        return (
            <Typography
                style={{ flexGrow: 1, padding: '20px' }}
                variant="h6"
            >
                Please select a note continue.
            </Typography>
        );
    }
}

export default EmptySelection;
