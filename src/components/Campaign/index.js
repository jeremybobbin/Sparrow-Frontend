import React from 'react';

import Head from './Head';
import Settings from './Settings';
import Sidebar from './Sidebar';


export default class Campaign extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false
        };
    }

    open() {
        const isOpen = !this.state.isOpen;
        this.setState({ isOpen });
    }

    render() {
        console.log(this.props);
        const {
            id,
            name,
            url,
            isEnabled,
            message,
            effect,
            leadCount,
            location,
            update,
            remove,
            toggle,
            toLeads,    
        } = this.props;
        return (
            <div className='campaign'>
                
                <Head
                    update={(k, v) => update(k, v)}
                    name={name}
                    url={url}
                    isOpen={this.state.isOpen}
                />
                
                <Sidebar
                    remove={() => remove(id)}
                    toLeads={() => toLeads(id)}
                    toggleSettings={() => this.open()}
                    toggleSwitch={() => toggle('isEnabled')}
                    isOn={isEnabled}
                />
                
                <Settings
                    isVisible={this.state.isOpen}
                    onChange={(k, v) => update(k, v)}
                    location={location}
                    effect={effect}
                    message={message}
                />

            </div>
        );
    }
}

