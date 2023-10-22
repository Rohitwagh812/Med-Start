import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Card} from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'




const APPI = `https://api.geoapify.com/v2/places?categories=healthcare.hospital&filter=circle:74.991796,20.6040452,30000&bias=proximity:74.991796,20.6040452&limit=20&apiKey=d301fcb49c754402a35e0abfe42590fb
`


function Home() {
  const navigate = useNavigate()
  const [doctors , setDoctor] = useState([])
  const [latLng , setLatLng] = useState({})
  

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLatLng({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      });
    }
  }, []);

  useEffect(() => {
    console.log(latLng.lng);
    if (Object.keys(latLng).length > 0) {
      const APPI = `https://api.geoapify.com/v2/places?categories=healthcare.hospital&filter=rect:${latLng.lng},${latLng.lat},75.28590147611838,20.3612359194597&limit=20&apiKey=d301fcb49c754402a35e0abfe42590fb
      `

      axios.get(APPI).then((res) => {
        console.log(res.data.features);
        setDoctor(res.data.features)
      });
    }
  }, [latLng]);
  

  return (
    <div style={{display:'flex', flexWrap:'wrap',padding:" 20px 20px 30px 10px"}}>
      {
            doctors.length === 0 && <h5>Loading...</h5>
      }
      {
        doctors.map((doctor, index)=>{
          return (
            <div style={{padding:11}} key={index}>
              <Card onClick={()=>navigate('/hospital/' , {state: { address_line2 : doctor.properties.address_line2 , latLng1 : latLng , lat : doctor.properties.lat , url : doctor.properties.datasource.url, email : doctor.properties.datasource.raw.email , name : doctor.properties.name , lon :  doctor.properties.lon , state : doctor.properties.state , city : doctor.properties.city } })} style={{height:'12rem', width:"19rem", overflow:'hidden', cursor:"pointer"}}>
                <Card.Body>
                    <Card.Title  style={{borderBottom:'1px solid black', fontWeight:"bold"}}>
                      {doctor.properties.datasource.raw.name}
                    </Card.Title>
                    <Card.Text>
                      {doctor.properties.address_line2}
                    </Card.Text>
                    <Card.Text>
                      {doctor.properties.datasource.url}
                    </Card.Text>
                </Card.Body>
              </Card>
            </div>
          )
        })
      }
    </div>
  )
}

export default Home