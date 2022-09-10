import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import styled from 'styled-components'
import { Link } from 'react-router-dom';

const Info = styled.div`
 opacity: 0;
 width: 100%;
 height: 100%;
 position: absolute;
 left: 0;
 top: 0;
background-color: rgb(0,0,0,0.2);
z-index: 3;
align-items: center;
justify-content: center;
display: flex;
`

const Container = styled.div`
flex: 1;
margin: 5px;
min-width: 280px;
height: 350px;
display: flex;
align-items: center;
justify-content: center;
background-color: #f5fbfd;
position: relative;

&:hover ${Info}{
  opacity: 1;
}
`;

const Circle = styled.div`
 width: 200px;
 height: 200px;
 border-radius: 50%;
 background-color: white;
 position: absolute;
`
const Image = styled.img`
 height: 75%;
 z-index: 2;
`
const Icon = styled.div`
width: 40px;
height: 40px;
border-radius: 50%;
background-color: white;
display: flex;
justify-content: center;
align-items: center;
margin: 10px;
transition: all 0.5s ease;

 &:hover{
    background-color: #e9f5f5;
    transform: scale(1.1);
 }
`
 
const Product = ({item}) => {
  
  return (
    <Container>
        <Circle />
        <Image src={item.img}/>
        <Info>
            <Icon>
                 <ShoppingCartOutlinedIcon />
            </Icon>
            <Icon>
              <Link to ={`/product/${item._id}`} className='link'>
                <SearchOutlinedIcon/>
              </Link>     
            </Icon>
            <Icon>
                <FavoriteBorderOutlinedIcon/>
            </Icon>

        </Info>
    </Container>
  )
}

export default Product