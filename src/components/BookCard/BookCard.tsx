import React from 'react';
import { Card, Badge } from 'react-bootstrap';
import { Book } from '../../types';
import './BookCard.scss';

interface BookCardProps {
  book: Book;
  showSummary?: boolean;
  compact?: boolean;
  showReviews?: boolean;
}

const BookCard = ({ 
  book, 
  showSummary = true, 
  compact = false,
  showReviews = false 
}: BookCardProps) => {
  // Versão compacta para exibição em listas
  if (compact) {
    return (
      <div className="book-card compact">
        <div className="d-flex">
          {book.imageUrl && (
            <div className="compact-image">
              <img src={book.imageUrl} alt={book.title} className="book-thumbnail" />
            </div>
          )}
          <div className="compact-info">
            <h5 className="book-title">{book.title}</h5>
            <p className="book-author">Por {book.author}</p>
            {book.rank && <Badge bg="secondary">#{book.rank}</Badge>}
          </div>
        </div>
      </div>
    );
  }

  // Versão completa do card
  return (
    <div className="book-card">
      <h3 className="book-title">{book.title}</h3>
      <p className="book-author">Por {book.author}</p>
      
      {book.imageUrl && (
        <div className="book-image">
          <img src={book.imageUrl} alt={book.title} />
        </div>
      )}
      
      <p className="book-isbn">ISBN: {book.isbn}</p>
      
      {book.publisher && (
        <p className="book-publisher">Editora: {book.publisher}</p>
      )}
      
      {book.rank && (
        <p className="book-rank">
          <Badge bg="primary">Ranking: #{book.rank}</Badge>
        </p>
      )}
      
      {showSummary && book.description && (
        <div className="book-summary">
          <h4 className="summary-heading">Descrição</h4>
          <p className="summary-text">{book.description}</p>
        </div>
      )}
      
      {showReviews && book.reviews && book.reviews.length > 0 && (
        <div className="book-reviews">
          <h4 className="reviews-heading">Resenhas</h4>
          {book.reviews.map((review, index) => (
            <div key={index} className="review-item">
              {review.byline && <p className="review-byline"><em>{review.byline}</em></p>}
              {review.summary && <p className="review-summary">{review.summary}</p>}
              {review.url && (
                <a href={review.url} target="_blank" rel="noopener noreferrer">
                  Ler a resenha completa
                </a>
              )}
            </div>
          ))}
        </div>
      )}
      
      {book.amazonUrl && (
        <div className="book-actions">
          <a 
            className="amazon-button"
            href={book.amazonUrl} 
            target="_blank" 
            rel="noopener noreferrer"
          >
            Comprar na Amazon
          </a>
        </div>
      )}
    </div>
  );
};

export default BookCard;