import { controllerMoveCaretka } from '../../shared/lib/constants'

export const MoveCaretka = (position: number) => {
	const caretka = document.getElementById('caretka')
	const typingCoordinats = document.getElementById('typing')?.getBoundingClientRect()
	const letterCoordinats = document.getElementById(`word-${position}`)?.lastElementChild?.getBoundingClientRect()

	if (caretka && typingCoordinats && letterCoordinats) {
		caretka.style.left = `${letterCoordinats.left - typingCoordinats.left + 18.8}px`
		caretka.style.top = `${letterCoordinats.top - typingCoordinats.top}px`
	} else if (caretka && controllerMoveCaretka.isNumberLetterChanged) {
		if (controllerMoveCaretka.noLetters) {
			caretka.style.left = `${parseInt(caretka.style.left) - 18.8}px`
		} else {
			caretka.style.left = `${parseInt(caretka.style.left) + 18.8}px`
		}
	}
}