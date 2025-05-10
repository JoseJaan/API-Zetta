import React from 'react';
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
  showRanking = false,
  showImage = false,
  showBooks = false
}: ListCardProps) => {
  const shouldShowImage = showImage && list.listImage && list.listImage !== "https://via.placeholder.com/150";
  
  return (
    <div className="list-card">
      <div className="list-card-header">
        <h3 className="list-name">{list.displayName || list.name}</h3>
        {showRanking && list.ranking && (
          <span className="list-ranking">Ranking: {list.ranking}</span>
        )}
      </div>
      
      <div className="list-card-content">
        <p className="list-update-date">Atualizado em: {new Date(list.updated).toLocaleDateString()}</p>
        
        {}
        {shouldShowImage && (
          <div className="list-image">
            <img src={list.listImage || ''} alt={list.name} />
          </div>
        )}
        
        {showBooks && list.books && list.books.length > 0 && (
          <div className="books-preview">
            <h4>Livros nesta lista:</h4>
            <div className="books-grid">
              {list.books.slice(0, 5).map(book => (
                <BookCard key={book.id} book={book} compact={true} />
              ))}
              {list.books.length > 5 && (
                <p className="more-books">+ mais {list.books.length - 5} livros</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ListCard;