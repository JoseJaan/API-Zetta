import { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { BookList } from '../../types/index';
import { fetchListByDate } from '../../services/api';
import ListCard from '../../components/ListCard/ListCard';
import './Home.scss';

const Home = () => {
  const [list, setList] = useState<BookList | null>(null);
  const [loading, setLoading] = useState(false);
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [searchParams, setSearchParams] = useState({
    publicationDate: '',
    listName: 'hardcover-fiction' // Valor padrão para a lista
  });

  // Função para formatar a data atual como YYYY-MM-DD
  const getFormattedCurrentDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  // Função para carregar a lista com base nos parâmetros
  const loadList = async (date: string, listName: string) => {
    if (!date || !listName) {
      return;
    }

    try {
      setLoading(true);
      setSearchPerformed(true);
      
      const result = await fetchListByDate(date, listName);
      
      setList(result);
    } catch (error) {
      console.error('Error loading list by date:', error);
      setList(null);
    } finally {
      setLoading(false);
    }
  };

  // Efeito para carregar a lista automaticamente quando o componente montar
  useEffect(() => {
    const defaultDate = getFormattedCurrentDate();
    const defaultList = 'hardcover-fiction';
    
    // Atualiza o estado com os valores padrão
    setSearchParams({
      publicationDate: defaultDate,
      listName: defaultList
    });
    
    // Carrega a lista com os valores padrão
    loadList(defaultDate, defaultList);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setSearchParams(prev => ({
      ...prev,
      [id === 'lista' ? 'listName' : id]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loadList(searchParams.publicationDate, searchParams.listName);
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
                value={searchParams.publicationDate}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
          </Col>
          <Col md={6} lg={4}>
            <Form.Group controlId="lista">
              <Form.Label>Lista</Form.Label>
              <Form.Control
                type="text"
                value={searchParams.listName}
                onChange={handleInputChange}
                placeholder="Ex: hardcover-fiction"
                required
              />
              <Form.Text className="text-muted">
                Use o nome codificado da lista (ex: hardcover-fiction, paperback-nonfiction)
              </Form.Text>
            </Form.Group>
          </Col>
          <Col md={6} lg={4} className="d-flex align-items-end mb-3">
            <Button type="submit" variant="primary">Buscar</Button>
          </Col>
        </Row>
      </Form>
      
      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <div className="list-container">
          {searchPerformed && (
            list ? (
              <Row>
                <Col xs={12} className="mb-4">
                  <ListCard list={list} showBooks={true} />
                </Col>
              </Row>
            ) : (
              <div className="no-results">Nenhuma lista encontrada para os critérios especificados.</div>
            )
          )}
        </div>
      )}
    </Container>
  );
};

export default Home;