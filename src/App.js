import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import './App.css';
import { Provider } from "react-redux";
import JobCoin from './view/pages/JobCoin';

class App extends PureComponent {
  static propTypes = {
    store: PropTypes.shape({}).isRequired
  };

  render() {
    const { store } = this.props;
    return (
        <Provider store={store}>
          <JobCoin />
        </Provider>
    )
  }
}

export default App;
