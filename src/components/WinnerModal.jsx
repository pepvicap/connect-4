import { CloseModal } from './CloseModal'

export function WinnerModal ({ winner, resetGame }) {
  if (winner === null) return null

  const color = winner === 'Orange' ? 'is-orange' : 'is-blue'

  return (
        <section className="c-modal">
            <div className='c-modal__content'>
            <CloseModal />
                {
                    winner === false
                      ? <h2>It is a tie!</h2>
                      : <h2 className={color}><em>{winner}</em> wins!</h2>
                }
            </div>
        </section>
  )
}
