import React, { useEffect } from 'react'
import WriteBtn from '../component/WriteBtn'
import MeetUpCard from '../component/MeetUpCard'
import '../style/meetUp.style.css'
import { useDispatch, useSelector } from 'react-redux'
import { meetUpActions } from '../action/meetUpAction'

const MeetUp = () => {
  const dispatch = useDispatch();
  const { meetUpList } = useSelector((state) => state.meetUp);

  useEffect(() => {
    dispatch(meetUpActions.getMeetUpList());
  }, [])

  return (
    <div>
      <div className='contents-header-btns'>
        <WriteBtn type='meetUp' />
      </div>
      <div className='meet-up-container'>
        {meetUpList &&
          meetUpList.map((meetUp) => <MeetUpCard key={meetUp._id} meetUp={meetUp} />)}
      </div>
    </div>
  )
}

export default MeetUp