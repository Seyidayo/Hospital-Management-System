import React , { Component } from 'react';

class DeleteButton extends Component {
    constructor(props){
        super(props)

        this.state = {
            userReg: this.props.user
        }
    
        this.del = this.del.bind(this)
    }

    del(){
        var affirm = confirm("Confirm?");

        if(affirm){
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
                    window.location.reload()
                }
            });
        }
        // alert(this.state.userReg)
    }

    render() {
        return (
            <button className="btn pull-right" onClick={this.del}>Delete</button>
        )
    }
}
export default DeleteButton