import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import restroImage from '../../assets/Images/MacBook+Pro+-+22banner-17.png'
import { useNavigate } from "react-router-dom";
interface ActionAreaCardProps {
  restro:any
}
export default function ActionAreaCard({ restro }: any) {

  const navigate = useNavigate();
  const handleClick = () => {

   if(restro){
    navigate('/Restaurant', { state: { restro } });
   }
  };


  return (
    <Card sx={{ maxWidth: 345 }} className='card' onClick={handleClick}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={restroImage} // assume restro.image is the image URL
          alt={restro.name} // assume restro.name is the alt text
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {restro.name} 
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {restro.type} 
          </Typography>
          <br/>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Opening Time: {restro.openingTime}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Closing Time: {restro.closingTime}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}


