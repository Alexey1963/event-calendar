import React from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';
const password = '123';

class Login extends React.Component {

    state = {
        login: ''
    }
    
    changeInput = (e, item) => {
        this.setState({[item]: e.currentTarget.value})
    }

    submit = (e) => {
        e.preventDefault()

        const {history} = this.props

        const fd = new FormData(e.target);
        const login = fd.get("login");
        // console.log(login, password)
        this.props.callBack(0,'joker')
        if(login !== password) {
            // console.log(history)
            history('/')
        }
    }
        
    render() {
        const {login} = this.state

        return (
            <div className='login'>
                <form className='form' onSubmit={(e) => this.submit(e)}>
                    <label className='label'>
                        <p>Пароль</p>
                        <input name='login'
                            className='input'
                            value={login} 
                            onChange={e => this.changeInput(e,'login')} 
                        />
                    </label>
                    <div className='footer'>
                        <button>Подтвердить</button>
                    </div>
                </form>
            </div>
        )
    }
}

function LoginPage(props) {
    const history = useNavigate()
    return <Login {...props} history={history} />
}

export default LoginPage;

