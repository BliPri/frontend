import type { Updater } from 'use-immer'
import type { IChecksResult, IWords } from '../../shared/types/interface'
import { controllerMoveCaretka } from '../../shared/lib/constants'

const BACKEND_WS_URL = 'ws://localhost:3000/checks-translate'

export class ChecksTranslate {
  private readonly websocket: WebSocket

  constructor() {
    this.websocket = new WebSocket(BACKEND_WS_URL)
  }

  sendUserText(words: IWords[]) {
    const userText = words.map(word => word.content.join(''))
    this.websocket.send(
      JSON.stringify({
        event: 'check',
        data: { userText },
      })
    )
  }

  eventChecksResult(setWords: Updater<IWords[]>) {
    const onMessageHandler = (event: MessageEvent<string>) => {
      const data: IChecksResult = JSON.parse(event.data)
      controllerMoveCaretka.isNumberLetterChanged = false
      setWords(drift => {
        if (data.isCheckTranslate) {
          drift[drift.length - 2].status = 'correct'
        } else {
          drift[drift.length - 2].status = 'error'
        }
      })
    }

    this.websocket.addEventListener('message', onMessageHandler)

    return () => this.websocket.removeEventListener('message', onMessageHandler)
  }
}
