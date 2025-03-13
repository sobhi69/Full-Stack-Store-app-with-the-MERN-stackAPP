import { FC, useEffect, useState } from 'react'
import SaleCard from './SaleCard'
import './sale.css'
import AvailableItems from './AvailableItems'
import Item from '../../interfaces/Item'
import { axiosInstance } from '../../api/axiosInstance'
import useFetch from '../../hooks/useFetch'
import UserProfile from '../../interfaces/UserProfile'
import ClientProfile from '../../interfaces/ClientProfile'
import ClientForm from '../../interfaces/ClientForm'
import SaleForm from '../../interfaces/SaleForm'
interface SaleProps {

}

// first we're gonna create two sections
// sale card
// items to sale

// sale 
// user
// client
// itemsToSales
// total, dis , add
// 


const Sale: FC<SaleProps> = ({ }) => {


  const [items, setItems] = useState<Item[]>([])
  const [users, setUsers] = useState<UserProfile[]>([])
  const [clients, setClients] = useState<ClientProfile[]>([])
  const [cardItems, setCardItems] = useState<Item[]>([])



  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await axiosInstance.get('/user/get-users')
        const dataRes = await response.data
        setUsers(dataRes)

      } catch (error: any) {
        const errMess = await error.response.data.message
        alert(errMess)
      } finally {
      }
    }
    const getClients = async () => {
      try {
        const response = await axiosInstance.get('/client/get-clients')
        const dataRes = await response.data
        setClients(dataRes)

      } catch (error: any) {
        const errMess = await error.response.data.message
        alert(errMess)
      } finally {
      }
    }
    const getItems = async () => {
      try {
        const response = await axiosInstance.get('/item/get-items')
        const dataRes = await response.data
        setItems(dataRes)

      } catch (error: any) {
        const errMess = await error.response.data.message
        alert(errMess)
      } finally {
      }
    }
    getUsers()
    getClients()
    getItems()
    return
  }, [])


  const createNewClient = async (clientForm: ClientForm) => {

    try {
      const response = await axiosInstance.post('/client/create', clientForm)
      const newClient = await response.data
      setClients(prev => {
        return [newClient, ...prev]
      })
      return true
    } catch (error: any) {
      const errMess = error.response.data.message
      alert(errMess)
      return false
    }
  }

  const addToCard = async (id: string) => {

    const foundItem = items.find(item => item._id == id)
    if (!foundItem) {
      alert(`this item is no longer available`)
      return
    }

    const quantityInput = prompt(`how many items you want to add from item: ${foundItem.title} \n you have ${foundItem.quantity} available`)

    if (isNaN(Number(quantityInput)) || Number(quantityInput) <= 0) {
      alert('please enter valid number')
      return
    }

    if (Number(quantityInput) > foundItem.quantity) {
      alert(`sorry, we only have ${foundItem.quantity} available!`)
      return
    }

    const conflic = cardItems.find(item => item._id == id)



    if (conflic) {
      const updatedItems = cardItems.map(item => {
        if (item._id != id) {
          return item
        } else {
          return { ...item, quantity: conflic.quantity + Number(quantityInput) }
        }
      })
      setCardItems(updatedItems)
      const updatedAvailableItems = items.map(item => {
        if (item._id != id) {
          return item
        } else {
          return { ...item, quantity: item.quantity - Number(quantityInput) }
        }
      })
      setItems(updatedAvailableItems)
      return
    }

    setCardItems(prev => {
      return [...prev, { ...foundItem, quantity: Number(quantityInput) }]
    })
    const updatedAvailableItems = items.map(item => {
      if (item._id != id) {
        return item
      } else {
        return { ...item, quantity: item.quantity - Number(quantityInput) }
      }
    })

    setItems(updatedAvailableItems)

    try {
      await axiosInstance.patch(`/item/${id}`, { quantity: foundItem.quantity - Number(quantityInput) })
    } catch (error: any) {
      const errMess = await error.response.data.message
      alert(errMess)
    }
  }



  const deleteFromCard =async (id: string) => {

    const filteredCard = cardItems.filter(item => item._id != id)
    setCardItems(filteredCard)
    const deletedQuantity = cardItems.find(item => item._id == id)?.quantity

    const newItems = items.map(item => {
      if (item._id == id) {
        return { ...item, quantity: item.quantity + Number(deletedQuantity) }
      } else {
        return item
      }
    })
    setItems(newItems)

    const foundItem = items.find(item => item._id == id)
    const soldItem = cardItems.find(item => item._id == id)

    try {
      await axiosInstance.patch(`/item/${id}`, { quantity: Number(foundItem?.quantity) + Number(soldItem?.quantity) })
    } catch (error: any) {
      const errMess = await error.response.data.message
      alert(errMess)
    }

  }

  const createSale = async (saleForm: SaleForm) => {
    const { cardItems, total } = saleForm
    if (!cardItems.length) {
      alert(`please select at least one item`)
      return
    }

    if (total < 0) {
      alert('total must be greater than 0')
      return
    }

    try {
      const response = await axiosInstance.post('/sale/create', saleForm)
    } catch (error: any) {
      const errMess = await error.response.data.message
      alert(errMess)
    }

  }

  return (
    <div className='sale-page'>
      <SaleCard
        users={users}
        clients={clients}
        createNewClient={createNewClient}
        cardItems={cardItems}
        deleteFromCard={deleteFromCard}
        createSale={createSale}
      />

      <AvailableItems
        items={items}
        addToCard={addToCard}
      />

    </div>
  )
}

export default Sale;