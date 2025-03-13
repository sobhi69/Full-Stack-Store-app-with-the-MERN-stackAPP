import { FC, useState } from 'react'
import Item from '../../interfaces/Item';
import { TiDelete } from 'react-icons/ti';
import { FaRegEdit } from 'react-icons/fa';
import { matchsKeySearch } from '../../utils/helpers';
interface ItemsTableProps {
    deleteItem: (id: string) => Promise<void>,
    toggleItemUpdate: (id: string) => Promise<void>,
    items: Item[],
    isLoading: boolean

}


const ItemsTable: FC<ItemsTableProps> = ({ items, deleteItem, toggleItemUpdate, isLoading }) => {
    const [keySearch, setKeySearch] = useState<string>('')


   
    return (
        <div>
        {isLoading ? "loading ..." : !isLoading && !items.length ? 'no items to show' : (
              <div>
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
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.filter(item => matchsKeySearch(item.title,keySearch))
                        .map((item, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td className='title'>{item.title}</td>
                                <td>{item.price}</td>
                                <td>{item.cost}</td>
                                <td>{item.minPrice}</td>
                                <td>{item.quantity}</td>
                                <td>{item.category}</td>
                                <td className='actions d-f-c'>
                                    <TiDelete onClick={() => deleteItem(item._id)} size={'1.5rem'} color='red' />
                                    <FaRegEdit onClick={() => toggleItemUpdate(item._id)} size={'1.2rem'} color='blue' />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
              </div>
            )}
        </div>
    )
}

export default ItemsTable;