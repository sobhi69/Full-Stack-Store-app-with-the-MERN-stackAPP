import { FC, useState } from 'react'
import { matchsKeySearch } from '../../utils/helpers'
import Item from '../../interfaces/Item'
import useActiveSection from '../../hooks/useActiveSection'

interface AvailableItemsProps {
    items: Item[],
    addToCard: (id: string) => Promise<void>
}

const AvailableItems: FC<AvailableItemsProps> = ({ items, addToCard }) => {

    const [keySearch, setKeySearch] = useState('')
    const {setActive} = useActiveSection()

    return (
        <>
            {!items.length ? 
            <div className='d-f-c'>
                <p>"no items available!" </p>
                <button onClick={() => setActive('items')} className='btn'>create item</button>
            </div>
            : (
                <div className='available-items'>
                    <div className="search-box">
                        <input
                            onChange={(e) => setKeySearch(e.target.value)}
                            type="search"
                            placeholder='search by title' />
                    </div>
                    <table>
                        <thead>
                            <tr>
                                <th>Item No.</th>
                                <th>Title</th>
                                <th>Pirce</th>
                                <th>Cost</th>
                                <th>Min Price</th>
                                <th>Qty</th>
                                <th>Category</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.filter(item => matchsKeySearch(item.title, keySearch))
                                .map((item, index) => (
                                    <tr onClick={() => addToCard(item._id)} key={index}>
                                        <td>{index + 1}</td>
                                        <td className='title'>{item.title}</td>
                                        <td>{item.price}</td>
                                        <td>{item.cost}</td>
                                        <td>{item.minPrice}</td>
                                        <td>{item.quantity}</td>
                                        <td>{item.category}</td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
            )}
        </>
    )
}

export default AvailableItems;