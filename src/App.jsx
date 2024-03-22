import { Header } from "./components/Header"
import  {Product}  from "./components/Product"
import { db } from "./db/data"
import { useState, useEffect } from "react"
function App() {
  const initialCart = ()=>{
    const localStorageCart = localStorage.getItem('cart')
    return localStorageCart ? JSON.parse(localStorageCart) : []
  }
  const [cart,setCart]=useState(initialCart)
  
  const MAX_ITEMS = 5
  const MIN_ITEMS =1

  useEffect(()=>{
    localStorage.setItem('cart',JSON.stringify(cart))
  },[cart])
  
  function addToCart(item){
    const itemExists = cart.findIndex(guitar=> guitar.id === item.id)
    if(itemExists>=0){
      if(cart[itemExists].quantity>= MAX_ITEMS) return
      const updatedCart = [...cart]
      updatedCart[itemExists].quantity++
      setCart(updatedCart)
    }else{
      item.quantity = 1
      setCart(prevState=>[...prevState,item])
    }
  }
  function removeFromCart(id){
    setCart(prevState=>prevState.filter(product=>product.id !== id))
  }
  function increaseQuantity(id){
    const updatedCart = cart.map(
      product =>{
        if(product.id === id && product.quantity < MAX_ITEMS){
          return{
            ...product,
            quantity: product.quantity + 1
          }
        }
        return product
      }
    )
    setCart(updatedCart)
  }
  function decreamentQuantity(id){
    const updatedCart = cart.map(
      product =>{
        if(product.id === id && product.quantity > MIN_ITEMS){
          return{
            ...product,
            quantity: product.quantity - 1
          }
        }
        return product
      }
    )
    setCart(updatedCart)
  }
  function clearCart(){
    setCart([])
  }
  return (
    <>
    <Header 
      cart={cart} 
      removeFromCart={removeFromCart} 
      clearCart={clearCart}
      increaseQuantity={increaseQuantity}
      decreamentQuantity={decreamentQuantity}
    />

    <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>
        <div className="row mt-5">
          {db.map(guitar=>(
              <Product 
                key={guitar.id} 
                guitar={guitar}
                addToCart={addToCart}
              />
            ))
          }
        </div>
    </main>


    <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
            <p className="text-white text-center fs-4 mt-4 m-md-0">GuitarLA - Todos los derechos Reservados</p>
        </div>
    </footer>
    </>
  )
}

export default App
