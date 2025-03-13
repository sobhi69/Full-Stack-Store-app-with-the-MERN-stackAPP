import { FC } from 'react'
import Items from '../items/Items';
import Sale from '../sale/Sale';
import Users from '../users/Users';
import Clients from '../clients/Clients';
import Transactions from '../transactions/Transactions';
import useActiveSection from '../../hooks/useActiveSection';

interface ContentProps {
}

const Content: FC<ContentProps> = ({ }) => {
    const {active} = useActiveSection()
    
    return (
        <div style={{padding:"0 2rem"}}>
            {active == 'items' && <Items />}
            {active == 'sale' && <Sale />}
            {active == 'users' && <Users />}
            {active == 'clients' && <Clients />}
            {active == 'transactions' && < Transactions />}
        </div>
    )
}

export default Content;