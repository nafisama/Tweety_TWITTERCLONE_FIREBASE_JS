import React from 'react'

const HeaderIcon = ({Icon,name}) => {
  return (
    <div className=' p-3 hover:bg-yellow-400  transition  rounded'>
        <Icon
        className="text-yellow hover:text-black "
        size = {30}
        />
    </div>
  )
};

export default HeaderIcon;