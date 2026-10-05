import React, { createContext, useContext, useState, useEffect } from 'react';

const ContactsContext = createContext();

const INITIAL_CONTACTS = [
  {
    id: 'c-1',
    name: 'Rajesh Sharma',
    relationship: 'Father',
    phone: '+91 98765 11111',
    priority: 'Primary',
    isPrimary: true,
    email: 'rajesh.sharma@example.com',
    notes: 'Home address contact'
  },
  {
    id: 'c-2',
    name: 'Sunita Sharma',
    relationship: 'Mother',
    phone: '+91 98765 22222',
    priority: 'High',
    isPrimary: false,
    email: 'sunita.sharma@example.com',
    notes: 'Available 24/7'
  },
  {
    id: 'c-3',
    name: 'Priya Verma',
    relationship: 'Friend',
    phone: '+91 98765 33333',
    priority: 'Medium',
    isPrimary: false,
    email: 'priya.v@example.com',
    notes: 'Workplace colleague'
  }
];

export const ContactsProvider = ({ children }) => {
  const [contacts, setContacts] = useState(() => {
    const saved = localStorage.getItem('nariraksha_contacts');
    return saved ? JSON.parse(saved) : INITIAL_CONTACTS;
  });

  useEffect(() => {
    localStorage.setItem('nariraksha_contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = (contactData) => {
    const newContact = {
      ...contactData,
      id: `c-${Date.now()}`,
      isPrimary: contacts.length === 0 ? true : contactData.isPrimary || false
    };

    if (newContact.isPrimary) {
      setContacts(prev => prev.map(c => ({ ...c, isPrimary: false })).concat(newContact));
    } else {
      setContacts(prev => [...prev, newContact]);
    }
  };

  const updateContact = (id, updatedData) => {
    setContacts(prev => prev.map(c => {
      if (c.id === id) {
        return { ...c, ...updatedData };
      }
      if (updatedData.isPrimary) {
        return { ...c, isPrimary: false };
      }
      return c;
    }));
  };

  const deleteContact = (id) => {
    setContacts(prev => {
      const filtered = prev.filter(c => c.id !== id);
      if (filtered.length > 0 && !filtered.some(c => c.isPrimary)) {
        filtered[0].isPrimary = true;
      }
      return filtered;
    });
  };

  const setPrimaryContact = (id) => {
    setContacts(prev => prev.map(c => ({
      ...c,
      isPrimary: c.id === id,
      priority: c.id === id ? 'Primary' : c.priority === 'Primary' ? 'High' : c.priority
    })));
  };

  return (
    <ContactsContext.Provider
      value={{
        contacts,
        addContact,
        updateContact,
        deleteContact,
        setPrimaryContact,
        primaryContact: contacts.find(c => c.isPrimary) || contacts[0]
      }}
    >
      {children}
    </ContactsContext.Provider>
  );
};

export const useContacts = () => useContext(ContactsContext);
