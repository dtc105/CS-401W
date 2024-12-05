/**
 * 
 * @param {UserObject} props - takes in the object of the current user, get object from fetchData
 * @see /src/server/lib/fetchData.js
 * @returns {Component}
 */
function Avatar(props) {

    const currentUser = props.user;
    const size = props.size || 'search_result';

    const avatarSizes = {
        profile: 'w-48 h-48',
        connection: 'w-4 h-4',
        search_result: 'w-8 h-8',
        user: 'w-12 h-12'
    }

    return (
        <div className={`avatar place-content-center ${avatarSizes[size]} flex-shrink-0`}>
            <img 
                src={`/${currentUser?.details?.avatar || "assets/default-avatar.svg"}`}
                alt="avatar icon" 
                className="contain-content object-cover aspect-square rounded-circle h-full"
            />
        </div>
    );
}

export default Avatar;