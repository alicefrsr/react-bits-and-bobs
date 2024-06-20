import { Link } from 'react-router-dom';
import { HiArrowNarrowLeft } from 'react-icons/hi';

// default color for Backlink btn is light grey. (for white bg)
// Specify type='white' (when bg is not white)
function BackLink({ type }) {
  return (
    <Link className={`back-link ${type}`} to='/pizza-menu-details'>
      <div className='back-link-container'>
        <HiArrowNarrowLeft /> Back
      </div>
    </Link>
  );
}

export default BackLink;
