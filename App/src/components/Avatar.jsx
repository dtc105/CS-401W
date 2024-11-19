/**
 * 
 * @param {UserObject} props - takes in the object of the current user, get object from fetchData
 * @see /src/server/lib/fetchData.js
 * @returns {Component}
 */
function Avatar(props) {

    const currentUser = props.user;

    return (
        <div className="avatar h-full place-content-center">
            <img 
                src={currentUser?.avatar || "/assets/default-avatar.svg"} 
                alt="avatar icon" 
                className="contain-content object-cover aspect-square rounded-circle h-full"
            />
        </div>
    );
}

export default Avatar;