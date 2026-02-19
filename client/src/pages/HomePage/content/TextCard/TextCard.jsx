import cls from './TextCard.module.css'

export const TextCard = ({textCardTitle, textCardDescription}) =>{
    return(
        <div className={cls.textCard}>
            <p>{textCardTitle}</p>
            <p>{textCardDescription}</p>
        </div>
    )
}