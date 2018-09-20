import React, { Component } from 'react';

class LandingPage extends Component {
    render() {
        return(
            <div className="intro_page">
                <div className="container">
                    <div className="row">
                        <div className="">
                            <div className="col-md-5 col-md-push-7">
                                <h1 className="large_display_text">Medical <br/> Clinic</h1>
                                <p className="small_display_text">We Care, God Cures</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default LandingPage;