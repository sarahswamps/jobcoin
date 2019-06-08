import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { connect } from 'react-redux';
import {createStructuredSelector} from "reselect";
import styles from '../JobCoin.module.css'

class _Login extends PureComponent {
    static propTypes = {
        signInWithAddress: PropTypes.func,
    };
    state = {
        address: '',
    }
    componentDidMount(){
        this.nameInput.focus();
      }
    handleSignIn = () => {
        this.props.signInWithAddress(this.state.address);
    }
    handleChange = (event) => {
        this.setState({ address: event.target.value });
    }
    render() {
        return (
            <div className={cx(styles.wrapper, styles.login)}>
                <div className={styles.logo}>JC</div>
                <div className={styles.box}>
                    <div className={styles.boxTitle}>Welcome!  Sign in with your jobcoin address</div>
                    <div className={styles.boxBody}>
                        <label>
                            Jobcoin Address:
                            <input
                                ref={input => { this.nameInput = input; }} 
                                type="text"
                                value={this.state.address}
                                onChange={this.handleChange}
                            />
                        </label>
                        <div className={styles.button} onClick={this.handleSignIn}>Sign In</div>
                    </div>

                </div>

            </div>
        )
    }
}

const mapSelectors = createStructuredSelector({
});
const mapActionCreators = {
    signInWithAddress: (address) => ({
        type: 'SIGN_IN',
        address,
    })
};

export default connect(mapSelectors, mapActionCreators) (_Login);
