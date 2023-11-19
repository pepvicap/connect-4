export function WinnerModal ({ winner, resetGame }) {
  if (winner === null) return null

  const winnerText = winner === false ? 'It is a tie!' : `${winner} Wins!`

  return (
        <section className="winner">
            <div className='text'>
                <h2 className='win'>
                    {winnerText}
                </h2>
                <button onClick={resetGame}>Play again</button>
            </div>
        </section>
  )
}
