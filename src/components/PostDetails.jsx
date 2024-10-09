/* eslint-disable react/prop-types */
import "./Post.css"
import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles
// ..
AOS.init();

export const PostDetails = ({ cardData, onDelete, onUpdate }) => {
  const { id, title, body } = cardData;

  return (
    <li className="list-item" data-aos="fade-up" data-aos-delay="10">
       <p className="id">{id}.</p>
      <p className="item-para">Title: {title}</p>
      <br />
      <p className="item-para">Body: {body}</p>
      <div className="button-div">
            <button className="btn-1" onClick={() => onUpdate(cardData)}>Edit</button>
            <button className="btn-2" onClick={() => onDelete(id)}>Delete</button>
        </div>
    </li>
  );
};
