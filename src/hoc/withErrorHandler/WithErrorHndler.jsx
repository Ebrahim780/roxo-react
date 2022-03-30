import React, { Component } from 'react';
import Modal from '../../components/UI/modal/Modal';
import Aux from '../Auxx/Auxx';

const WithErrorHndler = (WrappedComponent, axios) => {
  return class extends Component {
    state = {
      error: null
    }

    errorConfirmedHandler = () => {
      this.setState({ error: null })
    }

    // UNSAFE_componentWillMount() {
    //   axios.interceptors.request.use(requestInterceptor => {
    //     this.setState({ error: null })
    //     return requestInterceptor
    //   })

    //   axios.interceptors.response.use(responseInterceptor => responseInterceptor, error => {
    //     this.setState({ error: error })
    //   })

    //   axios.interceptors.request.eject(this.requestInterceptor)
    //   axios.interceptors.response.eject(this.responseInterceptor)
    // }

    render() {
      return (
        <Aux>
          <Modal show={this.state.error} modalClosed={this.errorConfirmedHandler}>
            {this.state.error ? this.state.error.message : null}
          </Modal>
          <WrappedComponent {...this.props} />
        </Aux>
      )
    }
  }
}

export default WithErrorHndler;