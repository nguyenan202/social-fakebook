import User from "../models/User";

const getUser = async (req, res) => {

    try {

        const { id } = req.params
        const user = await User.findById(id)

        res.status(200).json(user)

    } catch (err) {
        res.status(404).json({ message: err.message });
    }
}

const getUsersByAPartName = async (req, res) => {
    try {

        const { name } = req.params
        const user = await User.find({ $or: [{ 'firstName': { $regex: name } }, { 'lastName': { $regex: name } }] })

        res.status(200).json(user);

    } catch (err) {
        res.status(404).json({ message: err.message });
    }
}

const getUserFriends = async (req, res) => {

    try {

        const { id } = req.params;
        const user = await User.findById(id);

        const friends = await Promise.all(
            user.friends.map((id) => User.findById(id))
        );

        const formattedFriends = friends.map(
            ({ _id, firstName, lastName, occupation, location, picturePath }) => {
                return { _id, firstName, lastName, occupation, location, picturePath };
            }
        );
        res.status(200).json(formattedFriends);

    } catch (err) {
        res.status(404).json({ message: err.message });
    }

};

const updateFriendRequest = async (req, res) => {

    try {

        const { id, friendId } = req.params;
        const friend = await User.findById(friendId);

        // Check if you have sent a friend request before
        if (friend.friendsRequest.map(freiendReq => freiendReq.userId).includes(id)) {
            friend.friendsRequest = friend.friendsRequest.filter(friendReq => friendReq.userId !== id)

            const resp = await friend.save();

            return res.status(200).json({
                message: 'cancel add friend success',
                user: resp
            });
        }

        const user = await User.findById(id);

        const FriendRequest = {
            userId: id,
            firstName: user.firstName,
            lastName: user.lastName,
            picturePath: user.picturePath
        }

        friend.friendsRequest.push(FriendRequest)

        const resp = await friend.save();

        res.status(200).json({
            message: 'add friend success',
            user: resp
        });

    } catch (err) {
        res.status(404).json({ message: err.message });
    }

};

const choiceFriend = async (req, res) => {

    try {
        const { choice, id, friendId } = req.params;
        const user = await User.findById(id);
        const friend = await User.findById(friendId);

        switch (choice) {
            case 'accept':

                user.friendsRequest = user.friendsRequest.filter(friendReq => friendReq.userId !== friendId);

                user.friends.push({
                    userId: friendId,
                    firstName: friend.firstName,
                    lastName: friend.lastName,
                    picturePath: friend.picturePath
                })

                friend.friends.push({
                    userId: id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    picturePath: user.picturePath
                })

                const updatedUserAccept = await user.save();
                await friend.save();

                return res.status(200).json({
                    message: 'success',
                    user: updatedUserAccept
                });

            case 'refuse':

                user.friendsRequest = user.friendsRequest.filter(friendReq => friendReq.userId !== friendId);

                const updatedUserRefuse = await user.save();

                return res.status(200).json({
                    message: 'success',
                    user: updatedUserRefuse
                });

            default:
                return res.status(400).json({ message: 'invalid choice' });
        }

    } catch (err) {
        res.status(404).json({ message: err.message });
    }

}

export {
    getUser,
    getUserFriends,
    updateFriendRequest,
    getUsersByAPartName,
    choiceFriend
}