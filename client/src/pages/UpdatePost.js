// Update post page that allows user to update their post

// const handleUpdatePost = async (postId) => {
//     console.log(`Updating the post with ID: ${postId}`);
//     try {
//       const { data: updatedPostData, error: updateError } = await updatePost({
//         variables: { postId },
//       });
//       if (updateError) {
//         console.error("Error updating the post:", updateError);
//       }
//       console.log("Updated Post Data");
//       console.log(updatedPostData);
//     } catch (err) {
//       console.error(`ERRRRRRRRRRR: ${err}`);
//     }
//   };