import React, {Component } from 'react';
import { deleteFromStorage } from '../../utils/storage'


class LogoutButton extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: this.props.currentUser
        }

        this.Logout = this.Logout.bind(this)
    }

    Logout() {
        fetch('/api/account/logout', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              id: this.state.id
            })
        })
        .then(res => res.json())
        .then(json => {
        if( json.success) {
            deleteFromStorage('the_main_app');
            window.location.reload();
        }else {
            alert('Unsuccessful Log Out')       
        }
        });
    }

    render() {
        return (
            <a onClick={this.Logout} >LogOut</a>
        )
    }
}

export default LogoutButton