import React,{useContext} from 'react'
import { GlobalDispatchContext } from '../../../state/context/GlobalContext';

const HeaderIcon = ({Icon,name}) => {
  const dispatch = useContext(GlobalDispatchContext);

  const handleClickIcon = () => {
    if (name === 'Add') {
      dispatch({
        type: 'SET_IS_UPLOAD_POST_MODAL_OPEN',
        payload: {
          isUploadPostModalOpen: true,
        },
      });
    }
  };
  return (
    <div className=' p-3 hover:bg-yellow-400  transition  rounded'>
        <Icon
        onClick={handleClickIcon}
        className="text-yellow hover:text-black "
        size = {30}
        />
    </div>
  )
};

export default HeaderIcon;