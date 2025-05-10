import { useState, useEffect } from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';
import { BookList } from '../../types/index';
import { fetchListOverview } from '../../services/api';
import ListCard from '../../components/ListCard/ListCard';
import SearchForm from '../../components/SearchForm/SearchForm';
import './ListOverview.scss';

const ListOverview = () => {
  const [lists, setLists] = useState<BookList[]>([]);
  const [loading, setLoading] = useState(true);
  const [publicationDate, setPublicationDate] = useState('');
  const [initialLoadComplete, setInitialLoadComplete] = useState(false);
  
  // Função para obter a data atual formatada como YYYY-MM-DD
  const getFormattedCurrentDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };
  
  useEffect(() => {
    // Carrega as listas na montagem inicial
    loadListsWithDefaultDate();
  }, []);
  
  // Função para carregar listas com uma data padrão
  const loadListsWithDefaultDate = async () => {
    try {
      setLoading(true);
     
      // Usar a data atual como padrão
      const defaultDate = getFormattedCurrentDate();
     
      // Atualizar o estado para refletir no campo do formulário
      setPublicationDate(defaultDate);
     
      const data = await fetchListOverview(defaultDate);
      setLists(data);
     
      // Marcar carregamento inicial como concluído
      setInitialLoadComplete(true);
    } catch (error) {
      console.error('Error loading lists overview:', error);
    } finally {
      setLoading(false);
    }
  };
  
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
     
      <SearchForm onSubmit={handleSubmit}>
        <Col md={12}>
          <Form.Group controlId="publicationDate" className="form-group">
            <Form.Label>Data de publicação</Form.Label>
            <Form.Control
              type="date"
              value={publicationDate}
              onChange={handleDateChange}
            />
          </Form.Group>
        </Col>
      </SearchForm>
     
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