import { useState, useEffect } from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';
import { BookList } from '../../types';
import { fetchLists } from '../../services/api';
import ListCard from '../../components/ListCard/ListCard';
import './BestSellers.scss';

const BestSellers = () => {
  const [lists, setLists] = useState<BookList[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useState({
    name: '',
    publicationDate: '',
    bestSellersDate: ''
  });

  useEffect(() => {
    loadLists();
  }, []);

  const loadLists = async () => {
    try {
      setLoading(true);
      const data = await fetchLists();
      // Sort by ranking if available
      const sortedData = data.sort((a, b) => 
        (a.ranking || Number.MAX_SAFE_INTEGER) - (b.ranking || Number.MAX_SAFE_INTEGER)
      );
      setLists(sortedData);
    } catch (error) {
      console.error('Error loading lists:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setSearchParams(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would filter the data based on search parameters
    // For this demo, we'll just reload the data
    loadLists();
  };

  return (
    <Container className="best-sellers-page">
      <h2 className="section-title">Lista de Best Sellers</h2>
      
      <Form className="search-form" onSubmit={handleSubmit}>
        <Row>
          <Col md={4}>
            <Form.Group controlId="name">
              <Form.Label>Nome</Form.Label>
              <Form.Control 
                type="text" 
                value={searchParams.name} 
                onChange={handleInputChange}
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group controlId="publicationDate">
              <Form.Label>Data de publicação</Form.Label>
              <Form.Control 
                type="date" 
                value={searchParams.publicationDate} 
                onChange={handleInputChange}
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group controlId="bestSellersDate">
              <Form.Label>Best Sellers date</Form.Label>
              <Form.Control 
                type="date" 
                value={searchParams.bestSellersDate} 
                onChange={handleInputChange}
              />
            </Form.Group>
          </Col>
        </Row>
      </Form>
      
      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <div className="lists-container">
          <Row>
            {lists.map((list) => (
              <Col key={list.id} md={6} lg={4} className="mb-4">
                <ListCard list={list} showRanking={true} />
              </Col>
            ))}
          </Row>
        </div>
      )}
    </Container>
  );
};

export default BestSellers;