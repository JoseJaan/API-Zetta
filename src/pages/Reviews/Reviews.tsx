import { useState, useEffect } from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';
import { Book } from '../../types/index';
import { searchBooks } from '../../services/api';
import BookCard from '../../components/BookCard/BookCard';
import SearchForm from '../../components/SearchForm/SearchForm';
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
 
  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
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

  useEffect(() => {
    setSearchParams({
      isbn: '',
      title: '',
      author: 'Fyodor Dostoevsky'
    });
   
    handleSubmit();
  }, []);
 
  return (
    <Container className="reviews-page">
      <h2 className="section-title">Lista de Reviews</h2>
     
      <SearchForm onSubmit={handleSubmit}>
        <Col xs={12} md={4}>
          <Form.Group controlId="isbn" className="form-group">
            <Form.Label>ISBN</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ex: 9781524763138"
              value={searchParams.isbn}
              onChange={handleInputChange}
            />
            <Form.Text className="text-light">
              Insira o ISBN completo de 10 ou 13 dígitos
            </Form.Text>
          </Form.Group>
        </Col>
        <Col xs={12} md={4}>
          <Form.Group controlId="title" className="form-group">
            <Form.Label>Título</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ex: Crime and Punishment"
              value={searchParams.title}
              onChange={handleInputChange}
            />
            <Form.Text className="text-light">
              Digite o título completo do livro
            </Form.Text>
          </Form.Group>
        </Col>
        <Col xs={12} md={4}>
          <Form.Group controlId="author" className="form-group">
            <Form.Label>Autor</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ex: Fyodor Dostoevsky"
              value={searchParams.author}
              onChange={handleInputChange}
            />
            <Form.Text className="text-light">
              Insira o nome e sobrenome do autor
            </Form.Text>
          </Form.Group>
        </Col>
      </SearchForm>
     
      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <div className="books-container">
          {searchPerformed && (
            books.length > 0 ? (
              <Row>
                {books.map((book) => (
                  <Col key={book.id} xs={12} md={6} lg={4} className="mb-4">
                    <BookCard book={book} showReviews={true} />
                  </Col>
                ))}
              </Row>
            ) : (
              <div className="no-results">Nenhuma review encontrada com os critérios de busca fornecidos.</div>
            )
          )}
        </div>
      )}
    </Container>
  );
};

export default Reviews;