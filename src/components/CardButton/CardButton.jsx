import './CardButton.css';


export default  function CardButton({children, className,forElement}) {

  const cl = 'card-button' + (className ? ' ' + className : '') 

  return (
    <>
      <button className={cl}>{children}</button>
    </>
  )
}