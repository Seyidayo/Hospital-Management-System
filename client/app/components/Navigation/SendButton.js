import React , { Component } from 'react';

class SendNote extends Component {
    constructor(props){
        super(props)

        this.state = {
            userReg: this.props.user
        }
    
        this.del = this.del.bind(this)
    }

    send(){
        fetch('/api/account/del', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                regNumber: this.state.userReg
            })
        })
        .then(res => res.json())
        .then(json => {
            if(json.success) {
                alert(json.message)
            }
        });

        // alert(this.state.userReg)
    }

    render() {
        return (
            <button className="btn pull-right" onClick={this.send}>Send Note</button>
        )
    }
} 

export default SendNote;