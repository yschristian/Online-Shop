import React from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components'
import { mobile } from '../Responsive';

const Container =  styled.div`
  flex: 1;
  margin: 3px;
  height: 70vh;
  position:relative
`;

const Image =  styled.img`
 width : 100%;
 height: 100%;
 object-fit: cover;
 ${mobile({height:"30vh"})}
 
`;

const Info =  styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  flex-direction: column;
  align-items: center;
  display: flex;
  justify-content: center
`;

const Title =  styled.h1`
 color: black;
 margin-bottom: 20px;
 font-weight:600
 
`;
const Button =  styled.button`
 border: none;
 padding: 10px;
 background-color: white;
 color: gray;
 font-size:18px;
 cursor: pointer;
 font-weight:600
`;

const CategoryItem = ({item}) => {
  return (
    <Container>
      <Link to={`/products/${item.cat}`}>
         <Image src={item.img} />
            <Info>
                 <Title>{item.title}</Title>
                 <Button>SHOP NOW</Button>
            </Info>
      </Link>
    </Container>
  )
}

export default CategoryItem