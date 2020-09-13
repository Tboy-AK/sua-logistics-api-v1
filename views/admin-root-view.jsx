import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import propTypes from 'prop-types';
import styled from 'styled-components';

const ActionFormsStyles = styled.div`
  max-width: '600px';
  margin: 'auto';
  padding: '5vh 2em';
`;

const DefaultLayout = require('./layouts/default-layout');

const ActionForms = ({ title, pageName, userType }) => (
  <DefaultLayout title={title}>
    <ActionFormsStyles>
      <h1>{pageName}</h1>
      <Form method="POST" action="/admin/auths">
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" name="email" placeholder={`${userType}@email.com`} />
          <Form.Text className="text-muted">
            {'We\'ll never share your email with anyone else.'}
          </Form.Text>
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" name="password" placeholder="Password" />
        </Form.Group>

        <Form.Group controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Keep me logged in" />
        </Form.Group>

        <Button variant="primary" type="submit">Login</Button>
      </Form>
    </ActionFormsStyles>
  </DefaultLayout>
);

ActionForms.propTypes = {
  title: propTypes.string.isRequired,
  pageName: propTypes.string.isRequired,
  userType: propTypes.string.isRequired,
};

module.exports = ActionForms;
