import { useEffect, useMemo, useRef, useState } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import SendIcon from '@mui/icons-material/Send';
import VideocamOutlinedIcon from '@mui/icons-material/VideocamOutlined';
import { SearchField } from '../../components/common/SearchField';
import { useAuth } from '../../contexts/AuthContext';
import {
  CHAT_CONTACTS,
  createSeedMessages,
  formatChatAgo,
  formatMessageDay,
  formatMessageTime,
} from '../../data/chat';
import { loadState, saveState } from '../../utils/storage';
import { uid } from '../../utils/format';

function StatusAvatar({ contact, size = 'md' }) {
  return (
    <span className={`p-chat__avatar p-chat__avatar--${size} p-chat__avatar--${contact.status ?? 'offline'}`}>
      {contact.avatar ? (
        <img src={contact.avatar} alt="" />
      ) : (
        <span style={contact.color ? { background: contact.color } : undefined}>
          {contact.initials ?? contact.name?.charAt(0) ?? '?'}
        </span>
      )}
    </span>
  );
}

function lastMessage(messages, contactId) {
  return [...messages].reverse().find((item) => item.contactId === contactId);
}

export function ChatPage() {
  const { user } = useAuth();
  const [query, setQuery] = useState('');
  const [draft, setDraft] = useState('');
  const [selectedId, setSelectedId] = useState(null);
  const [profileOpen, setProfileOpen] = useState(false);
  const [messages, setMessages] = useState(() => loadState('chats', createSeedMessages()));
  const listRef = useRef(null);
  const fileRef = useRef(null);

  useEffect(() => {
    saveState('chats', messages);
  }, [messages]);

  useEffect(() => {
    const node = listRef.current;
    if (!node) return;
    node.scrollTop = node.scrollHeight;
  }, [selectedId, messages]);

  const selected = CHAT_CONTACTS.find((item) => item.id === selectedId) ?? null;
  const thread = useMemo(
    () => messages.filter((item) => item.contactId === selectedId).sort((a, b) => a.createdAt.localeCompare(b.createdAt)),
    [messages, selectedId],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return CHAT_CONTACTS.filter((contact) => {
      const last = lastMessage(messages, contact.id);
      return !q || [contact.name, contact.role, last?.text ?? ''].some((value) => value.toLowerCase().includes(q));
    });
  }, [messages, query]);

  const chats = filtered.filter((contact) => lastMessage(messages, contact.id));
  const contacts = filtered.filter((contact) => !lastMessage(messages, contact.id));

  const send = (text) => {
    if (!selectedId) return;
    const value = text.trim();
    if (!value) return;
    setMessages((current) => [
      ...current,
      { id: uid('msg'), contactId: selectedId, fromMe: true, text: value, createdAt: new Date().toISOString() },
    ]);
    setDraft('');
  };

  const onComposerKey = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      send(draft);
    }
  };

  const selectContact = (id) => {
    setSelectedId(id);
    setProfileOpen(false);
  };

  const renderPerson = (contact, subtitle, time) => (
    <button
      key={contact.id}
      type="button"
      className={`p-chat__person ${contact.id === selectedId ? 'is-active' : ''}`}
      onClick={() => selectContact(contact.id)}
    >
      <StatusAvatar contact={contact} />
      <span className="p-chat__person-body">
        <span className="p-chat__person-top">
          <strong>{contact.name}</strong>
          {time ? <time>{time}</time> : null}
        </span>
        <span className="p-chat__person-sub">{subtitle}</span>
      </span>
    </button>
  );

  return (
    <div className={`c-page p-chat ${selected ? 'has-thread' : ''}`}>
      <div className="p-chat__shell">
        <aside className="p-chat__side" aria-label="Conversations">
          <div className="p-chat__side-head">
            <StatusAvatar
              contact={{
                name: user?.name ?? 'You',
                avatar: user?.avatar,
                status: 'online',
              }}
              size="md"
            />
            <SearchField
              variant="pill"
              label="Search conversations"
              placeholder="Search chats..."
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </div>

          <div className="p-chat__side-scroll">
            {chats.length > 0 && (
              <section className="p-chat__group">
                <h2 className="p-chat__group-title">Chats</h2>
                <div className="p-chat__people">
                  {chats.map((contact) => {
                    const last = lastMessage(messages, contact.id);
                    return renderPerson(contact, last?.text ?? contact.role, last ? formatChatAgo(last.createdAt) : undefined);
                  })}
                </div>
              </section>
            )}

            {contacts.length > 0 && (
              <section className="p-chat__group">
                <h2 className="p-chat__group-title">Contacts</h2>
                <div className="p-chat__people">
                  {contacts.map((contact) => renderPerson(contact, contact.role))}
                </div>
              </section>
            )}

            {filtered.length === 0 && <p className="p-chat__empty-side">No matches.</p>}
          </div>
        </aside>

        <section className="p-chat__main" aria-label="Conversation">
          {!selected && (
            <div className="p-chat__blank">
              <span className="p-chat__blank-icon" aria-hidden>
                <ChatBubbleOutlineIcon />
              </span>
              <p>Select a contact to start a conversation.</p>
            </div>
          )}

          {selected && (
            <>
              <header className="p-chat__thread-head">
                <button type="button" className="p-chat__icon-btn p-chat__back" aria-label="Back to conversations" onClick={() => setSelectedId(null)}>
                  <ArrowBackIcon />
                </button>
                <button type="button" className="p-chat__thread-user" onClick={() => setProfileOpen(true)}>
                  <StatusAvatar contact={selected} />
                  <span>
                    <strong>{selected.name}</strong>
                    <small>{selected.status === 'online' ? 'Active now' : selected.role}</small>
                  </span>
                </button>
                <div className="p-chat__thread-actions">
                  <button type="button" className="p-chat__icon-btn" aria-label="Call">
                    <PhoneOutlinedIcon />
                  </button>
                  <button type="button" className="p-chat__icon-btn" aria-label="Video call">
                    <VideocamOutlinedIcon />
                  </button>
                  <button type="button" className="p-chat__icon-btn" aria-label="Contact details" onClick={() => setProfileOpen(true)}>
                    <MoreVertIcon />
                  </button>
                </div>
              </header>

              <div className="p-chat__messages" ref={listRef}>
                {thread.length === 0 && (
                  <p className="p-chat__empty-thread">No messages yet. Say hello to {selected.name.split(' ')[0]}.</p>
                )}
                {thread.map((message, index) => {
                  const showDay = index === 0 || formatMessageDay(thread[index - 1].createdAt) !== formatMessageDay(message.createdAt);
                  return (
                    <div key={message.id}>
                      {showDay && <p className="p-chat__day">{formatMessageDay(message.createdAt)}</p>}
                      <div className={`p-chat__bubble-wrap ${message.fromMe ? 'is-me' : 'is-them'}`}>
                        <div className="p-chat__bubble">{message.text}</div>
                        <time>{formatMessageTime(message.createdAt)}</time>
                      </div>
                    </div>
                  );
                })}
              </div>

              <form
                className="p-chat__composer"
                onSubmit={(event) => {
                  event.preventDefault();
                  send(draft);
                }}
              >
                <input
                  ref={fileRef}
                  type="file"
                  hidden
                  onChange={(event) => {
                    const file = event.target.files?.[0];
                    if (file) send(`Shared file: ${file.name}`);
                    event.target.value = '';
                  }}
                />
                <button type="button" className="p-chat__icon-btn" aria-label="Attach file" onClick={() => fileRef.current?.click()}>
                  <AttachFileIcon />
                </button>
                <input
                  className="p-chat__input"
                  type="text"
                  aria-label="Message"
                  placeholder="Type your message..."
                  value={draft}
                  onChange={(event) => setDraft(event.target.value)}
                  onKeyDown={onComposerKey}
                />
                <button type="submit" className="p-chat__send" disabled={!draft.trim()} aria-label="Send message">
                  <SendIcon />
                </button>
              </form>
            </>
          )}
        </section>
      </div>

      {profileOpen && selected && (
        <div className="p-chat__drawer" role="dialog" aria-modal="true" aria-label="Contact details">
          <button type="button" className="p-chat__drawer-backdrop" aria-label="Close profile" onClick={() => setProfileOpen(false)} />
          <aside className="p-chat__profile">
            <div className="p-chat__profile-hero">
              <StatusAvatar contact={selected} size="lg" />
              <h2>{selected.name}</h2>
              <p>{selected.role}</p>
            </div>
            <dl className="p-chat__profile-meta">
              <div>
                <dt>Email</dt>
                <dd>{selected.email}</dd>
              </div>
              <div>
                <dt>Phone</dt>
                <dd>{selected.phone}</dd>
              </div>
              <div>
                <dt>Status</dt>
                <dd className="is-cap">{selected.status}</dd>
              </div>
            </dl>
          </aside>
        </div>
      )}
    </div>
  );
}
