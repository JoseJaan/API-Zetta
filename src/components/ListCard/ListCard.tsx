import React, { useState } from 'react';
import { BookList } from '../../types';
import BookCard from '../BookCard/BookCard';
import './ListCard.scss';

interface ListCardProps {
  list: BookList;
  showRanking?: boolean;
  showImage?: boolean;
  showBooks?: boolean;
}

const ListCard = ({
  list,
  showRanking = true,
  showImage = true,
  showBooks = true
}: ListCardProps) => {
  const [expanded, setExpanded] = useState(false);
  const shouldShowImage = showImage && list.listImage && list.listImage !== "https://via.placeholder.com/150";
  
  // Format date to a more readable format
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <div className="list-card">
      <div className="list-card-header">
        <h3 className="list-name">{list.displayName || list.name}</h3>
        
        <div className="list-details">
          {showRanking && list.ranking && (
            <div className="list-ranking">
              <span className="badge bg-secondary">Ranking: #{list.ranking}</span>
            </div>
          )}
          
          <div className="list-update-date">
            <strong>Atualizado em:</strong> {formatDate(list.updated)}
          </div>
        </div>
      </div>
      
      <div className="list-card-body">
        {shouldShowImage && (
          <div className="list-image">
            <img 
              src={list.listImage ?? undefined} 
              alt={`Imagem da lista ${list.name}`} 
              className="img-fluid"
            />
          </div>
        )}
        
        {showBooks && list.books && list.books.length > 0 && (
          <div className="books-preview">
            <h4>
              Livros nesta lista <span className="custom-badge">{list.books.length}</span>
            </h4>
            <div className="books-stats">
              <div className="row">
                <div className="col-md-6">
                  <div className="stat-item">
                    <i className="bi bi-book"></i> Top autor: {getMostFrequentAuthor(list.books)}
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="stat-item">
                    <i className="bi bi-building"></i> Top editora: {getMostFrequentPublisher(list.books)}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="books-grid">
              {list.books.slice(0, expanded ? list.books.length : 3).map(book => (
                <BookCard key={book.id} book={book} compact={true} />
              ))}
            </div>
            
            {list.books.length > 3 && (
              <div className="text-center mt-3">
                <button 
                  className="btn btn-outline-secondary btn-sm"
                  onClick={() => setExpanded(!expanded)}
                >
                  {expanded ? 'Mostrar menos' : `+ Ver mais ${list.books.length - 3} livros`}
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

// Helper functions to get statistics from books
const getMostFrequentAuthor = (books: any[]) => {
  const authorCount = books.reduce((acc, book) => {
    acc[book.author] = (acc[book.author] || 0) + 1;
    return acc;
  }, {});
  
  return Object.entries(authorCount)
    .sort((a: any, b: any) => b[1] - a[1])
    .map((entry: any) => entry[0])[0] || 'N/A';
};

const getMostFrequentPublisher = (books: any[]) => {
  const publisherCount = books.reduce((acc, book) => {
    acc[book.publisher] = (acc[book.publisher] || 0) + 1;
    return acc;
  }, {});
  
  return Object.entries(publisherCount)
    .sort((a: any, b: any) => b[1] - a[1])
    .map((entry: any) => entry[0])[0] || 'N/A';
};

export default ListCard;