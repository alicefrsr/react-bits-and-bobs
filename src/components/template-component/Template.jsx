import { useEffect, useState } from 'react';
import styles from './Template.module.css';
import BackLink from '../BackLink';
// import Note from '../note/Note';

const Template = () => {
  useEffect(() => {
    document.title = 'Template';
    // clean up
    return () => (document.title = 'bits&bobs | Home');
  }, []);

  return (
    <div className={styles.app}>
      <BackLink type='white' />
      <h1>Template title</h1>
    </div>
  );
};

export default Template;
