import { Book } from '../../types';
import './BookCard.scss';

interface BookCardProps {
  book: Book;
  showSummary?: boolean;
}

const BookCard = ({ book, showSummary = true }: BookCardProps) => {
  return (
    <div className="book-card">
      <h3 className="book-title">{book.title}</h3>
      <p className="book-author">By {book.author}</p>
      <p className="book-isbn">ISBN: {book.isbn}</p>
      
      {showSummary && book.summary && (
        <div className="book-summary">
          <h4 className="summary-heading">Summary</h4>
          <p className="summary-text">{book.summary}</p>
        </div>
      )}
    </div>
  );
};

export default BookCard;