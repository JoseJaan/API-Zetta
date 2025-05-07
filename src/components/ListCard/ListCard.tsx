import { BookList } from '../../types';
import './ListCard.scss';

interface ListCardProps {
  list: BookList;
  showRanking?: boolean;
  showImage?: boolean;
}

const ListCard = ({ list, showRanking = false, showImage = false }: ListCardProps) => {
  return (
    <div className="list-card">
      <div className="list-card-content">
        <h3 className="list-name">{list.name}</h3>
        <p className="list-update-date">Taxa de atualizacao: {list.updateDate}</p>
        
        {showRanking && list.ranking && (
          <p className="list-ranking">Ranking: {list.ranking}</p>
        )}
        
        {list.publicationDate && (
          <p className="list-publication-date">Data de publicação: {list.publicationDate}</p>
        )}
      </div>
      
      {showImage && list.image && (
        <div className="list-image">
          <img src={list.image} alt={list.name} />
          <p className="image-caption">List img se aplicavel</p>
        </div>
      )}
    </div>
  );
};

export default ListCard;