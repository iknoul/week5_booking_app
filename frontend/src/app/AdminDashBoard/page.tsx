'use client'
import axios from './../../utils/axios'
import DashBoardCardContainer from '../components/DashBoardCardContainer/DashBoardCardContainer'
import AddData from '../components/AddData/AddData'
import { Alert, Spin } from 'antd';

import PrivateRoute from '../components/PrivateRouter'



import styles from './adminDashBoard.module.css'
import { useState } from 'react'
import Item from 'antd/es/list/Item'

const AdminDashBoard:React.FC = ()=>{

    const [success, setSuccess] = useState(false)
    const [fail, setFail] = useState(false)
    const [loading, setLoading] = useState(false)
    const [selectedItem, setSelectedItem] = useState({ item: '', purpose: '' });


    const callbackFunction = async(data?:object, item?:string, puprose?: string)=>{
        setLoading(true)
        if(data)
        {
            switch(item){
                case "Theater":
                    if(puprose == 'add')
                    {
                        console.log('asas')
                        await makeNewTheater(data)
                    }
                    break;
                case "Movie":
                    if(puprose == 'add')
                    {
                        await makeNewMovie(data)
                    }
                    break;
                case "Show time":
                    if(puprose == "add")
                    {
                        console.log(data)
                        await makeNewShowTime(data)
                    }
                default:
                    setSelectedItem({ item: '', purpose: '' })
                    
            }
        }
        else
        {
            setSelectedItem({ item: '', purpose: '' })
        }
        setLoading(false)

    }
    const makeNewTheater = async(theater:object)=>{
        setLoading(true)
        console.log('here')
        const response = await axios.post('/admin/add-theater',{theater})
        await new Promise((resolve) => setTimeout(resolve, 5000));
        console.log(response)

        if(response?.status === 201){
            setSuccess(true)
            setSelectedItem({item:'', purpose:''})
            setTimeout(()=>{setSuccess(false)}, 5000)
        }
        else{
            setFail(true)
            setSelectedItem({item:'', purpose:''})
            setTimeout(()=>{setFail(false)}, 2500)
        }
        setLoading(false)

    }

    const makeNewMovie = async(movie:object) =>{
        setLoading(true)
        console.log('here')
        const response = await axios.post('/admin/add-movie',{movie})
        await new Promise((resolve) => setTimeout(resolve, 5000));
        console.log(response)

        if(response?.status === 201){
            setSuccess(true)
            setSelectedItem({item:'', purpose:''})
            setTimeout(()=>{setSuccess(false)}, 5000)
        }
        else{
            setFail(true)
            setSelectedItem({item:'', purpose:''})
            setTimeout(()=>{setFail(false)}, 2500)
        }
        setLoading(false)
    }

    const makeNewShowTime = async(data:object) =>{
        setLoading(true)
        console.log(data, "here inside the make new")
        try {
            await axios.post('/admin/add-show-time', data);
            setSuccess(true)
            setSelectedItem({item:'', purpose:''})
            setTimeout(()=>{setSuccess(false)}, 5000)
        } catch (error) {
            console.error('Error adding showtime:', error);
        }
        setLoading(false)
    }

    


    return(
        <PrivateRoute roleP='admin'>
            <div className={styles.adminDashBoard}>
                {success &&
                    <Alert message="Done" type="success" showIcon className={styles.alert}/>
                }
                {fail&&
                    <Alert message="Error" type="error" showIcon />
                }
                {loading&&
                    <Spin className={styles.Spin}/>
                }
                  
                {selectedItem.item && (
                    <AddData 
                    item={selectedItem.item}
                    purpose={selectedItem.purpose}
                    callbackFunction={callbackFunction}
                    // visible = {true}
                    />
                )}
                <DashBoardCardContainer selectedItem={selectedItem} setSelectedItem={setSelectedItem}/>
            </div>
        </PrivateRoute>
    )
}

export default AdminDashBoard