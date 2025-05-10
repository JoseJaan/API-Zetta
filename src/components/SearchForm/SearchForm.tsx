import React from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import './SearchForm.scss';

interface SearchFormProps {
  onSubmit: (e: React.FormEvent) => void;
  children: React.ReactNode;
  buttonText?: string;
}

const SearchForm: React.FC<SearchFormProps> = ({ 
  onSubmit, 
  children, 
  buttonText = "Buscar" 
}) => {
  return (
    <Form className="search-form" onSubmit={onSubmit}>
      <Row>
        {children}
      </Row>
      <Row className="mt-3">
        <Col xs={12}>
          <div className="d-flex justify-content-end">
            <Button type="submit" variant="primary">{buttonText}</Button>
          </div>
        </Col>
      </Row>
    </Form>
  );
};

export default SearchForm;