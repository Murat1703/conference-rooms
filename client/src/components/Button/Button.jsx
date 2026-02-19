import cls from './Button.module.css'

export const Button = ({children, action, phone}) =>{

  const call = () => {
    window.location.href = `tel:${phone}`;
  };

    return(
        <button 
            className={`${cls.mainBtn} `}
            onClick={phone? call :action}
        >
            {children}
        </button>
    )
}