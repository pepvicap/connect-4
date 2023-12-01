import { CloseModal } from './CloseModal'

export function WinnerModal ({ winner, resetGame }) {
  if (winner === null) return null

  const color = winner === 'Orange' ? 'is-orange' : 'is-blue'
  const modal = document.querySelectorAll('.c-modal')
  modal.forEach(modal => modal.classList.remove('is-hidden'))
  const modalStyle = {
    height: window.innerHeight + 'px'
  }

  return (
        <section className="c-modal" style={modalStyle}>
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
