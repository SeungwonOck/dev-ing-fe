import React from 'react'
import WriteBtn from '../component/WriteBtn'
import HomeMeetUpCard from '../component/home/HomeMeetUpCard'
import '../style/meetUp.style.css'

const MeetUp = () => {
  return (
    <div>
      <div className='contents-header-btns'>
        <WriteBtn type='meetUp'/>
      </div>
      <div className='meet-up-container'>
        <HomeMeetUpCard/>
        <HomeMeetUpCard/>
        <HomeMeetUpCard/>
        <HomeMeetUpCard/>
        <HomeMeetUpCard/>
        <HomeMeetUpCard/>
        <HomeMeetUpCard/>
        <HomeMeetUpCard/>
        <HomeMeetUpCard/>
      </div>
    </div>
  )
}

export default MeetUp