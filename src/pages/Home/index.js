import { Button, Frame, Icon, Pagination, Select, Toast } from "@shopify/polaris";
import React, { useEffect, useState } from "react";
import UserAPI from "../../api/userApi";
import TableCustom from "../../components/Table";
import { limitRange, listHeadings, listSort } from "./constants";
import "./index.scss";
import {
    MobileBackArrowMajor
} from '@shopify/polaris-icons';
import {useHistory} from "react-router-dom"


const Home = (props) => {
    const [listUsers, setListUsers] = useState([]);
    const [limit, setLimit] = useState(5);
    const [nowPage, setNowPage] = useState(1);
    const [isFetchUser, setIsFetchUser] = useState(false);
    const [errorToast, setErrorToast] = useState(false);
    const [successToast, setSuccessToast] = useState(false);

    const history = useHistory();

    const ActionsComponent = (props) => {
        const {user} = props;
        const handleDeleteUser = async() => {
             await UserAPI.deleteUser(user[0])
             .then(res => setIsFetchUser(!isFetchUser))
             .then(() => setSuccessToast(true))
             .catch(e => setErrorToast(true))
        }
        return (
            <div className="actions">
                <div className="delete_btn">
                    <Button 
                        monochrome outline
                        onClick={() => handleDeleteUser(user)}
                    >
                        Delete
                    </Button>
                </div>
            </div>
        )
    }
    // fetch list Users
    useEffect(() => {
        const fetchListUser = async() => {
            await UserAPI.getAllUser()
            .then((res) => setListUsers(res));
        }
        fetchListUser()
    },[isFetchUser])
    
    const handlePushToMap = () => {
        const win = window.open("/map", "_blank");
         win.focus();
    }

    const dataUsers = listUsers.data ? listUsers.data.map(item => Object.values(item)) : [];
    // render action delete button
    const newDataUsers = dataUsers.map(item => 
        {
            item.push( <ActionsComponent user={item} />);
            item.splice(2,1,<p style={{cursor:"pointer"}} onClick={() => handlePushToMap(item[2])}>{item[2]}</p>)
        })
    const pageLength = Math.ceil(dataUsers.length / limit);
    const panigationPage = <span style={{padding:"0 10px"}}>{nowPage}</span>;
    // render Data by panigation and limit 
    const renderData = (page, limit, pageLength, data) => {
        let startIndex = (page-1) * (+limit);
        let finishIndex = startIndex + (+limit );
        console.log(finishIndex)
        if(finishIndex > data.length) {
            finishIndex = data.length
        }
        console.log(startIndex, finishIndex,page,limit,pageLength,data)
        return data.slice(startIndex,finishIndex)
    }
    return (
        <div className="home">
            <div className="home_container">
                <div onClick={() => history.push("/login")} className="back_login">
                   <Button>Back to Login !</Button>
                </div>
                <p className="title">List Users</p>
                <TableCustom 
                    style={{width:"100%"}}
                    listData={renderData(nowPage,limit,pageLength,dataUsers)}
                    listHeadings={listHeadings}
                    listSort= {listSort}
                />
                <div className="footer">
                    <Select
                        options={limitRange}
                        onChange={(value) => setLimit(value)}
                        value={limit}
                    />
                    <p style={{color:"black"}}>Show page {nowPage} of {pageLength} pages</p>
                    <div className="panigation">
                        <Pagination
                            label={panigationPage}
                            hasPrevious
                            onPrevious={() => {
                                nowPage > 1 ? setNowPage(page => page - 1) : setNowPage(1)
                            }}
                            hasNext
                            onNext={() => {
                                nowPage < pageLength ? setNowPage(page => page + 1) : setNowPage(pageLength)
                            }}
                        />
                    </div>
                </div>
                <div style={{height:"0px"}}>
                    <Frame>
                        {errorToast ? <Toast content="Delete Failed !" error onDismiss={() => setErrorToast(!errorToast)} /> : null}
                        {successToast ? <Toast content="Delete Success !"  onDismiss={() => setSuccessToast(!successToast)} /> : null}
                    </Frame>
                </div>
            </div>
        </div>
    )
}
export default Home;