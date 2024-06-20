import { Link } from 'react-router-dom';
import { HiArrowNarrowLeft } from 'react-icons/hi';

// default color for Backlink btn is light grey. (for white bg)
// Specify type='white' (when bg is not white)
function BackHomeLink({ type }) {
  return (
    <Link className={`backhome-link ${type}`} to='/'>
      <div className='backhome-link-container'>
        <HiArrowNarrowLeft /> Home
      </div>
    </Link>
  );
}

export default BackHomeLink;
