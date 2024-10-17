import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import CommentsList from "../components/CommentsList";
import AddCommentForm from "../components/AddCommentForm";
import useUser from "../hooks/useUser";
import axios from "axios";
import articles from './article-content';
import NotFoundPage from "./NotFoundPage";


const ArticlePage = () => {
    const [articleInfo, setArticleInfo] = useState({ upvotes: 0, comments: [], canUpvote: false })
    const { articleId } = useParams();
    const { user, isLoading } = useUser();
    const { canUpvote } = articleInfo;

    useEffect(() => {
        const loadArticleInfo = async () => {
            const token = user && user.getIdToken();
            const headers = token ? { authtoken: token } : {}
            const response = await axios.get(`https://react-blog-backend-rriy.onrender.com/api/articles/${articleId}`, {
                headers
            });
            const newArticleInfo = response.data;
            setArticleInfo(newArticleInfo);
        }
        if(isLoading) {
            loadArticleInfo();
        }
    }, [isLoading, user])
    
    const article = articles.find(article => article.name === articleId);

    if (!article) {
        return <NotFoundPage />
    }

    const addUpvote = async () => {
        const token = user ? await user.getIdToken(): null;
        const headers = token ? { authtoken: token } : {}
        const response = await axios.put(`https://react-blog-backend-rriy.onrender.com/api/articles/${articleId}/upvote`, null, { headers });
        const updatedArticle = response.data;
        setArticleInfo(updatedArticle);
    }

    return (
        <>
            <h1>{article.title}</h1>
            <div className="upvotes-section">
                { user ?
                    <button onClick={addUpvote}>{canUpvote ? 'Upvote' : 'Already upvoted'}</button>
                    : <button>Login to upvote</button>
                }
                <p>This articles has {articleInfo.upvotes} upvote(s)</p>
            </div>
            {article.content.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
            ))}
            { user ?
                <AddCommentForm articleName={articleId} onArticleUpdated={ updatedArticle => setArticleInfo(updatedArticle) } />
                : <button>Login to comment</button>
            }
            <CommentsList comments={articleInfo.comments} />
        </>
    );
}

export default ArticlePage;