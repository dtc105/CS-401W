import PropTypes from "prop-types";

function Avatar(props) {

    const currentUser = props.user;

    return (
        <div className="avatar h-full">
            <img 
                src={currentUser.avatar || "/default-avatar.svg"} 
                alt="avatar icon" 
                className="contain-content object-cover h-5/6 aspect-square rounded-circle"
            />
            <div className="relative h-1/3 aspect-square rounded-circle bg-green-400 border-2 border-300 left-5/8 bottom-1/4"></div>
        </div>
    );
}

Avatar.propTypes = {
    user: PropTypes.shape({
        username: PropTypes.string,
        id: PropTypes.string.isRequired,
        createdAt: PropTypes.string
    })
}



export default Avatar;