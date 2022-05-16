import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

const ArticleCard = (props) => {
    const  article  = props.article;

    return(
        <div className="card-container">
            <img src="https://commapress.co.uk/books/the-book-of-cairo/cairo-provisional-v3/image%2Fspan3" alt="" />
            <div className="desc">
                <h2>
                    <Link to={`/show-article/${article._id}`}>
                        { article.title }
                    </Link>
                </h2>
                <h3>{article.author}</h3>
                <p>{article.DOI}</p>
            </div>
        </div>
    )
};

export default ArticleCard;