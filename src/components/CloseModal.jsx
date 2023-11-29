export const CloseModal = () => {
  const handleClick = () => {
    const modal = document.querySelector('.c-modal')
    modal.classList.add('is-hidden')
    const body = document.querySelector('body')
    body.style.overflow = 'auto'
  }

  return (
   <span className="c-close" onClick={handleClick}>
        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-x" width="44" height="44" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#FFF" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
          <path d="M18 6l-12 12" />
          <path d="M6 6l12 12" />
        </svg>
    </span>
  )
}
