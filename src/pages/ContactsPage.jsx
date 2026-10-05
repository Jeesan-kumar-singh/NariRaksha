import React, { useState } from 'react';
import { Users, UserPlus, PhoneCall, MessageSquare, Star, Trash2, Edit, Check, AlertCircle, ShieldCheck, X } from 'lucide-react';
import { useContacts } from '../contexts/ContactsContext';
import { useLocation } from '../contexts/LocationContext';

export const ContactsPage = () => {
  const { contacts, addContact, updateContact, deleteContact, setPrimaryContact } = useContacts();
  const { location } = useLocation();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [name, setName] = useState('');
  const [relationship, setRelationship] = useState('Father');
  const [phone, setPhone] = useState('');
  const [priority, setPriority] = useState('High');
  const [isPrimary, setIsPrimary] = useState(false);
  const [notes, setNotes] = useState('');

  const openAddModal = () => {
    setEditingId(null);
    setName('');
    setRelationship('Father');
    setPhone('');
    setPriority('High');
    setIsPrimary(contacts.length === 0);
    setNotes('');
    setIsModalOpen(true);
  };

  const openEditModal = (contact) => {
    setEditingId(contact.id);
    setName(contact.name);
    setRelationship(contact.relationship);
    setPhone(contact.phone);
    setPriority(contact.priority);
    setIsPrimary(contact.isPrimary);
    setNotes(contact.notes || '');
    setIsModalOpen(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!name || !phone) return;

    if (editingId) {
      updateContact(editingId, { name, relationship, phone, priority, isPrimary, notes });
    } else {
      addContact({ name, relationship, phone, priority, isPrimary, notes });
    }
    setIsModalOpen(false);
  };

  const smsPayloadText = `NariRaksha Emergency Alert: I may need help. My current location: ${location.address}. Google Maps link: https://maps.google.com/?q=${location.lat},${location.lng}`;

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">
            Emergency Network
          </span>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Trusted Contacts Management
          </h1>
          <p className="text-xs text-slate-500">
            Family and trusted individuals notified during emergency alerts.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="px-5 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-blue-600/30 transition-all transform active:scale-95"
        >
          <UserPlus className="w-4 h-4" />
          <span>Add Trusted Contact</span>
        </button>
      </div>

      {/* Contacts List Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {contacts.map((c) => (
          <div
            key={c.id}
            className={`bg-white rounded-3xl p-6 border shadow-sm transition-shadow space-y-4 relative ${
              c.isPrimary ? 'border-2 border-indigo-500 shadow-md' : 'border-slate-200'
            }`}
          >
            {c.isPrimary && (
              <span className="absolute -top-3 right-6 bg-indigo-600 text-white text-[10px] font-black uppercase px-3 py-1 rounded-full shadow-sm flex items-center gap-1">
                <Star className="w-3 h-3 fill-white" />
                <span>Primary Emergency Contact</span>
              </span>
            )}

            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700">
                  {c.relationship}
                </span>
                <h3 className="font-extrabold text-lg text-slate-900">{c.name}</h3>
                <p className="text-xs font-bold text-slate-600">{c.phone}</p>
                {c.notes && <p className="text-[11px] text-slate-400">{c.notes}</p>}
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => openEditModal(c)}
                  className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                  title="Edit Contact"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => {
                    if (confirm(`Remove ${c.name} from trusted contacts?`)) deleteContact(c.id);
                  }}
                  className="p-2 rounded-xl text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                  title="Delete Contact"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 pt-4">
              {!c.isPrimary && (
                <button
                  onClick={() => setPrimaryContact(c.id)}
                  className="text-xs font-bold text-indigo-600 hover:underline"
                >
                  Set as Primary
                </button>
              )}

              <div className="flex items-center gap-2 ml-auto">
                <a
                  href={`sms:${c.phone.replace(/\s+/g, '')}?body=${encodeURIComponent(smsPayloadText)}`}
                  className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs flex items-center gap-1.5 transition-colors"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-blue-600" />
                  <span>SMS Alert</span>
                </a>
                <a
                  href={`tel:${c.phone.replace(/\s+/g, '')}`}
                  className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>Call Now</span>
                </a>
              </div>
            </div>

          </div>
        ))}
      </div>

      {/* Add / Edit Contact Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl relative border border-slate-200">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="font-extrabold text-lg text-slate-900">
                {editingId ? 'Edit Trusted Contact' : 'Add Trusted Contact'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="p-1 rounded-full hover:bg-slate-100">
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Rajesh Sharma"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-blue-500"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Relationship</label>
                  <select
                    value={relationship}
                    onChange={(e) => setRelationship(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-blue-500 bg-white"
                  >
                    <option value="Father">Father</option>
                    <option value="Mother">Mother</option>
                    <option value="Sibling">Sibling</option>
                    <option value="Spouse">Spouse</option>
                    <option value="Friend">Friend</option>
                    <option value="Colleague">Colleague</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Priority Level</label>
                  <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-blue-500 bg-white"
                  >
                    <option value="Primary">Primary</option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Phone Number</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98765 43210"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-blue-500"
                  required
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="isPrimaryCheck"
                  checked={isPrimary}
                  onChange={(e) => setIsPrimary(e.target.checked)}
                  className="w-4 h-4 text-blue-600 rounded"
                />
                <label htmlFor="isPrimaryCheck" className="text-xs font-bold text-slate-700">
                  Set as Primary Emergency Contact
                </label>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="w-1/2 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-1/2 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md"
                >
                  Save Contact
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
};
