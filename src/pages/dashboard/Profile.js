import './Profile.css';
import { useAppContext } from '../../context/appContext';
import { useState } from 'react';
import Avatar from 'avataaars';
import { generateRandomAvatarOptions } from './avatar';
const Profile = () => {

    const {
        user,
        displayAlert,
        updateUser,
        isLoading,

    } = useAppContext();

    const [name, setName] = useState(user?.name);
    const [email, setEmail] = useState(user?.email);
    const [lastName, setLastName] = useState(user?.lastName);
    const [location, setLocation] = useState(user?.location);


    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name || !email || !lastName || !location) {
            displayAlert("ALERT_DANGER");
            return;
        }
        updateUser({ name, email, lastName, location });
    }

    return <div className="page-content page-container" id="page-content">
        <div className="padding">
            <div className="row container d-flex justify-content-center">
                <div className="col-xl-12 col-md-12">
                    <div className="card user-card-full">
                        <div className="row m-l-0 m-r-0">
                            <div className="col-sm-4 bg-c-lite-green user-profile">
                                <div className="card-block text-center text-white">
                                    <div className="m-b-25">
                                        <Avatar
                                            style={{ width: '15rem', height: '15rem' }}
                                            avatarStyle='Circle'
                                            {...generateRandomAvatarOptions()} />
                                    </div>
                                    <h6 className="f-w-600">{name}</h6>
                                    {/* <button className='btn btn-success' onClick={() => setAvt(!avt)}>Random avatar</button> */}
                                    <p>Web Designer</p> <i className=" mdi mdi-square-edit-outline feather icon-edit m-t-10 f-16" />
                                </div>
                            </div>

                            <div className="col-sm-8">
                                <div className="card-block">
                                    <h6 className="m-b-20 p-b-5 b-b-default f-w-600">Information</h6>
                                    <div className="row">
                                        <div className="col-sm-6 mb-5">
                                            <p className="m-b-10 f-w-600">Email</p>
                                            <input type="text f-w-400" name="email"
                                                onChange={(e) => {
                                                    setEmail(e.target.value);
                                                    //setChange(user.name !== name || user.email !== email || user.lastName !== lastName || user.location !== location);
                                                }}
                                                defaultValue={email} />
                                        </div>
                                        <div className="col-sm-6">
                                            <p className="m-b-10 f-w-600">Location</p>
                                            <input type="text f-w-400" name="location"
                                                onChange={(e) => {
                                                    setLocation(e.target.value);
                                                    //setChange(user.name !== name || user.email !== email || user.lastName !== lastName || user.location !== location);
                                                }}
                                                defaultValue={location} />
                                        </div>
                                        <div className="col-sm-6">
                                            <p className="m-b-10 f-w-600">Name</p>
                                            <input type="text f-w-400" name="name"
                                                onChange={(e) => {
                                                    setName(e.target.value);
                                                    //setChange(user.name !== name || user.email !== email || user.lastName !== lastName || user.location !== location);
                                                }}
                                                defaultValue={name} />
                                        </div>
                                        <div className="col-sm-6">
                                            <p className="m-b-10 f-w-600">Last name</p>
                                            <input type="text f-w-400" name="lastName"
                                                onChange={(e) => {
                                                    setLastName(e.target.value);
                                                    //setChange(user.name !== name || user.email !== email || user.lastName !== lastName || user.location !== location);
                                                }}
                                                defaultValue={lastName} />
                                        </div>
                                    </div>
                                    <div className="d-grid gap-2 col-6 mx-auto">
                                        <button className='btn btn-outline-success mt-5' onClick={handleSubmit} disabled={isLoading}> {isLoading ? "Please wait..." : "Save changes"} </button>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

}

export default Profile;