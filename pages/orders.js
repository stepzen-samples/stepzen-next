import PropTypes from 'prop-types';

const Orders = ({ id, createdOn, image, name  }) => (
        <li key={id}>
            {createdOn}
            <img src={image} />
            <h1>{name}</h1>
        </li>
  );
  
Orders.propTypes = { 
    id: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    createdOn: PropTypes.string.isRequired,
}

export default Orders