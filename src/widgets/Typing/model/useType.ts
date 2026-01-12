import { useEffect, useRef } from 'react'
import { useImmer } from 'use-immer'
import { MoveCaretka } from '../../../features/MoveCaretka'
import type { IWords } from '../../../shared/types/interface'
import { controllerMoveCaretka } from '../../../shared/lib/constants'
import { ChecksTranslate } from '../../../features/checksTranslate'

export const BAN_KEYS = ['Backspace', 'Alt', 'Tab', 'Enter', 'Control', 'Shift', 'CapsLock', 'Meta', 'ArrowLeft', 'ArrowUp', 'ArrowDown', 'ArrowRight', 'NumLock', 'Home', 'Clear', 'Insert', 'Delete', 'End', 'PageUp', 'PageDown', 'ScrollLock', 'Pause', 'F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'F10', 'F11', 'F12', 'Escape', 'LaunchApplication1', 'LaunchMail', 'MediaPlayPause', 'AudioVolumeUp', 'AudioVolumeDown', 'AudioVolumeMute'];

export const useType = ({
  checksTranslate,
}: {
  checksTranslate: ChecksTranslate
}) => {
  const [state, setState] = useImmer<IWords[]>([
    { status: 'active', content: [] },
  ])
	const stateRef = useRef(state)

	useEffect(() => {
		stateRef.current = state
    MoveCaretka(state.length)
	}, [state])

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (BAN_KEYS.includes(e.key, 1) == true) return

      setState(drift => {
        const lastWord = drift[drift.length - 1]

        if (e.code == 'Backspace') {
          if (drift.length > 0) {
            if (lastWord.content.length == 0 && drift.length > 1) {
              drift.pop()
            } else {
              lastWord.content.pop()
              if (lastWord.content.length == 0) {
                controllerMoveCaretka.noLetters = true
              }
            }
          }
        } 
				
				else if (e.code == 'Space') {
          if (lastWord.content.length > 0) {
            drift.push({ status: 'active', content: [] })
            checksTranslate.sendUserText(stateRef.current)
          }
        } 
				
				else if (lastWord.content.length <= 20) {
          lastWord.content.push(e.key)
          controllerMoveCaretka.noLetters = false
        }

        controllerMoveCaretka.isNumberLetterChanged = true
      })
    }

		const unsubscribeChecks = checksTranslate.eventChecksResult(setState)

    window.addEventListener('keydown', handleKey)
    return () => {
			unsubscribeChecks()
			window.removeEventListener('keydown', handleKey)
		}
  }, [setState, checksTranslate, state])

  return state
}
