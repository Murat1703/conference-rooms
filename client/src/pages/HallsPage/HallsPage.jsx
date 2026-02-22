import cls from './HallsPage.module.css'
import { useEffect, useState } from 'react';
import { HallCard } from '../../components/HallCard';
import { Description } from '../../components/Description';
import { getHalls } from '../../api/halls.api.js';
import { Spinner } from '../../components/Spinner/Spinner.jsx';

export const HallsPage = () =>{

    const [halls, setHalls] = useState([]);
    const [loading, setLoading] = useState(true);

    const loadHalls = async () =>{
        try{
            const res = await getHalls();
            setHalls(res.data);
        }
        catch(err){
            console.error("Ошибка загрузки событий", err);
        }
        finally {
            setLoading(false)
        }
    }

    useEffect(()=>{
        loadHalls();        
    }, [])



    return(
        <section>
            <div className={cls.hallsPageContent}>
                <div className={cls.hallsPageTitleBlock}>
                    <Description>
                        Пространства
                    </Description>
                    <h3>Конференц залы</h3>
                </div>
                <div className={cls.hallsPageList}>
                    {loading && <Spinner />}
                    {halls.map((hallItem, index)=>{
                        return(
                            <HallCard hall={hallItem} key={index}/>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}