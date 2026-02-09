import { useEffect, useState, useRef } from 'react'
import './style.css'
import Trash from '../../assets/Trash.svg'
import api from '../../services/api'


// react userefefect para fazer a requisição quando o componente for montado
function Home() {

 const [users, setUsers] = useState([])
 const inputName = useRef()
 const inputAge = useRef()
 const inputPedido = useRef()

  async function getUsers(){
    const usersFromApi = await api.get('/usuarios')

    setUsers(usersFromApi.data)

  }
   async function createUsers(){
    await api.post('/usuarios', {
      name: inputName.current.value,
      age: inputAge.current.value,
      pedido: inputPedido.current.value
    })
    getUsers()
  }
   async function deleteUsers(id){
    await api.delete(`/usuarios/${id}`)
    getUsers()
  }
  useEffect(() => {
    getUsers()
  }, [])
  return (

    <div className='container'>
      <form>
        <h1>Cadastro de pedidos +18!!!</h1>
        <input name="name" type='text' placeholder="Nome do doido" ref={inputName} />
        <input name="age" type='number' placeholder="Sua idade" ref={inputAge} />
        <input name="pedido" type='text' placeholder="Pedido do doido" ref={inputPedido} />
        <button type="button" onClick={createUsers}>Cadastre seu hantei</button>
      </form>
      {users.map(user => (

        <div key={user.id} className='card'>
          <div>
            <p>Nome: <span>{user.name}</span></p>
            <p>Idade: <span>{user.age}</span></p>
            <p>Pedido: <span>{user.pedido}</span></p>

          </div>
          <button onClick={() => deleteUsers(user.id)}>
            <img src={Trash} />
          </button>
        </div>
      ))}
    </div>


  )
}

export default Home
