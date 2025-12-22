export default function ContactCard({
  _id,
  name,
  contact,
  image,
  handleOnDelete,
  handleOnEdit,
}) {
  return (
    <article className="contact-card" aria-label={`Contact: ${name}`}>
      <div className="contact-card-header">
        <h3 className="contact-name">{name}</h3>
        {image ? (
          <img className="contact-image" src={image} alt={`${name} profile`} />
        ) : null}
      </div>

      <div className="contact-details">
        <p className="contact-detail">{contact.email}</p>
        <p className="contact-detail">{contact.phone}</p>
        <p className="contact-detail">{contact.address}</p>
      </div>

      <div className="contact-actions">
        <button className="contact-btn" onClick={() => handleOnEdit(_id)}>
          Edit
        </button>
        <button
          className="contact-btn contact-btn-danger"
          onClick={() => handleOnDelete(_id)}
        >
          Delete
        </button>
      </div>
    </article>
  );
}
