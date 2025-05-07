import { useState, useEffect } from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';
import { BookList } from '../../types';
import { fetchLists } from '../../services/api';
import ListCard from '../../components/ListCard/ListCard';
import './Home.scss';

const Home = () => {
  const [lists, setLists] = useState<BookList[]>([]);
  const [loading, setLoading] = useState(true);
  const [publicationDate, setPublicationDate] = useState('');

  useEffect(() => {
    loadLists();
  }, []);

  const loadLists = async (date?: string) => {
    try {
      setLoading(true);
      const data = await fetchLists(date);
      setLists(data);
    } catch (error) {
      console.error('Error loading lists:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPublicationDate(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loadLists(publicationDate);
  };

  return (
    <Container className="home-page">
      <h2 className="section-title">Best Sellers por data</h2>
      
      <Form className="search-form" onSubmit={handleSubmit}>
        <Row>
          <Col md={6} lg={4}>
            <Form.Group controlId="publicationDate">
              <Form.Label>Data de publicação</Form.Label>
              <Form.Control 
                type="date" 
                value={publicationDate} 
                onChange={handleDateChange}
              />
            </Form.Group>
          </Col>
          <Col md={6} lg={4}>
            <Form.Group controlId="lista">
              <Form.Label>Lista</Form.Label>
              <Form.Control type="text" />
            </Form.Group>
          </Col>
        </Row>
      </Form>
      
      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <div className="list-container">
          <Row>
            {lists.map((list) => (
              <Col key={list.id} md={6} lg={4} className="mb-4">
                <ListCard list={list} />
              </Col>
            ))}
          </Row>
        </div>
      )}
    </Container>
  );
};

export default Home;