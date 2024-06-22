import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { userActions } from "../action/userAction";
import ClipLoader from 'react-spinners/ClipLoader';
import UserTable from "../component/UserTable";

const Admin = () => {
  const dispatch = useDispatch();
  const { userList, loading } = useSelector((state) => state.user);
  const tableHeader = [
    "#",
    "Details",
    "Description",
    "Gender",
    "Rank",
    "Stacks",
    "Following",
    "Followers",
    "isDelete",
    "isBlock",
    "Level",
    "Report",
    "CreatedAt"
  ];

  useEffect(() => {
    dispatch(userActions.getUserList());
  }, [dispatch]);

  return (
    <div className="locate-center">
      {loading ?
        (<div className='loading'><ClipLoader color="#28A745" loading={loading} size={100} /></div>) :
        <UserTable
          header={tableHeader}
          data={userList}
        />
      }
    </div>
  )
}

export default Admin