import { useState, useEffect } from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';
import { BookList } from '../../types';
import { fetchLists } from '../../services/api';
import ListCard from '../../components/ListCard/ListCard';
import './ListOverview.scss';

const ListOverview = () => {
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
    <Container className="list-overview-page">
      <h2 className="section-title">Lista de Overview</h2>
      
      <Form className="search-form" onSubmit={handleSubmit}>
        <Row>
          <Col>
            <Form.Group controlId="publicationDate">
              <Form.Label>Data de publicação</Form.Label>
              <Form.Control 
                type="date" 
                value={publicationDate} 
                onChange={handleDateChange}
              />
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
              <Col key={list.id} xs={12} className="mb-4">
                <ListCard 
                  list={{
                    ...list,
                    image: "https://via.placeholder.com/150" // Adding placeholder for display purposes
                  }} 
                  showImage={true}
                />
              </Col>
            ))}
          </Row>
        </div>
      )}
    </Container>
  );
};

export default ListOverview;