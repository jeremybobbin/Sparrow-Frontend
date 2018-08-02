import React from 'react';


export default class CardAdder extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            add: props.add,
            name: '',
            url: '',
        };
    }

    updateName(e) {
        this.setState({
            ...this.state,
            name: e.target.value
        });
    }

    updateUrl(e) {
        this.setState({
            ...this.state,
            url: e.target.value
        });
    }

    add(e) {
        e.preventDefault();
        if(!this.state.name || !this.state.url) return alert('Fields are empty');
        this.state.add(
            this.state.name,
            this.state.url
        );
    }

    render() {
        return (
            <form className='card-adder'>
                <input className="form-control" value={this.state.name} onChange={(e) => this.updateName(e)} id="inputEmail4" placeholder="Campaign Name" />
                <input className="form-control" value={this.state.url} onChange={(e) => this.updateUrl(e)} id="inputEmail4" placeholder="Site URL" />
                <button type="button" onClick={(e) => this.add(e)} className="btn btn-success">Add Campaign</button>
            </form>
        );
    }
}