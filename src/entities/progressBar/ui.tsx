import styles from './ui.module.scss'

export function ProgressBar() {
  return (
    <div className={styles.progressBar}>
      <div
        className={styles.progressBar__fill}
        style={{ width: `${10}%` }}
      ></div>
    </div>
  )
}
