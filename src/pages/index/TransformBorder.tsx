import React from 'react';
import styles from './TransformBorder.less';

interface Props {
  active?: boolean;
}
const TransformBorder: React.FC<Props> = (props) => {
  return (
    <div className={styles.transformBorder} style={{ display: props.active ? '' : 'none' }}>
      <div className={`${styles.block} ${styles.topLeft}`} />
      <div className={`${styles.block} ${styles.topRight}`} />
      <div className={`${styles.block} ${styles.bottomLeft}`} />
      <div className={`${styles.block} ${styles.bottomRight}`} />
      <div className={`${styles.block} ${styles.top}`} />
      <div className={`${styles.block} ${styles.right}`} />
      <div className={`${styles.block} ${styles.bottom}`} />
      <div className={`${styles.block} ${styles.left}`} />
    </div>
  );
};
export default TransformBorder;
