import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import { connect } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { register } from '../actions/userActions'

const RefisterScreen = ({
  register,
  userRegister: { loading, userInfo, error },
  location,
  history,
}) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [password2, setPassword2] = useState('')
  const [message, setMessage] = useState(null)

  const redirect = location.search ? location.search.split('=')[1] : '/'

  useEffect(() => {
    if (userInfo) {
      history.push(redirect)
    }
  }, [history, userInfo, redirect])

  const submitHandler = e => {
    e.preventDefault()
    if (password !== password2) {
      setMessage('Password do not match')
    } else {
      register(name, email, password)
    }
  }

  return (
    <FormContainer>
      <h1>Sign Up</h1>
      {message && <Message varieant='danger'>{message}</Message>}
      {error && <Message varieant='danger'>{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={e => submitHandler(e)}>
        <Form.Group controlId='name'>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter Name'
            value={name}
            onChange={e => setName(e.target.value)}></Form.Control>
        </Form.Group>

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

        <Form.Group controlId='password2'>
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter email'
            value={password2}
            onChange={e => setPassword2(e.target.value)}></Form.Control>
        </Form.Group>

        <Button type='submit' variant='primary' className='my-3'>
          Register
        </Button>
      </Form>

      <Row className='py-3'>
        <Col>
          Already have an Account{' '}
          <Link to={redirect ? `/login?redirect=${redirect}` : `/login`}>
            Login
          </Link>
        </Col>
      </Row>
    </FormContainer>
  )
}

RefisterScreen.propTypes = {
  register: PropTypes.func.isRequired,
  userRegister: PropTypes.object.isRequired,
}

const mapStateToPRops = state => ({
  userRegister: state.userRegister,
})

export default connect(mapStateToPRops, { register })(RefisterScreen)
