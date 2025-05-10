import { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { BookList } from '../../types/index';
import { fetchListOverview } from '../../services/api';
import ListCard from '../../components/ListCard/ListCard';
import './ListOverview.scss';

const ListOverview = () => {
  const [lists, setLists] = useState<BookList[]>([]);
  const [loading, setLoading] = useState(true);
  const [publicationDate, setPublicationDate] = useState('');

  useEffect(() => {
    loadLists();
  }, []);

  const loadLists = async () => {
    try {
      setLoading(true);
      const data = await fetchListOverview(publicationDate || undefined);
      setLists(data);
    } catch (error) {
      console.error('Error loading lists overview:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPublicationDate(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loadLists();
  };

  return (
    <Container className="list-overview-page">
      <h2 className="section-title">Visão Geral das Listas</h2>
      
      <Form className="search-form" onSubmit={handleSubmit}>
        <Row>
          <Col md={6}>
            <Form.Group controlId="publicationDate">
              <Form.Label>Data de publicação</Form.Label>
              <Form.Control
                type="date"
                value={publicationDate}
                onChange={handleDateChange}
              />
            </Form.Group>
          </Col>
          <Col md={6} className="d-flex align-items-end mb-3">
            <Button type="submit" variant="primary">Buscar</Button>
          </Col>
        </Row>
      </Form>
      
      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <div className="list-container">
          {lists.length > 0 ? (
            <Row>
              {lists.map((list) => (
                <Col key={list.id} xs={12} className="mb-4">
                  <ListCard
                    list={list}
                    showBooks={true}
                    // Não mostramos mais as imagens já que a API não as retorna
                    showImage={false}
                  />
                </Col>
              ))}
            </Row>
          ) : (
            <div className="no-results">Nenhuma lista encontrada para a data especificada.</div>
          )}
        </div>
      )}
    </Container>
  );
};

export default ListOverview;