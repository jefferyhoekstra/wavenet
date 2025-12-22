import ContactCard from "./ContactCard";

export default function ContactsCardsContainer({
  contacts,
  handleOnDelete,
  handleOnEdit,
}) {
  return (
    <section className="contacts-cards" aria-label="Contacts">
      {contacts.map((contactItem) => (
        <ContactCard
          key={contactItem._id}
          {...contactItem}
          handleOnDelete={handleOnDelete}
          handleOnEdit={handleOnEdit}
        />
      ))}
    </section>
  );
}
