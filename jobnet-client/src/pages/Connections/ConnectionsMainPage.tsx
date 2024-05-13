import React, {useEffect, useState} from "react"
import {useSelector} from "react-redux";
import {RootState} from "@/redux/store.ts";
import {Link} from "react-router-dom";
import {UserSimpleType} from "@/types/types.ts";
import axios from "axios";
import UserSimpleProfileBox from "@/components/Connections/UserSimpleProfileBox.tsx";
// @ts-ignore
/**/

const ConnectionsMainPage: React.FC = () => {

    const isUserLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);


    const [users, setAllUsers] = useState<UserSimpleType[] | null>();


    useEffect(() => {
        const url = `http://localhost:5087/api/users/allActiveUsers`;

        axios.get(`${url}`).then((res) => {
            const allUsers: UserSimpleType[] = res.data;
            setAllUsers(allUsers);
            console.log(allUsers);
        }).catch(err => {
            console.log(err);
        })

    }, []);

    /*<Carousel className="w-full max-w-xs">
                        <CarouselContent>
                            {users && users.map((user, key) => (
                                <CarouselItem key={key}>
                                    <Card  className="h-[30vh]">
                                        <CardContent>
                                            <div className="text-center text-black">{user.firstname} {user.lastname}</div>
                                            <div className="text-center text-black">{user.email}</div>
                                        </CardContent>
                                    </Card>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious />
                        <CarouselNext />
                    </Carousel>*/


    return (
        <div className="w-full h-[80vh] flex justify-center mt-10">
            {isUserLoggedIn ? (
                <div className="text-white flex flex-col items-center gap-2 w-full">
                    <div className="header text-2xl font-bold">All Users</div>
                    <div className="mainContent">
                        <div className="inputArea">
                            <input type="text" className="p-4 rounded-xl text-xl" placeholder="Vedat..." />
                        </div>
                    </div>
                    <div className="allUsers grid grid-cols-6 gap-4 mt-4 w-full p-2">
                        {users && users.map((user, key) => (
                            <UserSimpleProfileBox key={key} user={user} />
                        ))}
                    </div>

                </div>
            ) : (
                <>
                    <div className="mainContent flex flex-col justify-center items-center">
                        <div className="text-alertSuccess2BgColor">Please login first</div>
                        <Link className="text-center bg-alertSuccessBgColor text-black w-[15vh] h-[5vh] flex justify-center items-center mt-2 rounded-xl" to="/login">Login</Link>
                    </div>
                </>
            )}
        </div>
    )
}

export default ConnectionsMainPage