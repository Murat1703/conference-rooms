import cls from './ForbiddenPage.module.css'

export const ForbiddenPage = () =>{
    return(
        <section className={cls.forbiddenPageWrapper}>
            <div className={cls.forbiddenPageContent}>
                <div className={cls.forbiddenPageTitleBlock}>
                    <h2>Страница не найдена</h2>
                    <p>Перейти на <a href="/">главную</a></p>
                </div>
            </div>
        </section>
    )
}