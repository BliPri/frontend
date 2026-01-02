import { useEffect } from 'react'
import { useImmer } from 'use-immer'
import { MoveCaretka } from '../../../features/MoveCaretka'
import type { IWords } from '../../../shared/types/interface'
import { controllerMoveCaretka } from '../../../shared/lib/constants'

export const BAN_KEYS = ['Backspace', 'Alt', 'Tab', 'Enter', 'Control', 'Shift', 'CapsLock', 'Meta', 'ArrowLeft', 'ArrowUp', 'ArrowDown', 'ArrowRight', 'NumLock', 'Home', 'Clear', 'Insert', 'Delete', 'End', 'PageUp', 'PageDown', 'ScrollLock', 'Pause', 'F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'F10', 'F11', 'F12', 'Escape', 'LaunchApplication1', 'LaunchMail', 'MediaPlayPause', 'AudioVolumeUp', 'AudioVolumeDown', 'AudioVolumeMute'];

export const useType = () => {
  const [state, setState] = useImmer<IWords[]>([{status: 'active', content: []}])

	useEffect(() => {
		MoveCaretka(state.length)
		const handleKey = (e: KeyboardEvent) => {
			if (BAN_KEYS.includes(e.key, 1) == false) {
				setState(drift => {
					const lastWord = drift[drift.length - 1]
					if (e.code == 'Backspace') {
						lastWord.content.pop()
						if (lastWord.content.length == 0) {
							controllerMoveCaretka.noLetters = true
						}
					} else if (e.code == 'Space') {
						if (lastWord.content.length > 0) {
							drift.push({status: 'active', content: []})
						}
					} else if (lastWord.content.length <= 20) {
						lastWord.content.push(e.key)
						controllerMoveCaretka.noLetters = false
					}
				})
			}
		}

		window.addEventListener('keydown', handleKey)
		return () => window.removeEventListener('keydown', handleKey)
	}, [state, setState])

	return state
}