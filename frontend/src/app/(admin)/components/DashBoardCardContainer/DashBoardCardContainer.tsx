import DashBoardCard from '../DashBoardCard/DashBoardCard'

import styles from './dashBoardCardContainer.module.css'

interface SelectedItem {
    item: string;
    purpose: string;
}

interface DashBoardCardContainerProps {
    selectedItem: SelectedItem;
    setSelectedItem: Function;
}
  
const DashBoardCardContainer:React.FC<DashBoardCardContainerProps> = ({selectedItem, setSelectedItem})=>{


    // Function to handle visibility and pass props to AddData
    const handleVisibilityChange = (item:string, purpose:string) => {
      if(selectedItem.item==item){
        setSelectedItem({item:'', purpose:'' })
      }
      else
      {
        setSelectedItem({ item, purpose }); // Set the clicked card's item and purpose
      }
    };
    

    return( 
    <div className={styles.dashBoardCardContainer}>
     
        
        <DashBoardCard 
            text='Theater'
            purpose='add'
            callBackFunction={() => handleVisibilityChange('Theater', 'add')} 
        />
         <DashBoardCard 
            text='Theater'
            purpose='edit'
            callBackFunction={() => handleVisibilityChange('Theater', 'edit')} 
        />
        <DashBoardCard 
            text='Movie'
            purpose='add'
            callBackFunction={() => handleVisibilityChange('Movie', 'add')} 
        />
        <DashBoardCard 
            text='Movie'
            purpose='edit'
            callBackFunction={() => handleVisibilityChange('Movie', 'edit')} 
        />
        <DashBoardCard 
            text='Show time'
            purpose='add'
            callBackFunction={() => handleVisibilityChange('Show time', 'add')} 
        />
        <DashBoardCard 
            text='Movie manually'
            purpose='add'
            callBackFunction={() => handleVisibilityChange('Movie manually', 'add')} 
        />
         {/* <DashBoardCard 
            text='Show'
            purpose='add'
        />
        <DashBoardCard 
            text='Show'
            purpose='edit'
        />
         <DashBoardCard 
            text='Theater'
            purpose='add'
        />
        <DashBoardCard 
            text='Theater'
            purpose='edit'
        /> */}
        {/* <DashBoardCard 
            text='Film'
            purpose='add'
        />
        <DashBoardCard 
            text='Theater'
            purpose='add'
        />
         <DashBoardCard 
            text='Theater'
            purpose='edit'
        />
        <DashBoardCard 
            text='Film'
            purpose='add'
        /> */}
        

    </div>)
}

export default DashBoardCardContainer