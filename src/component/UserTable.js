import React from 'react'
import { Table } from "react-bootstrap";

const UserTable = ({ header, data }) => {
    return (
        <div className="overflow-x">
            <Table striped bordered hover>
                <thead>
                    <tr>
                        {header.map((title) => (
                            <th>{title}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data && data.length > 0 ? (
                        data.map((item, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td><img src={item.profileImage} alt={item.userName} style={{ width: '50px', height: '50px' }} /></td>
                                <td>{item.userName}</td>
                                <td>{item.email}</td>
                                <td>{item.description}</td>
                                <td>{item.gender}</td>
                                <td>{item.rank}</td>
                                <td>{item.specs}</td>
                                <td>{item.following}</td>
                                <td>{item.followers}</td>
                                <td>{item.isDelete ? 'Yes' : 'No'}</td>
                                <td>{item.isBlock ? 'Yes' : 'No'}</td>
                                <td>{item.level}</td>
                                <td>{item.report}</td>
                                <td>{item.createAt ? `${item.createAt.date} ${item.createAt.time}` : "Date Not Provided"}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={header.length}>No Data to show</td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </div>
    )
}

export default UserTable
