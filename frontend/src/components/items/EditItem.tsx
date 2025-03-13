import { FC, FormEvent, SetStateAction, useEffect, useState } from 'react'
import Item from '../../interfaces/Item'
import { axiosInstance } from '../../api/axiosInstance'
import ItemForm from '../../interfaces/ItemForm'

interface EditItemProps {
    itemToUpdate: Item | null,
    updateItem: (itemData: ItemForm) => Promise<void>
}

const EditItem: FC<EditItemProps> = ({ itemToUpdate, updateItem }) => {
    const [itemForm, setItemForm] = useState<Item>({
        _id: "",
        "title": "",
        "category": "",
        "price": 0,
        "minPrice": 0,
        "cost": 0,
        "quantity": 0
    })

    useEffect(() => {
        if (itemToUpdate) {
            setItemForm(itemToUpdate)
        }
    }, [])

    const updateForm = (prop: any) => {
        setItemForm(prev => {
            return { ...prev, ...prop }
        })
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()

        if (itemForm.minPrice && Number(itemForm.minPrice) > Number(itemForm.price)) {
            alert("the price must be greate than the min price")
            return
        }

        if (Number(itemForm.cost) > Number(itemForm.price)) {
            alert("the price must be greate than the cost")
            return
        }

        updateItem(itemForm)

    }

    return (
        <div className='form'>
            <h2>Create new item</h2>
            <form onSubmit={(e) => handleSubmit(e)}>
                <div className="group-form">
                    <label htmlFor="title">Title</label>
                    <input
                        value={itemForm.title}
                        onChange={(e) => updateForm({ title: e.target.value })}
                        type="text"
                        id='title'
                        placeholder='title' />

                </div>
                <div className="group-form">
                    <label htmlFor="category">Category</label>
                    <input
                        value={itemForm.category}
                        onChange={(e) => updateForm({ category: e.target.value })}
                        type="text"
                        id='category'
                        placeholder='optional' />

                </div>

                <div className="group-form">
                    <label htmlFor="price">Price</label>
                    <input
                        value={itemForm.price}
                        onChange={(e) => updateForm({ price: e.target.value })}
                        type="number"
                        id='price'
                        required
                        placeholder='price' />
                </div>
                <div className="group-form">
                    <label htmlFor="cost">Cost</label>
                    <input
                        value={itemForm.cost}
                        onChange={(e) => updateForm({ cost: e.target.value })}
                        type="number"
                        id='cost'
                        required
                        placeholder='cost' />
                </div>
                <div className="group-form">
                    <label htmlFor="minPrice">min Price</label>
                    <input
                        value={itemForm.minPrice}
                        onChange={(e) => updateForm({ minPrice: e.target.value })}
                        type="number"
                        id='minPrice'
                        required
                        placeholder='min price' />
                </div>
                <div className="group-form">
                    <label htmlFor="quantity">Quantity</label>
                    <input
                        value={itemForm.quantity}
                        onChange={(e) => updateForm({ quantity: e.target.value })}
                        type="number"
                        id='quantity'
                        required
                        placeholder='quantity' />
                </div>

                <input type="submit" value="Update" className='btn submit-btn' />
            </form>
        </div>
    )
}

export default EditItem;