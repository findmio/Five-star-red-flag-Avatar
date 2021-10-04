import React from 'react';
import styles from './index.less';


const Loading = () => {
  return (
    <div className={styles.page}>
      <div className={styles.ldsSpinner}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};
export default Loading;