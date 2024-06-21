import { Link, useNavigate } from 'react-router-dom';
import { HiArrowNarrowLeft } from 'react-icons/hi';

// default color for Backlink btn is light grey. (for white bg)
// Specify type='white' (when bg is not white)
function BackBtn({ type }) {
  const navigate = useNavigate();
  return (
    <btn className={`back-link ${type}`} onClick={() => navigate(-1)}>
      {/* if this btn was in a form , onClick would have to preventDefault:
       <btn className={`back-link ${type}`} onClick={(e) => {
        e.preventDefault();
        navigate(-1)}}>
        </btn> */}
      <div className='back-link-container'>
        <HiArrowNarrowLeft /> Back
      </div>
    </btn>
  );
}

export default BackBtn;
