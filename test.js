// post = {
//     _id: 1,
//     postTitle: "test",
//     postDescription: "test",
//     postType: "test",
//     username: "test",
//     budget: 1,
//     deadline: "test",
//     createdAt: "test",
// }



// commission = {
//     _id: {producerId, artistId},
//     commissionTitle: post.postTitle,
//     commissionDescription: post.postDescription,
//     commissionType: post.postType,
//     username: post.username,
//     budget: post.budget,
//     deadline: post.deadline,
//     status: "open",
// }

// UPDATE_USER(commission)

// //therefore...

// updateUser: async (parent, args, context) => {

// args._id.map((argID) => {
//   if (context.user) {
//     try {
//         const user = await User.findByIdAndUpdate(
//           { _id: args._id.argID },
//           { $set: {comissions: [{ ...args }] }},
//           { new: true }
//         );
//         return user;
//       } catch (err) {
//         console.log(err);
//         throw new Error(err);
//       }

//     // }
//   },
// })
// };



// shield.io badge with style for-the-badge and logo included for




