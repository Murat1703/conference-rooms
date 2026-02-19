import cls from './Description.module.css'

export const Description = ({children}) =>{
    return(
        <p className={cls.descriptionText}>{children}</p>
    )
}