import { FC, FormEvent, useRef, useState } from 'react'
import ItemForm from '../../interfaces/ItemForm';

interface CreateItemProps {
    createItem: (itemData: ItemForm) => Promise<void>,
}

const CreateItem: FC<CreateItemProps> = ({ createItem }) => {
    const [itemForm, setItemForm] = useState<ItemForm>({
        "title": "",
        "category": "",
        "price": 0,
        "minPrice": 0,
        "cost": 0,
        "quantity": 0
    })

    const popupMess = useRef<HTMLDivElement>(null)

    const updateForm = (prop: any) => {
        setItemForm(prev => {
            return { ...prev, ...prop }
        })
    }

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()

        if (itemForm.minPrice && Number(itemForm.minPrice) > Number(itemForm.price)) {
            alert("the price must be greate than the min price")
            return
        }

        if (Number(itemForm.cost) > Number(itemForm.price)) {
            alert("the price must be greate than the cost")
            return
        }

        createItem(itemForm)

        if (popupMess.current) {
            popupMess.current.classList.add('active')
        }
        setTimeout(() => {
            if (popupMess.current) {
                popupMess.current.classList.remove('active')
            }
        }, 3000)

        setItemForm(prev => {
            return { ...prev, title: "" }
        })
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
                        required
                        placeholder='title' />
                </div>
                <div className="group-form">
                    <label htmlFor="title">Category</label>
                    <input
                        value={itemForm.category}
                        onChange={(e) => updateForm({ category: e.target.value })}
                        type="text"
                        id='title'
                        placeholder='optional' />

                </div>
                <div className="group-form">
                    <label htmlFor="cost">Cost</label>
                    <input
                        onChange={(e) => updateForm({ cost: e.target.value })}
                        type="number"
                        id='cost'
                        required
                        placeholder='cost' />
                </div>
                <div className="group-form">
                    <label htmlFor="cost">Price</label>
                    <input
                        onChange={(e) => updateForm({ price: e.target.value })}
                        type="number"
                        id='price'
                        required
                        placeholder='price' />
                </div>
                <div className="group-form">
                    <label htmlFor="minPrice">min Price</label>
                    <input
                        onChange={(e) => updateForm({ minPrice: e.target.value })}
                        type="number"
                        id='minPrice'
                        placeholder='min price' />
                </div>
                <div className="group-form">
                    <label htmlFor="quantity">Quantity</label>
                    <input
                        onChange={(e) => updateForm({ quantity: e.target.value })}
                        type="number"
                        id='quantity'
                        required
                        placeholder='quantity' />
                </div>

                <input type="submit" value="Create" className='btn submit-btn' />
            </form>
            <div ref={popupMess} className="popup-mess">created Successfully</div>
        </div>
    )
}

export default CreateItem;