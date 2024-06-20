import { Link } from 'react-router-dom';
import { HiArrowNarrowLeft } from 'react-icons/hi';

// default color for Backlink btn is light grey. (for white bg)
// Specify type='white' (when bg is not white)
function BackLink({ type }) {
  return (
    <Link className={`back-link ${type}`} to='/'>
      <div className='back-link-container'>
        <HiArrowNarrowLeft />
      </div>
    </Link>
  );
}

export default BackLink;
