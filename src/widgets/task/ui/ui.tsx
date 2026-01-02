import { ProgressBar } from '../../../entities/progressBar'
import { SvgArrowsOutward } from './svgArrowsOutward'
import { SvgLanguage } from './svgLanguage'
import styles from './ui.module.scss'

const textForTranslation = 'Когда студенты приходят на занятие, они уже многое знают, ведь у каждого есть предыдущий опыт'

export function Task() {
	return (
		<div className={styles.task}>
			<div className={styles.task__container}>
				<p className={styles.task__textForTranslation}>{textForTranslation}</p>
				<ProgressBar />
			</div>
			<div className={styles.task__buttons}>
				<button className={`${styles.task__button} icon-hover-white`}><SvgLanguage /></button>
				<button className={`${styles.task__button} icon-hover-white`}><SvgArrowsOutward /></button>
			</div>
		</div>
	)
}