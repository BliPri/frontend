import { SvgInfo } from './svgInfo'
import { SvgPerson } from './svgPerson'
import { SvgSettings } from './svgSettings'
import { SvgTranslate } from './svgTranslate'
import styles from './ui.module.scss'

export function Header() {
	return (
		<header>
			<a><h1 className={styles.header__logo}>BliPri</h1></a>
			<nav className={styles.header__navigation}>
				<a className={`${styles.header__link} icon-hover-white`} href=""><SvgTranslate /></a>
				<a className={`${styles.header__link} icon-hover-white`} href=""><SvgInfo /></a>
				<a className={`${styles.header__link} icon-hover-white`} href=""><SvgSettings /></a>
				<div></div>
				<a className={`${styles.header__link} icon-hover-white`} href=""><SvgPerson /></a>
			</nav>
		</header>
	)
}