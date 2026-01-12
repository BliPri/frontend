import { useRef } from 'react'
import { ChecksTranslate } from '../../features/checksTranslate'
import { useType } from './model/useType'
import styles from './ui.module.scss'

export function Typing() {
	const checksTranslateRef = useRef<ChecksTranslate | null>(null)

	if (!checksTranslateRef.current) {
    checksTranslateRef.current = new ChecksTranslate()
  }
	
	const words = useType({ checksTranslate: checksTranslateRef.current })

	return (
		<div id='typing' className={styles.typing}>
			<div className={styles.typing__field}>
				{words.map((word, index) => (
					<div id={`word-${index+1}`} className={styles.word + ' ' + styles[word.status]} key={index}>
						{word.content.map((letter, idx) => (
							<span key={letter + idx}>{letter}</span>
						))}
					</div>
				))}
			</div>
			<div id='caretka' className={styles.typing_caretka}></div>
		</div>
	)
}