import { useState } from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';
import { Book } from '../../types/index';
import { searchBooks } from '../../services/api';
import BookCard from '../../components/BookCard/BookCard';
import './Reviews.scss';

const Reviews = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [searchParams, setSearchParams] = useState({
    isbn: '',
    title: '',
    author: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setSearchParams(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSearchPerformed(true);
    
    try {
      const results = await searchBooks(searchParams);
      setBooks(results);
    } catch (error) {
      console.error('Error searching books:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="reviews-page">
      <h2 className="section-title">Lista de Reviews</h2>
      
      <Form className="search-form" onSubmit={handleSubmit}>
        <Row>
          <Col md={4}>
            <Form.Group controlId="isbn">
              <Form.Label>ISBN</Form.Label>
              <Form.Control 
                type="text" 
                value={searchParams.isbn} 
                onChange={handleInputChange}
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group controlId="title">
              <Form.Label>Título</Form.Label>
              <Form.Control 
                type="text" 
                value={searchParams.title} 
                onChange={handleInputChange}
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group controlId="author">
              <Form.Label>Autor</Form.Label>
              <Form.Control 
                type="text" 
                value={searchParams.author} 
                onChange={handleInputChange}
              />
            </Form.Group>
          </Col>
        </Row>
      </Form>
      
      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <div className="books-container">
          {searchPerformed && (
            books.length > 0 ? (
              <Row>
                {books.map((book) => (
                  <Col key={book.id} md={6} lg={4} className="mb-4">
                    <BookCard book={book} />
                  </Col>
                ))}
              </Row>
            ) : (
              <div className="no-results">No books found matching your search criteria.</div>
            )
          )}
        </div>
      )}
    </Container>
  );
};

export default Reviews;