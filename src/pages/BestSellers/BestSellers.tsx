import { useState, useEffect } from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';
import { BookList } from '../../types';
import { fetchLists } from '../../services/api';
import ListCard from '../../components/ListCard/ListCard';
import SearchForm from '../../components/SearchForm/SearchForm';
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
      const data = await fetchLists(
        searchParams.publicationDate || undefined,
        searchParams.bestSellersDate || undefined
      );
     
      // Filtrar por nome se fornecido
      const filteredData = searchParams.name
        ? data.filter(list =>
            list.name.toLowerCase().includes(searchParams.name.toLowerCase()) ||
            list.displayName.toLowerCase().includes(searchParams.name.toLowerCase())
          )
        : data;
     
      // Sort by ranking if available
      const sortedData = filteredData.sort((a, b) =>
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
    loadLists();
  };
  
  return (
    <Container className="best-sellers-page">
      <h2 className="section-title">Lista de Best Sellers</h2>
     
      <SearchForm onSubmit={handleSubmit}>
        <Col md={4}>
          <Form.Group controlId="name" className="form-group">
            <Form.Label>Nome</Form.Label>
            <Form.Control
              type="text"
              value={searchParams.name}
              onChange={handleInputChange}
              placeholder="Nome da lista"
            />
          </Form.Group>
        </Col>
        <Col md={4}>
          <Form.Group controlId="publicationDate" className="form-group">
            <Form.Label>Data de publicação</Form.Label>
            <Form.Control
              type="date"
              value={searchParams.publicationDate}
              onChange={handleInputChange}
            />
          </Form.Group>
        </Col>
        <Col md={4}>
          <Form.Group controlId="bestSellersDate" className="form-group">
            <Form.Label>Best Sellers date</Form.Label>
            <Form.Control
              type="date"
              value={searchParams.bestSellersDate}
              onChange={handleInputChange}
            />
          </Form.Group>
        </Col>
      </SearchForm>
     
      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <div className="lists-container">
          {lists.length > 0 ? (
            <Row>
              {lists.map((list) => (
                <Col key={list.id} md={6} lg={4} className="mb-4">
                  <ListCard list={list} showRanking={true} />
                </Col>
              ))}
            </Row>
          ) : (
            <div className="no-results">Nenhuma lista encontrada com os critérios de busca fornecidos.</div>
          )}
        </div>
      )}
    </Container>
  );
};

export default BestSellers;