import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { postActions } from '../action/postAction';
import AdminPostCard from '../component/AdminPostCard';
import { Row, Col } from 'react-bootstrap'

const AdminPost = () => {
  const dispatch = useDispatch();
  const { postList } = useSelector((state) => state.post);
  
  useEffect(() => {
    dispatch(postActions.getPostList());
  }, [])

  return (
    <Row>
      {postList && postList.map((post) => (
        <Col key={post._id} xs={12} sm={6} md={4} lg={3}>
          <AdminPostCard post={post} />
        </Col>
      ))}
    </Row>
  )
}

export default AdminPost