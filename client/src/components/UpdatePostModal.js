import React from "react";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Select,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
} from "@chakra-ui/react";

const postTypeOptions = [
  "Need Artist",
  "Need Producer",
  "Need Sample",
  "Need Mixing",
  "Need Mastering",
  "Need Vocals",
  "Need Guitarist",
  "Need Bassist",
  "Need Drummer",
  "Need Pianist",
  "Need Synth",
  "Need Other",
];

const UpdatePostModal = ({
  isOpen,
  onClose,
  selectedPostData,
  setSelectedPostData,
  handleModalFormSubmit,
}) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    handleModalFormSubmit();
    onClose();
  };

  console.log(selectedPostData);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Update Post</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={handleSubmit}>
            <FormControl>
              <FormLabel>Post Title</FormLabel>
              <Input
                placeholder="Post Title"
                value={selectedPostData.postTitle}
                onChange={(e) =>
                  setSelectedPostData({ ...selectedPostData, postTitle: e.target.value })
                }
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Post Description</FormLabel>
              <Input
                placeholder="Post Description"
                value={selectedPostData.postDescription}
                onChange={(e) =>
                  setSelectedPostData({ ...selectedPostData, postDescription: e.target.value })
                }
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Post Type</FormLabel>
              <Select
                placeholder="Select Post Type"
                value={selectedPostData.postType}
                onChange={(e) =>
                  setSelectedPostData({ ...selectedPostData, postType: e.target.value })
                }
              >
                {postTypeOptions.map((postType) => (
                  <option key={postType} value={postType}>
                    {postType}
                  </option>
                ))}
              </Select>
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Budget</FormLabel>
              <Slider
                min={0}
                max={1000}
                aria-label="slider-ex-1"
                value={selectedPostData.budget}
                onChange={(value) => setSelectedPostData({ ...selectedPostData, budget: value })}
              >
                <SliderTrack>
                  <SliderFilledTrack />
                </SliderTrack>
                <SliderThumb />
              </Slider>
              <Input
                type="number"
                value={selectedPostData.budget}
                onChange={(e) =>
                    setSelectedPostData({ ...selectedPostData, budget: e.target.value })
                }
                />
            </FormControl>

            <Button width="full" mt={4} type="submit" colorScheme="teal" isLoading={false}>
              Update Post
            </Button>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default UpdatePostModal;