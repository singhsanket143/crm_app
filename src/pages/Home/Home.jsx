import './Home.css'

import { BsFillPencilFill} from 'react-icons/Bs'
import { TbProgressBolt} from 'react-icons/Tb'

import Card from '../../component/Card/Card';
import useTickets from '../../hooks/useTickets';
import HomeLayout from '../../Layouts/HomeLayout';



function Home () {

    
    const [ticketsState] = useTickets();


    return (
        <>
        <HomeLayout>
           
          
            <div className='d-flex justify-content-center flex-wrap'>
                <Card quantity={ticketsState.ticketDistribution.open} titleText={'Open'}>
                    <BsFillPencilFill />  
                </Card>

                <Card titleText={'inProgress'} quantity={ticketsState.ticketDistribution.inProgress}>
                    <TbProgressBolt />  
                </Card>

                <Card titleText={'Resolved'} quantity={ticketsState.ticketDistribution.resolved}>
                    <TbProgressBolt />  
                </Card>

                <Card titleText={'onHold'} quantity={ticketsState.ticketDistribution.onHold}>
                    <BsFillPencilFill />  
                </Card>

                <Card titleText={'Canceled'} quantity={ticketsState.ticketDistribution.canceled}>
                    <BsFillPencilFill />  
                </Card>
               
                
            </div>

            

        </HomeLayout>
        
        </>
    )
}

export default Home;