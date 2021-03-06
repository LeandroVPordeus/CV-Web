import React, { useState, useEffect } from "react";
import { Map, Marker, Popup, TileLayer } from "react-leaflet";
import { AiFillPlusCircle, AiOutlineClose} from 'react-icons/ai'
import ModalMap from "../../../components/Modals/ModalMap";
import './styles.css'

const teste = [
  {
    name: "Banco de sangue Paulista",
    lat: -23.65569,
    long: -46.705491,
  },
  {
    name: "Banco de sangue Vila Olímpia",
    lat: -23.58326,
    long: -46.664434,
  },
  {
    name: "Banco de sangue Santo Amaro",
    lat: -23.533978,
    long: -46.639758,
  },
];

function Locals() {
  // Definindo estados
    const [isTeste, setTeste] = useState(null)
    const [initialPosition, setInitialPosition] = useState([0, 0]);
    const [isActiveModal, setIsActiveModal] = useState(false)

    // Funcões para abrir e fechar modais
    const ModalMapOpen = () => setIsActiveModal(true)
    const ModalMapClose = () => setIsActiveModal(false)

    // Pegando localização do usuário
    useEffect(() => {
      navigator.geolocation.getCurrentPosition(position => {
        const { latitude, longitude } = position.coords;

        setInitialPosition([latitude, longitude])
      })
    }, [])

  return (
    <>
      <Map center={initialPosition} zoom={12}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {/* Iterando sobre o array teste e adcionando as informações no estado */}
        {teste.map((item) => (
            <Marker 
                key={item.index} 
                position={[item.lat, item.long]} 
                onclick={() => setTeste(item)}
            />
        ))}

          {/* Definindo estrutura do popup */}
        {isTeste && 
          <Popup 
            position={[isTeste.lat, isTeste.long]}
            onClose={() => setTeste(null)}
        >
            <div>
                <h5>{isTeste.name}</h5>
                <p>{isTeste.about}</p>
                <button id="btnOpen-Insti-Info" onClick={ModalMapOpen}><AiFillPlusCircle  size={30}/></button>
            </div>
          </Popup>
        }
      </Map>

      {/* Definindo condição para abrir modal e passando parametros */}
      {isActiveModal ? 
        <ModalMap 
            buttonclose={<button id="closeModalBtn" onClick={ModalMapClose}><AiOutlineClose size={30} /></button>}
            info_name={isTeste.name}
        /> : null}
    </>
  );
}

export default Locals;