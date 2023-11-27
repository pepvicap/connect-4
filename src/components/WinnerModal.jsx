export function WinnerModal ({ winner, resetGame }) {
  if (winner === null) return null

  const winnerText = winner === false ? 'It is a tie!' : `${winner} Wins!`

  return (
        <section className="c-modal">
            <div className='c__text'>
                <h2>
                    {winnerText}
                </h2>
            </div>
        </section>
  )
}
