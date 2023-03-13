import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import { connect } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { loginUser } from '../actions/userActions'

const LoginScreen = ({
  loginUser,
  userLogin: { loading, userInfo, error },
  location,
  history,
}) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const redirect = location.search ? location.search.split('=')[1] : '/'

  useEffect(() => {
    if (userInfo) {
      history.push(redirect)
    }
  }, [history, userInfo, redirect])

  const submitHandler = e => {
    e.preventDefault()
    // Dispatch Login
    loginUser(email, password)
  }

  return (
    <FormContainer>
      <h1>Sign In</h1>
      {error && <Message varieant='danger'>{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={e => submitHandler(e)}>
        <Form.Group controlId='email'>
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter email'
            value={email}
            onChange={e => setEmail(e.target.value)}></Form.Control>
        </Form.Group>

        <Form.Group controlId='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter email'
            value={password}
            onChange={e => setPassword(e.target.value)}></Form.Control>
        </Form.Group>

        <Button type='submit' variant='primary' className='my-3'>
          Sign In
        </Button>
      </Form>

      <Row className='py-3'>
        <Col>
          New Customer{' '}
          <Link to={redirect ? `/register?redirect=${redirect}` : `/register`}>
            Register
          </Link>
        </Col>
      </Row>
    </FormContainer>
  )
}

LoginScreen.propTypes = {
  loginUser: PropTypes.func.isRequired,
  userLogin: PropTypes.object.isRequired,
}

const mapStateToPRops = state => ({
  userLogin: state.userLogin,
})

export default connect(mapStateToPRops, { loginUser })(LoginScreen)
