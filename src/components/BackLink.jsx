import { Link } from 'react-router-dom';
import { HiArrowNarrowLeft } from 'react-icons/hi';

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
