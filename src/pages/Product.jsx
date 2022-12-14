import styled from "styled-components"
import Announcement from "../components/Announcement"
import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import NewsLetter from "../components/NewsLetter"
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { mobile } from "../Responsive"
import { useLocation } from "react-router-dom"
import { useEffect, useState } from "react"
import { publicRequest } from "../requestMethod"
import { addProduct } from "../redux/cartRedux"
import { useDispatch } from "react-redux"

const Container = styled.div`
`;

const Wrapper = styled.div`
padding: 50px;
display: flex;
${mobile({padding: "10px", flexDirection:"column"})}
`;
const ImgContainer = styled.div`
flex: 1
`;

const Image = styled.img`
 width: 100%;
 height: 90v;
 object-fit: cover;
 ${mobile({height: "40vh"})}
`;

const InfoContainer = styled.div`
flex: 1 ;
padding: 0px 50px;
${mobile({padding: "10px"})}
`;

const Title = styled.h1`
font-weight: 200;
`;

const Desc = styled.p`
 margin: 20px 0px;
`;

const Price = styled.span`
font-weight: 100;
font-size: 40px;
`;
const FilterContainer = styled.div`
width: 50%;
margin: 30px 0px;
display: flex;
justify-content: space-around;
${mobile({width: "100%"})}
`;

const Filter = styled.div`
display: flex;
align-items: center;
`;

const FilterTitle = styled.span`
font-size: 20px;
font-weight: 200;
`;

const FilterColor = styled.div`
width: 20px;
height: 20px;
border-radius: 50%;
background-color: ${(props)=>props.color};
margin: 0px 5px;
cursor: pointer;
`;

const FilterSize = styled.select`
padding: 5px;
margin-left: 10px;
`;

const FilterSizeOption = styled.option``;

const AddContainer = styled.div`
width: 50%;
display: flex;
align-items: center;
justify-content: space-between;
${mobile({width: "100%"})}
`;
const AmountContainer = styled.div`
display: flex;
align-items: center;
font-weight: 700;
`;
const Amount = styled.span`
width: 30px;
height: 30px;
border-radius: 10px;
border: 1px solid teal;
display: flex;
justify-content: center;
align-items: center;
margin: 0px 5px;
`;
const Button = styled.button`
padding: 15px;
border: 2px solid teal;
background-color: white;
cursor: pointer;
font-weight: 500;
font-size: 18px;

&:hover{
  background-color: grey;
}
`;

const Product = () => {
    const location = useLocation();
    const id = location.pathname.split("/")[2];
    const [product, setProduct] = useState("");
    const [quantity ,setQuantity] = useState(1);
    const [color ,setColor] = useState("");
    const [size ,setSize] = useState("");
    const dispatch = useDispatch()
    

    useEffect(()=>{
        const getProduct = async()=>{
            try {
                const res = await publicRequest.get("/product/getProduct/" + id)
                setProduct(res.data)
            } catch (error) {
                setProduct(null)
            }
        }
        getProduct()
    },[id])
    const handleQuantity =(type)=>{
        if(type==="dec"){
          quantity > 1 && setQuantity(quantity - 1)
        }else{
            setQuantity(quantity + 1)
        }
    }
    const handleClick = ()=>{
        //update cart
        dispatch(addProduct({...product, quantity,color,size }))
    }
  return (
    <Container> 
        <Navbar />
        <Announcement />
        { product!== null ? product !=="" ?
        <Wrapper>
            <ImgContainer>
                <Image src={product.product.img}/>
            </ImgContainer>
            <InfoContainer>
                <Title>{product.product.title}</Title>
                <Desc>{product.product.desc}</Desc>
                 <Price>$ {product.product.price}</Price>
                 <FilterContainer>
                    <Filter>
                        <FilterTitle>Color</FilterTitle>
                        {product.product.color.map((c)=>(
                            <FilterColor color={c} key={c} onClick={()=>setColor(c)}/>
                        ))}
                        
                    </Filter>
                    <Filter>
                        <FilterTitle>Size</FilterTitle>
                        <FilterSize onChange={(e)=>setSize(e.target.value)}>
                        {product.product.size.map((s)=>(
                            <FilterSizeOption key={s} >{s}</FilterSizeOption>
                        ))}
                        </FilterSize>
                    </Filter>
                 </FilterContainer>
                 <AddContainer>
                    <AmountContainer>
                        <RemoveIcon onClick={()=> handleQuantity("dec")}/>
                            <Amount>{quantity}</Amount>
                        <AddIcon onClick={()=> handleQuantity("inc")}/>
                    </AmountContainer>
                    <Button onClick={handleClick}>Add to Cart</Button>
                 </AddContainer>
            </InfoContainer>
        </Wrapper>
        : <Filter> Loading.....</Filter> : <Filter>the is no products </Filter> }
        <NewsLetter/>
        <Footer/>
    </Container>
  )
}

export default Product