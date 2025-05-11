import { useState, useEffect } from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';
import { BookList } from '../../types/index';
import { fetchListByDate } from '../../services/api';
import ListCard from '../../components/ListCard/ListCard';
import SearchForm from '../../components/SearchForm/SearchForm';
import './Home.scss';

const Home = () => {
  const [list, setList] = useState<BookList | null>(null);
  const [loading, setLoading] = useState(false);
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [searchParams, setSearchParams] = useState({
    publicationDate: '',
    listName: 'hardcover-fiction' 
  });

  const getFormattedCurrentDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  const loadList = async (date: string, listName: string) => {
    if (!date || !listName) {
      return;
    }

    try {
      setLoading(true);
      setSearchPerformed(true);
      
      const result = await fetchListByDate(date, listName);
      console.log("result: ",result)
      setList(result);
    } catch (error) {
      console.error('Error loading list by date:', error);
      setList(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const defaultDate = getFormattedCurrentDate();
    const defaultList = 'hardcover-fiction';
    
    setSearchParams({
      publicationDate: defaultDate,
      listName: defaultList
    });
    
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
      
      <SearchForm onSubmit={handleSubmit}>
        <Col md={6} lg={6}>
          <Form.Group controlId="publicationDate" className="form-group">
            <Form.Label>Data de publicação</Form.Label>
            <Form.Control
              type="date"
              value={searchParams.publicationDate}
              onChange={handleInputChange}
              required
            />
            <Form.Text className="text-light">
              MM/DD/AAAA
            </Form.Text>
          </Form.Group>
        </Col>
        <Col md={6} lg={6}>
          <Form.Group controlId="lista" className="form-group">
            <Form.Label>Lista</Form.Label>
            <Form.Control
              type="text"
              value={searchParams.listName}
              onChange={handleInputChange}
              placeholder="Ex: hardcover-fiction"
              required
            />
            <Form.Text className="text-light">
              Use o nome codificado da lista (ex: hardcover-fiction, paperback-nonfiction)
            </Form.Text>
          </Form.Group>
        </Col>
      </SearchForm>
      
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