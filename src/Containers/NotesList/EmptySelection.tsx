import * as React from 'react';

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
            <div>
                Please select a note continue.
            </div>
        );
    }
}

export default EmptySelection;