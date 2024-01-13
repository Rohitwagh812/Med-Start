import React, { useEffect, useState } from 'react'
import { Card, Col, Container, Row } from 'react-bootstrap';
import { useLocation } from 'react-router-dom'
import axios  from 'axios';

import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import { color } from '@mui/system';


function Hopitals() {
  const location = useLocation()
  const {address_line2 , latLng1 , url , name , lon , lat , email , state , city } =  location.state;
  const [maps ,setMaps] = useState([])
  const [userdata , setUserdata] = useState([])
  const [emailTwo , setEmailTwo] = useState([])
  const [color , setColor] = useState('')
  const [mail , setMail] =useState('')
  const [cursor , setCursor] = useState('pointer')
  
  useEffect(() => {
    // console.log(latLng1.lng);
    // console.log(latLng1.lat);
    if (Object.keys(latLng1).length > 0) {
      const APPI = `https://api.geoapify.com/v1/geocode/reverse?lat=${latLng1.lat}&lon=${latLng1.lng}&format=json&apiKey=d301fcb49c754402a35e0abfe42590fb
      ` 
      const APITWO = `https://api.geoapify.com/v1/routing?waypoints=${lat},${lon}|${latLng1.lat},${latLng1.lng}&mode=drive&apiKey=d301fcb49c754402a35e0abfe42590fb`

      axios.get(APITWO).then((res) => {
        console.log(res.data.features);
        setUserdata(res.data.features)
      })

      axios.get(APPI).then((res) => {
        console.log(res.data.results);
        setMaps(res.data.results)
      });
    }
  }, [latLng1]);

  const distance = userdata.map((data)=>{
    return data.properties.distance 
  }
  )

  const duration = userdata.map((data)=>{
    return data.properties.time /3600
  }
  )

const originalValue = duration;
const hours = Math.floor(originalValue);
const minutesDecimal = (originalValue - hours) * 100;
const minutes = Math.floor(minutesDecimal);
const seconds = Math.round((minutesDecimal - minutes) * 100);
const metricTime = ['H : ' + hours + ',  M : ' + minutes + ',  S : ' + seconds];
const distanceInMeters = distance;
const metersToKilometers = 0.001;
const distanceInKilometers = distanceInMeters * metersToKilometers;

useEffect((email)=>{

const emailId  = email;
  console.log(emailId);
  if (emailId === undefined) {
    setEmailTwo('Hospital Email Not Available');
    setColor('black');
    setCursor('default')
  } else {
    setEmailTwo(emailId);
    setMail('https://mail.google.com/mail/u/0/#inbox?compose=new')
  }
},[])

console.log(emailTwo)

  return ( 
    <div style={{padding:30}}>
       <Container>
        <Row>
          <Col>
            <Card style={{height:'auto', width:"auto", padding:8}}>
               <Card.Body>
                <Card.Title style={{ fontWeight:"bold", textAlign:"center"}}> * {name} * </Card.Title>
                 <hr />
                 <Card.Text>
                    Uesr Latitude :&nbsp; {latLng1.lat}
                  </Card.Text>
                  <Card.Text>
                    Uesr Longitude :&nbsp; {latLng1.lng}
                  </Card.Text>
                  <Card.Text>
                    User Formatted Address :&nbsp;&nbsp;{
                      maps.map((map)=>{
                        return map.formatted
                      })
                    }
                  </Card.Text>
                  <hr />
                  <Card.Text>
                    Hospital Latitude :&nbsp; {lat}
                  </Card.Text>
                  <Card.Text>
                    Hospital Longitude :&nbsp;{lon}
                  </Card.Text>
                  <Card.Text>
                    Hospital Formatted Address :&nbsp;{address_line2}
                  </Card.Text>
                  <hr />
                  <Card.Text>
                    Hospital Website :&nbsp;&nbsp;<Card.Link href='https://www.openstreetmap.org/copyright'>{url}</Card.Link>
                  </Card.Text>
                  <Card.Text>Hospital Email :  <Card.Link style={{color:color ,textDecoration:"none" , cursor:cursor }}  href={mail}>{emailTwo}</Card.Link></Card.Text>
                  <Card.Text>State : &nbsp;&nbsp;{state}</Card.Text>
                  <Card.Text>City : &nbsp;&nbsp;{city}</Card.Text>
                </Card.Body>              
            </Card>
          </Col>
          <Col>
            <Card>
              <Card.Body>
                <Card.Title style={{ fontWeight:"bold", textAlign:'center'}}> * Directoin To Hospital * </Card.Title>
                 <hr />
                 <Timeline>
                      <TimelineItem>
                        <TimelineSeparator>
                          <TimelineDot />
                          <TimelineConnector />
                        </TimelineSeparator>
                        <TimelineContent>
                            <Card.Text>Your location to your destination Distance ={distanceInKilometers} Km </Card.Text>
                        </TimelineContent>
                      </TimelineItem>
                      <TimelineItem>
                        <TimelineSeparator>
                          <TimelineDot />
                          <TimelineConnector />
                        </TimelineSeparator>
                        <TimelineContent>
                                  <Card.Text>Your Total Traveling Time  = {metricTime} </Card.Text>
                        </TimelineContent> 
                      </TimelineItem>
                      <TimelineItem>
                        <TimelineSeparator>
                          <TimelineDot />
                        </TimelineSeparator>
                        <TimelineContent>Enter Singer Chowrangi and take the 2nd Main Korangi Road exit onto Main </TimelineContent>
                      </TimelineItem>
                      <TimelineItem>
                        <TimelineSeparator>
                          <TimelineDot />
                        </TimelineSeparator>
                        <TimelineContent>Enter Bilal Chowrangi and take the 4th Main Korangi exit onto Road</TimelineContent>
                      </TimelineItem>
                      <TimelineItem>
                        <TimelineSeparator>
                          <TimelineDot />
                        </TimelineSeparator>
                        <TimelineContent>Enter Vita Chowrangi and take the 3rd exit Main Korangi</TimelineContent>
                      </TimelineItem>
                      <TimelineItem>
                        <TimelineSeparator>
                          <TimelineDot />
                        </TimelineSeparator>
                        <TimelineContent>Now your destination is here please give feedback ok thanks</TimelineContent>
                      </TimelineItem>
                    </Timeline>
                 <Card.Text></Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
       </Container>
    </div>
  )
}

export default Hopitals