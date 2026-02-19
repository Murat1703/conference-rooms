import cls from './ContactsPage.module.css'
import DG from '2gis-maps'
import { useState, useEffect, useRef } from 'react';


export const ContactsPage = ()=>{

  const mapRef = useRef(null);
  const mapInstance = useRef(null);

  useEffect(() => {

    // координаты (пример)
    const lat = 43.214309;
    const lng = 76.931664;

    // создаём карту
    mapInstance.current = DG.map(mapRef.current, {
      center: [lat, lng],
      zoom: 16,
      fullscreenControl: false,
      zoomControl: true
    });

    // маркер
    DG.marker([lat, lng])
      .addTo(mapInstance.current)
      .bindPopup("Sadu Hotel")
      .openPopup();

    return () => mapInstance.current.remove();
  }, []);



    return(
        <section className={cls.contactsPageWrapper}>
            <div className={cls.contactsPageContent}>
                <div className={cls.map}
                    ref={mapRef}
                    style={{
                        width: "100%",
                        height: "100%",
                        borderRadius: "18px",
                        overflow: "hidden"
                    }}
                >

                </div>
                <div className={cls.contactsPageAddress}>
                    <div className={cls.infoCity}>
                        <p>Алматы</p>
                        <p>Республика Казахстан</p>
                    </div>
                    <ul className={cls.addressList}>
                        <li>
                            <p>Адрес:</p>
                            <p>ул. Аль-Фараби 128/7</p>
                        </li>
                        <li>
                            <p>Контактный телефон:</p>
                            <a href="tel:+77052941444" target='_blank'>+7-705-294-14-44å</a>
                        </li>
                        <li>
                            <p>Email:</p>
                            <a href="mailto:info@saduhotel.kz" target='_blank'>info@saduhotel.kz</a>
                        </li>
                        <li>
                            <p>Instagram:</p>
                            <a href="https://instagram.com" target='_blank'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none"><g clipPath="url(#clip0_191_12006)"><path d="M13.453 7.00002C13.4517 7.5755 13.4452 8.151 13.4373 8.72645C13.4278 9.42073 13.417 10.1153 13.2429 10.7977C13.0603 11.5133 12.7002 12.1304 12.14 12.5873C11.5496 13.0688 10.8359 13.3219 10.0657 13.3687C9.04416 13.4308 8.02217 13.4554 7.0002 13.453C5.9782 13.4554 4.9562 13.4308 3.93467 13.3687C3.16445 13.3219 2.45084 13.0688 1.86043 12.5873C1.30016 12.1304 0.940046 11.5133 0.757445 10.7977C0.583321 10.1153 0.572602 9.42073 0.563114 8.72645C0.555239 8.151 0.548703 7.5755 0.547363 7.00002C0.548703 6.42455 0.555239 5.84905 0.563114 5.2736C0.572602 4.57931 0.583321 3.88473 0.757445 3.20234C0.940046 2.48676 1.30016 1.86961 1.86043 1.41273C2.45084 0.931259 3.16445 0.678193 3.93467 0.631353C4.9562 0.569228 5.9782 0.544673 7.0002 0.54708C8.02217 0.544673 9.04416 0.569228 10.0657 0.631353C10.8359 0.678193 11.5496 0.931259 12.14 1.41273C12.7002 1.86961 13.0603 2.48676 13.2429 3.20234C13.417 3.88473 13.4278 4.57931 13.4373 5.2736C13.4452 5.84905 13.4517 6.42455 13.453 7.00002Z" stroke="#E6E3DA" strokeLinecap="round" strokeLinejoin="round"></path><path d="M9.84373 7.00001C9.84373 8.58567 8.55831 9.87109 6.97265 9.87109C5.38699 9.87109 4.10156 8.58567 4.10156 7.00001C4.10156 5.41435 5.38699 4.12892 6.97265 4.12892C8.55831 4.12892 9.84373 5.41435 9.84373 7.00001Z" stroke="#E6E3DA" strokeLinecap="round" strokeLinejoin="round"></path><path d="M11.5937 3.3086C11.5937 3.76163 11.2265 4.12891 10.7734 4.12891C10.3204 4.12891 9.95312 3.76163 9.95312 3.3086C9.95312 2.85557 10.3204 2.48829 10.7734 2.48829C11.2265 2.48829 11.5937 2.85557 11.5937 3.3086Z" fill="#E6E3DA"></path></g><defs><clipPath id="clip0_191_12006"><rect width="14" height="14" fill="white"></rect></clipPath></defs></svg>
                            @saduhotel.kz</a>
                        </li>
                    </ul>
                </div>
            </div>
        </section>
    )
}