import Carousel from 'react-material-ui-carousel';
import Modal from '@mui/material/Modal';
import type { ProjectProps } from '../pages/Project';
import { useState } from 'react';
import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()((theme) => ({
    carousel: {
        width: '100% !important',
        height: '100% !important',

    },
    imageContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
      },
  }));
interface Props {
  isOpen: boolean;
  onClose: () => void;
  selectedCard: ProjectProps | null;
}

const ImageCarouselModal: React.FC<Props> = ({ isOpen, onClose, selectedCard }) => {
    const { classes } = useStyles();
  if (!selectedCard || !selectedCard.attributes || !selectedCard.attributes.project_image?.data) {
    return null;
  }

  const { project_image } = selectedCard.attributes;

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      <div style={{ width: '80vw', height: '80vh', outline: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Carousel
          autoPlay={false}
          animation="slide"
          navButtonsAlwaysVisible
          className={classes.carousel}
        >
          {project_image?.data.map((image) => (
            <div key={image.attributes.url} className={classes.imageContainer}>
            <img
              src={image.attributes.url}
              alt={selectedCard.attributes.title}
              style={{ objectFit: 'cover', maxHeight: '100%', maxWidth: '100%' }}
            />
            </div>
          ))}
        </Carousel>
      </div>
    </Modal>
  );
};

export default ImageCarouselModal;
