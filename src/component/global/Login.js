/**
 * Created by lmarin on 03/05/2018.
 */
import React, { Component } from 'react';
import API from '../../config/API';
import Modal from 'react-bootstrap-modal';
import sessionState from "../../functions/sessionState";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email : '',
            password : '',
            open : false,
            openModalMessage: false,
            ModalMessage : "",
        }
    }
    componentWillMount() {
        sessionState.redirectHome(this.props);
    }

    onChange = (e) =>{
        const state = this.state;
        state[e.target.name] = e.target.value;
        this.setState(state);
    }

    onClickValidate = (e) =>{
        sessionState.validateUser(this.state.email,this.state.password,this.props,(result)=>{
            this.setState({
                ModalMessage:result.message,
                openModalMessage:true,
            });

        });
    }

    rememberClick = () =>{
        this.setState({
            open : true
        })
    }

    render(){
        let closeModal = () => this.setState({ open: false });
        let closeModalMessage = () => this.setState({ openModalMessage: false });
        return (
            <div className="">
                <div className="center-block width-total">
                    <div className="col-lg-3"></div>
                    <div className="card card-container col-lg-6 center-block">
                        {/*<!-- <img class="profile-img-card" src="//lh3.googleusercontent.com/-6V8xOA6M7BA/AAAAAAAAAAI/AAAAAAAAAAA/rzlHcD0KYwo/photo.jpg?sz=120" alt="" /> -->*/}
                        {/*<img id="profile-img" className="profile-img-card" src="//ssl.gstatic.com/accounts/ui/avatar_2x.png" />*/}
                        <p id="profile-name" class="profile-name-card"></p>
                        <form class="form-signin">
                            <span id="reauth-email" className="reauth-email"></span>
                            <input onChange={this.onChange} name="email" type="email" id="inputEmail" className="form-control login" placeholder="Email" required autofocus />
                            <input onChange={this.onChange} name="password" type="password" id="inputPassword" className="form-control login" placeholder="Contraseña" required />
                            <div id="remember" className="checkbox">
                                {/*<label>
                                    <input type="checkbox" value="remember-me" /> Remember me
                                </label>*/}
                            </div>
                            <button onClick={this.onClickValidate} className="btn btn-lg btn-primary btn-block btn-signin" type="button">Entrar</button>
                        </form>{/*<!-- /form -->*/}
                        <br />
                        <a href="javascript:void(0)" onClick={this.rememberClick} className="forgot-password">
                            ¿Has olvidado tu contraseña?
                        </a>
                    </div>{/*<!-- /card-container -->*/}
                    <div className="col-lg-3"></div>
                </div>
                <Modal
                    show={this.state.open}
                    onHide={closeModal}
                    aria-labelledby="ModalHeader"
                    className="show"
                >
                    <Modal.Header closeButton>
                        <Modal.Title id='ModalHeader'>Información</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        ¿Has perdido tu contraseña? Para mas informacion puede contactar a los telefonos 0500-RIMAC
                    </Modal.Body>
                    <Modal.Footer>
                        <Modal.Dismiss className='btn btn-default'>Cerrar</Modal.Dismiss>
                    </Modal.Footer>
                </Modal>
                <Modal
                    show={this.state.openModalMessage}
                    onHide={closeModalMessage}
                    aria-labelledby="ModalHeader"
                    className="show"
                >
                    <Modal.Header closeButton>
                        <Modal.Title id='ModalHeader'>Información</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {this.state.ModalMessage}
                    </Modal.Body>
                    <Modal.Footer>
                        <Modal.Dismiss className='btn btn-default'>Aceptar</Modal.Dismiss>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}

export default Login;