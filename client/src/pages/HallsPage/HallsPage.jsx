import cls from './HallsPage.module.css'
import { useEffect, useState } from 'react';
import { HallCard } from '../../components/HallCard';
import { Description } from '../../components/Description';
import { getHalls } from '../../api/halls.api.js';
import { Spinner } from '../../components/Spinner/Spinner.jsx';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

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
                    <Swiper
                        slidesPerView={4}
                        spaceBetween={64}
                        breakpoints={{
                            0: {
                                slidesPerView: 1.25,
                                spaceBetween: 24
                            },
                            500: {
                                slidesPerView : 2.4,
                                spaceBetween: 32
                            },
                            760: {
                                slidesPerView : 4,
                                spaceBetween: 64

                            }
                        }}
                    >
                    {halls.map((hallItem, index)=>{
                        return(
                                <SwiperSlide>
                                    <HallCard hall={hallItem} key={index}/>
                                </SwiperSlide>
                        )
                    })}
                    </Swiper>
                </div>
            </div>
        </section>
    )
}