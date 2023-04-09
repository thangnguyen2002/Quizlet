import { useEffect, useState } from "react";
import './DisplayInfo.scss'

const DisplayInfo = (props) => {
    const { listUsers, handleDeleteUser } = props
    const [isShowHideListUser, setShowHideListUser] = useState(true)
    const handleShowHideListUser = () => {
        setShowHideListUser(!isShowHideListUser)
    }

    console.log('>>> Call me render')

    useEffect(()=>{
        setTimeout(()=> {
            if (listUsers.length === 0) {
                alert('List empty')
            }
        }, 2000)
        console.log('>>> Call me useEffect');
    },[listUsers])
    // neu truyen bien vao [] tuc la phu thuoc vao bien do', moi lan render lai khi thay doi prop or state se chay lai useEffect nay
    //con neu ko truyen gi vao tuc la chi chay useEffect duy nhat 1 lan khi render lan dau tien, sau do thi ko chay lai nua

    return (
        <div className="display-info-container">
            <div>
                <span onClick={handleShowHideListUser}>
                    {isShowHideListUser === true ? 'Hide list users' : 'Show list users'}
                </span>
            </div>
            {isShowHideListUser && //ve trai true -> thuc hien (tuc la show) ve phai cua &&, false thi ko thuc hien
                <>
                    {listUsers.map((user) => {
                        return (
                            <div key={user.id} className={+user.age > 18 ? 'green' : 'red'}>
                                {/* + trc de convert string sang number */}
                                <div>
                                    <div>My name's {user.name}</div>
                                    <div>My age's {user.age}</div>
                                </div>
                                <div>
                                    <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
                                    {/* truyen tham so -> can co () =>, con ko thi chi can ten */}
                                </div>
                                <hr />
                            </div>
                        )
                    })}
                </>
            }
        </div>
    );
}

export default DisplayInfo;